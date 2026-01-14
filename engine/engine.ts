// --- COSTANTI DATASHEET V9 ---
const OVERHEAD_COLS = 11; // 3(LF) + 1(LQ) + 4(META) + 1(RQ) + 2(RF)
const ECC_RATIO = 0.25;
export const ROWS = 8;

export type ColumnData = boolean[]; // Array di 8 booleani
export type StripChunk = ColumnData[]; // Una "striscia" completa

// --- PATTERN BASE ---
const PATTERN_EMPTY = [false, false, false, false, false, false, false, false];

// --- HELPER: Left Finder V9 (Dynamic Sequence Marker) ---
const buildLeftFinderV9 = (chunkIdx: number, totalChunks: number): StripChunk => {
  // Base V9 LF Template: 
  // Top Block (R0-R2) Solid, Middle (R3-R4) Empty, Bottom Block (R5-R7) Solid
  // [1, 1, 1, 0, 0, 1, 1, 1]
  const baseCol = [true, true, true, false, false, true, true, true];
  
  const col0 = [...baseCol];
  const col1 = [...baseCol];
  const col2 = [...baseCol];

  // 1. First Chunk Marker: Buco nel Top Block a [R1, Col 1]
  if (chunkIdx === 0) {
    col1[1] = false; 
  }

  // 2. Last Chunk Marker: Buco nel Bottom Block a [R6, Col 1]
  // Specifica: R5-R7 forzati a true (già nel baseCol), eccetto il buco.
  if (chunkIdx === totalChunks - 1) {
    col1[6] = false;
  }

  return [col0, col1, col2];
};

// --- HELPER: Right Finder V9 ---
// Standard Anchor: [1, 1, 0, Ctrl, Ctrl, 0, 1, 1]
const buildRightFinderV9 = (chunkIdx: number, isLast: boolean): StripChunk => {
  const base = [true, true, false, false, false, false, true, true];
  const c0 = [...base];
  const c1 = [...base];

  let bit0 = false; // R3
  let bit1 = false; // R4

  if (isLast) {
    // EOF Code: [1, 1]
    bit0 = true;
    bit1 = true;
  } else {
    // Row Parity: Even [1, 0], Odd [0, 1]
    if (chunkIdx % 2 === 0) {
      bit0 = true;
      bit1 = false;
    } else {
      bit0 = false;
      bit1 = true;
    }
  }

  c0[3] = bit0; c0[4] = bit0;
  c1[3] = bit1; c1[4] = bit1;

  return [c0, c1];
};

// --- HELPER: R7 Timeline & Payload Builder ---
// Genera una colonna di dati gestendo la logica complessa di R7 (Sync + Position)
const buildPayloadColumnV9 = (
  val: number, 
  colIndexLocal: number, // Indice colonna nel chunk attuale (solo per parità clock)
  globalPayloadIndex: number, // Indice assoluto nel payload totale
  totalPayloadCols: number
): ColumnData => {
  const col = new Array(8).fill(false);
  
  // R0: Clock A (Primary) - 1010...
  col[0] = colIndexLocal % 2 === 0;

  // R1-R4: Data Nibble (Split-Byte)
  col[1] = ((val >> 3) & 1) === 1; // 8 (MSB)
  col[2] = ((val >> 2) & 1) === 1; // 4
  col[3] = ((val >> 1) & 1) === 1; // 2
  col[4] = ((val >> 0) & 1) === 1; // 1 (LSB)

  // R5: Parity XOR (Verticale R1-R4)
  const p = (col[1]?1:0) ^ (col[2]?1:0) ^ (col[3]?1:0) ^ (col[4]?1:0);
  col[5] = p === 1;

  // R6: Separator (Always 0 nel payload)
  col[6] = false;

  // R7: Absolute Position Track / Timeline
  // Ciclo di 19 colonne: 12 Normal + 3 SYNC + 4 POS
  const timelineCycle = globalPayloadIndex % 19;
  
  if (timelineCycle < 12) {
    // Standard Clock B (Inverso di R0 per densità)
    col[7] = colIndexLocal % 2 !== 0;
  } else if (timelineCycle >= 12 && timelineCycle < 15) {
    // SYNC Pattern [1, 1, 1] (Indici 12, 13, 14)
    col[7] = true;
  } else {
    // POS Pattern (Indici 15, 16, 17, 18)
    // Calcolo posizione relativa in 16imi (0-15)
    // Formula: floor((Colonna_Corrente / Colonne_Totali) * 15)
    const relPos = totalPayloadCols > 0 
      ? Math.floor((globalPayloadIndex / totalPayloadCols) * 15) 
      : 0;
    
    // Estrazione bit (MSB first su 4 colonne)
    const bitIdx = 3 - (timelineCycle - 15); // 3, 2, 1, 0
    col[7] = ((relPos >> bitIdx) & 1) === 1;
  }

  return col;
};

// --- HELPER: Metadata Column Builder ---
// Metadata semplice, usa clock standard su R7
const buildMetaColumn = (val: number, colIndex: number): ColumnData => {
  const col = new Array(8).fill(false);
  col[0] = colIndex % 2 === 0;
  col[1] = ((val >> 3) & 1) === 1;
  col[2] = ((val >> 2) & 1) === 1;
  col[3] = ((val >> 1) & 1) === 1;
  col[4] = ((val >> 0) & 1) === 1;
  const p = (col[1]?1:0) ^ (col[2]?1:0) ^ (col[3]?1:0) ^ (col[4]?1:0);
  col[5] = p === 1;
  col[6] = false;
  col[7] = colIndex % 2 !== 0;
  return col;
};

// --- HELPER: Capacity Solver ---
export const solveCapacity = (availablePx: number, height: number): number => {
  if (height <= 0 || availablePx <= 0) return 0;
  const s = height / ROWS; // Modulo quadrato
  const maxTotalCols = Math.floor(availablePx / s);
  
  // Sottraiamo overhead
  const usefulSpace = maxTotalCols - OVERHEAD_COLS;
  if (usefulSpace <= 0) return 0;

  // Risoluzione iterativa per N (Payload) + K (ECC) <= Space
  // K = ceil(N * 0.25)
  let N = Math.floor(usefulSpace / (1 + ECC_RATIO));
  
  // Refining per precisione ceil
  while ((N + Math.ceil(N * ECC_RATIO)) > usefulSpace) {
    N--;
  }
  return Math.max(0, N);
};

// --- MAIN GENERATOR V9 ---
export const generateStripcodeV9 = (
  text: string,
  availableWidth: number,
  height: number = 32
): StripChunk[] => {
  
  // 1. Calcolo Capacità
  const payloadCapacity = solveCapacity(availableWidth, height);
  if (payloadCapacity <= 0) return [];

  // 2. Encoding Text -> Nibbles
  const nibbles: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    nibbles.push((code >> 4) & 0x0F);
    nibbles.push(code & 0x0F);
  }

  // Info globali per R7 Timeline
  const totalPayloadNibbles = nibbles.length;

  // 3. Chunking
  const chunksData: number[][] = [];
  for (let i = 0; i < nibbles.length; i += payloadCapacity) {
    chunksData.push(nibbles.slice(i, i + payloadCapacity));
  }
  const totalChunks = chunksData.length;

  // Tracking globale del payload processato
  let globalPayloadCounter = 0;

  // 4. Costruzione Fisica V9
  const logicalChunks: StripChunk[] = chunksData.map((chunkNibbles, chunkIdx) => {
    const currentStrip: ColumnData[] = [];
    let x = 0; // Local x index

    // (A) DYNAMIC LEFT FINDER V9
    const lfCols = buildLeftFinderV9(chunkIdx, totalChunks);
    currentStrip.push(...lfCols); x += 3;

    // (B) LEFT QUIET
    currentStrip.push([...PATTERN_EMPTY]); x++;

    // (C) METADATA (4 Cols)
    currentStrip.push(buildMetaColumn((chunkIdx >> 4) & 0xF, x++));
    currentStrip.push(buildMetaColumn(chunkIdx & 0xF, x++));
    currentStrip.push(buildMetaColumn((totalChunks >> 4) & 0xF, x++));
    currentStrip.push(buildMetaColumn(totalChunks & 0xF, x++));

    // (D) DATA PAYLOAD (V9 Timeline Logic)
    chunkNibbles.forEach(nib => {
      currentStrip.push(buildPayloadColumnV9(
        nib, 
        x, 
        globalPayloadCounter, 
        totalPayloadNibbles
      ));
      x++;
      globalPayloadCounter++;
    });

    // (E) ECC BLOCK
    // K = ceil(N * 0.25)
    const k_ecc = Math.ceil(chunkNibbles.length * ECC_RATIO);
    let sum = 0;
    chunkNibbles.forEach((n, i) => sum += n * (i+1));
    
    // Per l'ECC usiamo la logica colonna Payload (per mantenere il clock/sync continuo se volessimo, 
    // ma le specifiche R7 Timeline parlavano di "Payload". Per semplicità l'ECC usa Meta builder o Payload builder?
    // Useremo Meta builder (clock standard) per distinguere visivamente l'ECC dal Payload sulla traccia R7.
    for(let e=0; e<k_ecc; e++) {
      const eccVal = (sum + (e*13)) & 0x0F; 
      currentStrip.push(buildMetaColumn(eccVal, x++));
    }

    // (F) RIGHT QUIET
    currentStrip.push([...PATTERN_EMPTY]); x++;

    // (G) RIGHT FINDER V9
    const isLast = chunkIdx === totalChunks - 1;
    const rf = buildRightFinderV9(chunkIdx, isLast);
    currentStrip.push(...rf); x += 2;

    return currentStrip;
  });

  return logicalChunks;
};