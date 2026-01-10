// --- COSTANTI DATASHEET V8 (Rev. A-G) ---
const OVERHEAD_COLS = 11; // 3(LF) + 1(LQ) + 4(META) + 1(RQ) + 2(RF)
const ECC_RATIO = 0.25;
export const ROWS = 8;

export type ColumnData = boolean[]; // Array di 8 booleani
export type StripChunk = ColumnData[]; // Una "striscia" completa

// --- PATTERN FISSI ---
// LF (3 Cols): R0-2 Solid, R3-4 Empty, R5-7 Solid
const PATTERN_LF_COL = [true, true, true, false, false, true, true, true];
const PATTERN_EMPTY = [false, false, false, false, false, false, false, false];

// --- HELPER: Costruzione Colonna Standard ---
// R0: Clock A (Pari=1, Dispari=0)
// R1-R4: Dati (MSB su R1)
// R5: Parity (XOR R1-R4)
// R6: Separator (Always 0)
// R7: Clock B (Inverso R0)
const buildColumn = (val: number, colIndex: number): ColumnData => {
  const col = new Array(8).fill(false);
  
  // R0: Clock A
  col[0] = colIndex % 2 === 0;

  // R1-R4: Nibble (val è 0-15)
  // Datasheet: R1=MSB(8), R4=LSB(1)
  col[1] = ((val >> 3) & 1) === 1; // 8
  col[2] = ((val >> 2) & 1) === 1; // 4
  col[3] = ((val >> 1) & 1) === 1; // 2
  col[4] = ((val >> 0) & 1) === 1; // 1

  // R5: Parity (XOR)
  const p = (col[1]?1:0) ^ (col[2]?1:0) ^ (col[3]?1:0) ^ (col[4]?1:0);
  col[5] = p === 1;

  // R6: Separator
  col[6] = false;

  // R7: Clock B
  col[7] = colIndex % 2 !== 0;

  return col;
};

// --- HELPER: Right Finder Builder ---
// R0-1: Solid, R2: Empty, R3-4: Control, R5: Empty, R6-7: Solid
const buildRightFinder = (chunkIdx: number, isLast: boolean): ColumnData[] => {
  // Template Base: [1, 1, 0, ?, ?, 0, 1, 1]
  const base = [true, true, false, false, false, false, true, true];
  
  const c0 = [...base];
  const c1 = [...base];

  // Logic Control Bits (R3-R4)
  // Pari: [1, 0]
  // Dispari: [0, 1]
  // EOF: [1, 1]
  let bit0 = false;
  let bit1 = false;

  if (isLast) {
    // EOF Code
    bit0 = true;
    bit1 = true;
  } else {
    if (chunkIdx % 2 === 0) {
      // Even Row
      bit0 = true;
      bit1 = false;
    } else {
      // Odd Row
      bit0 = false;
      bit1 = true;
    }
  }

  // Apply Bits to R3 and R4
  c0[3] = bit0; c0[4] = bit0;
  c1[3] = bit1; c1[4] = bit1;

  return [c0, c1];
};

// --- HELPER: Capacity Solver ---
// Risolve: N + ceil(N * 0.25) <= SpazioUtile
export const solveCapacity = (availablePx: number, height: number): number => {
  if (height <= 0 || availablePx <= 0) return 0;
  const s = height / 8; // Modulo
  const maxTotalCols = Math.floor(availablePx / s);
  const usefulSpace = maxTotalCols - OVERHEAD_COLS;

  if (usefulSpace <= 0) return 0;

  let N = Math.floor(usefulSpace / 1.25);
  while ((N + Math.ceil(N * ECC_RATIO)) > usefulSpace) {
    N--;
  }
  return Math.max(0, N);
};

// --- MAIN GENERATOR ---
export const generateStripcodeV8 = (
  text: string,
  availableWidth: number,
  height: number = 32
): StripChunk[] => {
  
  // 1. Calcoli preliminari
  const payloadCapacity = solveCapacity(availableWidth, height);
  
  if (payloadCapacity <= 0) return []; // Spazio insufficiente anche per 1 char

  // 2. Encoding Testo -> Nibbles
  // Split-Byte: 1 Char = 2 Nibbles
  const nibbles: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    nibbles.push((code >> 4) & 0x0F); // High Nibble
    nibbles.push(code & 0x0F);        // Low Nibble
  }

  // 3. Chunking
  const chunksData: number[][] = [];
  for (let i = 0; i < nibbles.length; i += payloadCapacity) {
    chunksData.push(nibbles.slice(i, i + payloadCapacity));
  }
  const totalChunks = chunksData.length;

  // 4. Costruzione Fisica (A-G)
  const logicalChunks: StripChunk[] = chunksData.map((chunkNibbles, chunkIdx) => {
    const currentStrip: ColumnData[] = [];
    let x = 0; // Local x index per il Clock phasing

    // (A) LEFT FINDER [3 Cols]
    // R0-2: Solid, R3-4: Empty, R5-7: Solid
    currentStrip.push([...PATTERN_LF_COL]); x++;
    currentStrip.push([...PATTERN_LF_COL]); x++;
    currentStrip.push([...PATTERN_LF_COL]); x++;

    // (B) LEFT QUIET [1 Col]
    currentStrip.push([...PATTERN_EMPTY]); x++;

    // (C) METADATA (4 Cols)
    // Idx High, Idx Low, Tot High, Tot Low
    currentStrip.push(buildColumn((chunkIdx >> 4) & 0xF, x++));
    currentStrip.push(buildColumn(chunkIdx & 0xF, x++));
    currentStrip.push(buildColumn((totalChunks >> 4) & 0xF, x++));
    currentStrip.push(buildColumn(totalChunks & 0xF, x++));

    // (D) DATA PAYLOAD (N Cols)
    chunkNibbles.forEach(nib => {
      currentStrip.push(buildColumn(nib, x++));
    });

    // (E) ECC BLOCK (K Cols)
    const k_ecc = Math.ceil(chunkNibbles.length * ECC_RATIO);
    
    // Fake Reed-Solomon (Hash rolling)
    let sum = 0;
    chunkNibbles.forEach((n, i) => sum += n * (i+1));
    for(let e=0; e<k_ecc; e++) {
      const eccVal = (sum + (e*13)) & 0x0F; 
      currentStrip.push(buildColumn(eccVal, x++));
    }

    // (F) RIGHT QUIET [1 Col]
    currentStrip.push([...PATTERN_EMPTY]); x++;

    // (G) RIGHT FINDER [2 Cols]
    const isLast = chunkIdx === totalChunks - 1;
    const rf = buildRightFinder(chunkIdx, isLast);
    currentStrip.push(rf[0]); x++;
    currentStrip.push(rf[1]); x++;

    return currentStrip;
  });

  return logicalChunks;
};