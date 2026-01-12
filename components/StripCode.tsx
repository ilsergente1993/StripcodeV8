import React, { useEffect, useRef, useState, useMemo } from 'react';
import { generateStripcodeV9, StripChunk, ROWS } from '../engine';

// --- Constants matches engine.ts ---
const OVERHEAD_COLS = 11;
const ECC_RATIO = 0.25;

interface StripCodeProps {
  text: string;
  height?: number;
  className?: string;
  debugMode?: boolean;
  showLabels?: boolean;
  verticalGap?: number;
  revealTextOnHover?: boolean;
  disableReflow?: boolean;
  detailedTooltip?: boolean;
}

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  packetIdx: number;
  col: number;
  row: number;
  zone: string;
  bitValue: number;
}

interface ChunkCanvasProps {
  chunk: StripChunk;
  height: number;
  debugMode?: boolean;
  packetIndex: number;
  onHover: (data: Omit<TooltipData, 'x' | 'y' | 'visible'> | null, e: React.MouseEvent) => void;
}

// --- HELPER: Column Type Logic ---
const getColType = (col: number, chunk: StripChunk): string => {
  const totalCols = chunk.length;
  
  if (col < 3) return 'FINDER_L';
  if (col === 3) return 'QUIET_L';
  if (col === 4 || col === 5) return 'META_IDX'; 
  if (col === 6 || col === 7) return 'META_TOT'; 

  const endStart = totalCols - 3; 
  const rfStart = totalCols - 2;  

  if (col === endStart) return 'QUIET_R';
  
  if (col >= rfStart) {
    const rfCol = chunk[rfStart];
    if (rfCol[3] && rfCol[4]) return 'RF_END';
    if (rfCol[3] && !rfCol[4]) return 'RF_EVEN';
    return 'RF_ODD';
  }

  // Payload vs ECC logic
  const R = totalCols - OVERHEAD_COLS;
  let N = Math.floor(R / 1.25); 
  while ((N + Math.ceil(N * ECC_RATIO)) > R) N--;
  while ((N + 1 + Math.ceil((N + 1) * ECC_RATIO)) <= R) N++;
  
  if (col < 8 + N) return 'PAYLOAD';
  return 'ECC_BLK';
};

// --- HELPER: Geometry & Zone ID ---
// Rules:
// 1. Finders & Quiet Zones are Full Height (R0-R7).
// 2. Global Tracks (Clock R0, Parity R5, Sep R6, Time R7) exist only in Data columns.
// 3. Core Data is R1-R4 in Data columns.
const getZoneLayout = (col: number, row: number, chunk: StripChunk): { id: string, x: number, y: number, w: number, h: number } | null => {
    const totalCols = chunk.length;

    // 1. VERTICAL ZONES (Priority: Full Height R0-R7)
    
    // Left Finder (Cols 0-2)
    if (col < 3) {
        return { id: 'FINDER_L', x: 0, y: 0, w: 3, h: 8 };
    }
    // Left Quiet (Col 3)
    if (col === 3) {
        return { id: 'QUIET_L', x: 3, y: 0, w: 1, h: 8 };
    }
    // Right Quiet (Col Total-3)
    if (col === totalCols - 3) {
        return { id: 'QUIET_R', x: totalCols - 3, y: 0, w: 1, h: 8 };
    }
    // Right Finder (Cols Total-2 to Total)
    if (col >= totalCols - 2) {
        // ID depends on specific RF type bits
        const rfType = getColType(col, chunk);
        return { id: `CORE_${rfType}`, x: totalCols - 2, y: 0, w: 2, h: 8 };
    }

    // 2. HORIZONTAL ZONES (Restricted to Data Area: Cols 4 to L-4)
    // Now we are strictly inside the data area.
    
    // R0: Clock A (Behaves like Timeline now, strictly horizontal in data area)
    if (row === 0) return { id: 'ROW_CLOCK', x: 4, y: 0, w: totalCols - 7, h: 1 };
    
    // R5: Parity
    if (row === 5) return { id: 'ROW_PARITY', x: 4, y: 5, w: totalCols - 7, h: 1 };
    
    // R6: Separator
    if (row === 6) return { id: 'ROW_SEPARATOR', x: 4, y: 6, w: totalCols - 7, h: 1 };
    
    // R7: Timeline
    if (row === 7) return { id: 'ROW_TIMELINE', x: 4, y: 7, w: totalCols - 7, h: 1 };

    // 3. CORE DATA BLOCKS (R1-R4)
    // We need to find start/end of current block type within the data area
    const cType = getColType(col, chunk);
    
    // Scan backwards from current col to find start
    let start = col;
    while (start > 4 && getColType(start - 1, chunk) === cType) start--;
    
    // Scan forwards to find end
    let end = col;
    while (end < totalCols - 4 && getColType(end + 1, chunk) === cType) end++;
    
    return { id: `CORE_${cType}`, x: start, y: 1, w: end - start + 1, h: 4 };
};

// --- VISUALIZATION PALETTE ---
const AREA_STYLES: Record<string, { fill: string, stroke: string, label: string }> = {
    // Global Rows
    ROW_CLOCK:     { fill: 'rgba(239, 68, 68, 0.3)', stroke: '#dc2626', label: 'CLOCK A' }, 
    ROW_PARITY:    { fill: 'rgba(245, 158, 11, 0.3)', stroke: '#d97706', label: 'PARITY' }, 
    ROW_SEPARATOR: { fill: 'rgba(115, 115, 115, 0.3)', stroke: '#737373', label: 'SEPARATOR' }, 
    ROW_TIMELINE:  { fill: 'rgba(59, 130, 246, 0.3)', stroke: '#2563eb', label: 'TIMELINE' }, 

    // Finders (Full Height R0-R7)
    FINDER_L:      { fill: 'rgba(23, 23, 23, 0.15)', stroke: '#404040', label: 'FINDER L' },
    CORE_RF_EVEN:  { fill: 'rgba(249, 115, 22, 0.2)', stroke: '#ea580c', label: 'RF: EVEN' },
    CORE_RF_ODD:   { fill: 'rgba(236, 72, 153, 0.2)', stroke: '#db2777', label: 'RF: ODD' },
    CORE_RF_END:   { fill: 'rgba(239, 68, 68, 0.2)', stroke: '#dc2626', label: 'RF: END' },

    // Quiet (Full Height)
    QUIET_L:       { fill: 'rgba(255, 255, 255, 0.1)', stroke: '#e5e5e5', label: 'QUIET' },
    QUIET_R:       { fill: 'rgba(255, 255, 255, 0.1)', stroke: '#e5e5e5', label: 'QUIET' },

    // Core Data (R1-R4)
    CORE_META_IDX: { fill: 'rgba(16, 185, 129, 0.2)', stroke: '#059669', label: 'META: IDX' }, 
    CORE_META_TOT: { fill: 'rgba(13, 148, 136, 0.2)', stroke: '#0d9488', label: 'META: TOT' }, 
    CORE_PAYLOAD:  { fill: 'rgba(59, 130, 246, 0.2)', stroke: '#3b82f6', label: 'PAYLOAD' },   
    CORE_ECC_BLK:  { fill: 'rgba(168, 85, 247, 0.2)', stroke: '#9333ea', label: 'ECC' },   
};

const ChunkCanvas: React.FC<ChunkCanvasProps> = ({ chunk, height, debugMode, packetIndex, onHover }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverZoneId, setHoverZoneId] = useState<string | null>(null);
  
  const cellSize = height / ROWS;
  const width = chunk.length * cellSize;

  // Pre-calculate unique zones
  const uniqueZones = useMemo(() => {
      const zones = new Map<string, { id: string, x: number, y: number, w: number, h: number }>();
      for (let c = 0; c < chunk.length; c++) {
          for (let r = 0; r < ROWS; r++) {
              const z = getZoneLayout(c, r, chunk);
              if (z) {
                const key = `${z.id}_${z.x}_${z.y}`;
                if (!zones.has(key)) zones.set(key, z);
              }
          }
      }
      return Array.from(zones.values());
  }, [chunk]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset
    ctx.clearRect(0, 0, width, height);
    
    // --- 1. Draw Bits ---
    ctx.fillStyle = '#171717'; 
    chunk.forEach((col, x) => {
        col.forEach((bit, y) => {
            if (bit) ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        });
    });

    if (debugMode) {
        // --- 2. Draw Zones (Fills + Borders) ---
        // We draw persistent fills for all zones to show structure
        ctx.lineWidth = 1;
        uniqueZones.forEach(z => {
            const style = AREA_STYLES[z.id];
            if (style) {
                // Persistent Background
                ctx.fillStyle = style.fill;
                ctx.fillRect(z.x * cellSize, z.y * cellSize, z.w * cellSize, z.h * cellSize);
                
                // Persistent Border
                ctx.strokeStyle = style.stroke;
                ctx.globalAlpha = 0.4; 
                ctx.strokeRect(z.x * cellSize, z.y * cellSize, z.w * cellSize, z.h * cellSize);
                ctx.globalAlpha = 1.0;
            }
        });

        // --- 3. Draw Active Zone Highlight (Stronger) ---
        if (hoverZoneId) {
            const activeRects = uniqueZones.filter(z => z.id === hoverZoneId);
            const style = AREA_STYLES[hoverZoneId];
            
            if (style && activeRects.length > 0) {
                // Slightly darker fill for hover
                // We use a trick: draw the fill again to darken the alpha blend
                ctx.fillStyle = style.fill; 
                ctx.strokeStyle = style.stroke;
                ctx.lineWidth = 2;

                activeRects.forEach(z => {
                    ctx.fillRect(z.x * cellSize, z.y * cellSize, z.w * cellSize, z.h * cellSize);
                    ctx.strokeRect(z.x * cellSize, z.y * cellSize, z.w * cellSize, z.h * cellSize);
                });
            }
        }
    }

  }, [chunk, height, cellSize, width, debugMode, hoverZoneId, uniqueZones]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const colIdx = Math.floor(x / cellSize);
    const rowIdx = Math.floor(y / cellSize);

    if (colIdx >= 0 && colIdx < chunk.length && rowIdx >= 0 && rowIdx < ROWS) {
        const layout = getZoneLayout(colIdx, rowIdx, chunk);
        const zoneId = layout ? layout.id : null;
        setHoverZoneId(zoneId);

        if (zoneId) {
            const style = AREA_STYLES[zoneId];
            const zoneLabel = style ? style.label : zoneId;
            const bitValue = chunk[colIdx][rowIdx] ? 1 : 0;

            onHover({ 
                packetIdx: packetIndex, 
                col: colIdx, 
                row: rowIdx, 
                zone: zoneLabel, 
                bitValue 
            }, e);
        }
    } else {
        setHoverZoneId(null);
        onHover(null, e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setHoverZoneId(null);
    onHover(null, e);
  };

  return (
    <div className="inline-block bg-white p-[1px] shadow-sm hover:ring-2 ring-emerald-400/50 transition-all duration-200 align-middle">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: width,
          height: height,
          display: 'block',
          cursor: 'crosshair',
        }}
      />
    </div>
  );
};

const Tooltip: React.FC<{ data: TooltipData }> = ({ data }) => {
  if (!data.visible) return null;

  const isRowZone = data.zone.startsWith('CLOCK') || data.zone === 'PARITY' || data.zone === 'SEPARATOR' || data.zone === 'TIMELINE';
  const isQuiet = data.zone === 'QUIET';
  const isFinder = data.zone.includes('FINDER') || data.zone.includes('RF');

  return (
    <div 
      className="fixed z-50 pointer-events-none tooltip-glass border border-neutral-700 rounded-lg p-3 text-xs font-mono text-white min-w-[180px]"
      style={{ 
        left: data.x + 20, 
        top: data.y + 20,
      }}
    >
      <div className="flex justify-between items-center mb-2 border-b border-neutral-700 pb-1">
        <span className="text-neutral-400 font-bold">PACKET_{data.packetIdx.toString(16).toUpperCase().padStart(2, '0')}</span>
        <span className={`px-2 py-0.5 rounded font-bold text-[10px] bg-neutral-800 border border-neutral-600 text-white`}>
            {data.zone}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-y-1 text-neutral-300">
        <span className="text-neutral-500">POS:</span> <span>R{data.row} : C{data.col}</span>
        <span className="text-neutral-500">VAL:</span> <span className={data.bitValue ? 'text-white font-bold' : 'text-neutral-600'}>{data.bitValue}</span>
        
        {isRowZone && (
             <div className="col-span-2 mt-1 pt-1 border-t border-neutral-800 text-[10px] text-neutral-500 italic">
                Global Track (Data Only)
             </div>
        )}
        {isQuiet && (
             <div className="col-span-2 mt-1 pt-1 border-t border-neutral-800 text-[10px] text-neutral-500 italic">
                Buffer Zone (Empty)
             </div>
        )}
        {isFinder && (
             <div className="col-span-2 mt-1 pt-1 border-t border-neutral-800 text-[10px] text-neutral-500 italic">
                Anchor Pattern (Full Height)
             </div>
        )}
        {!isRowZone && !isQuiet && !isFinder && (
            <div className="col-span-2 mt-1 pt-1 border-t border-neutral-800 text-[10px] text-neutral-500 italic">
                Data Core (Nibbles 1-4)
             </div>
        )}
      </div>
    </div>
  );
};

const StripCode: React.FC<StripCodeProps> = ({ 
    text, 
    height = 32, 
    className = '', 
    debugMode = false, 
    showLabels = true, 
    verticalGap,
    revealTextOnHover = false,
    disableReflow = false,
    detailedTooltip = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [tooltip, setTooltip] = useState<TooltipData>({ visible: false, x: 0, y: 0, packetIdx: 0, col: 0, row: 0, zone: '', bitValue: 0 });
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const chunks = useMemo(() => {
    const effectiveWidth = disableReflow ? 50000 : containerWidth;
    if (effectiveWidth === 0 && !disableReflow) return [];
    const w = Math.max(effectiveWidth - 4, 100); 
    return generateStripcodeV9(text, w, height);
  }, [text, containerWidth, height, disableReflow]);

  const handleChunkHover = (data: Omit<TooltipData, 'x' | 'y' | 'visible'> | null, e: React.MouseEvent) => {
    if (!data) {
      setTooltip(prev => ({ ...prev, visible: false }));
    } else {
      setTooltip({
        ...data,
        visible: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const gapClass = verticalGap !== undefined ? '' : 'gap-y-6';
  const customStyle = verticalGap !== undefined ? { rowGap: `${verticalGap}px` } : {};
  const containerOverflowClass = disableReflow ? 'overflow-x-auto whitespace-nowrap' : 'flex-wrap';
  const outerLayoutClass = disableReflow ? 'inline-block w-auto' : 'w-full';

  return (
    <div 
        className={`relative group/strip ${outerLayoutClass}`}
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => setIsContainerHovered(false)}
    >
        {revealTextOnHover && isContainerHovered && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-40 bg-neutral-900 text-white text-[11px] font-mono px-3 py-1.5 rounded shadow-xl border border-neutral-700 whitespace-nowrap pointer-events-none opacity-0 group-hover/strip:opacity-100 transition-opacity duration-200">
                {text}
                <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-900 border-r border-b border-neutral-700 rotate-45"></div>
            </div>
        )}

        <div
            ref={containerRef}
            className={`flex content-start items-start justify-start gap-x-0 ${gapClass} ${gapClass ? '' : 'mb-6'} ${containerOverflowClass} ${className} ${disableReflow ? 'scrollbar-thin w-auto' : 'w-full'}`}
            style={customStyle}
        >
            {chunks.length === 0 && text.length > 0 && !disableReflow ? (
            <div className="w-full text-center py-4 text-xs text-red-500 font-mono bg-red-50 rounded">
                [ERR_CAPACITY_OVERFLOW]
            </div>
            ) : null}

            {chunks.map((chunk, index) => (
            <div 
                key={index} 
                className={`flex-none ${disableReflow ? 'mr-0' : 'mr-4'} group animate-chunk-entry ${disableReflow ? 'inline-block' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
            >
                <ChunkCanvas 
                    chunk={chunk} 
                    height={height} 
                    debugMode={debugMode} 
                    packetIndex={index} 
                    onHover={handleChunkHover}
                />
                {showLabels && (
                    <div className={`text-[10px] font-mono mt-1 leading-none transition-colors ${debugMode ? 'text-red-500 font-bold' : 'text-neutral-300 group-hover:text-neutral-500'}`}>
                        PKT_{index.toString(16).toUpperCase().padStart(2, '0')}
                    </div>
                )}
            </div>
            ))}
        </div>
        {detailedTooltip && <Tooltip data={tooltip} />}
    </div>
  );
};

export default StripCode;