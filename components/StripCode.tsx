import React, { useEffect, useRef, useState, useMemo } from 'react';
import { generateStripcodeV8, StripChunk, ROWS } from '../engine';

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
  type: string;
  bitValue: number;
}

interface ChunkCanvasProps {
  chunk: StripChunk;
  height: number;
  debugMode?: boolean;
  packetIndex: number;
  onHover: (data: Omit<TooltipData, 'x' | 'y' | 'visible'> | null, e: React.MouseEvent) => void;
}

// --- HELPER: Granular Column Type Logic ---
const getDetailedColType = (col: number, chunk: StripChunk): string => {
  const totalCols = chunk.length;
  
  if (col < 3) return 'FINDER_L';
  if (col === 3) return 'QUIET_L';
  if (col === 4 || col === 5) return 'META_IDX'; // Chunk Index
  if (col === 6 || col === 7) return 'META_TOT'; // Total Chunks

  const endStart = totalCols - 3; // Start of Right Quiet
  const rfStart = totalCols - 2;  // Start of Right Finder

  if (col === endStart) return 'QUIET_R';
  
  if (col >= rfStart) {
    // Determine RF State by looking at bits 3 and 4 of the first RF col (rfStart)
    const rfCol = chunk[rfStart];
    // R3=1, R4=1 -> EOF
    // R3=1, R4=0 -> Even
    // R3=0, R4=1 -> Odd
    if (rfCol[3] && rfCol[4]) return 'RF_END';
    if (rfCol[3] && !rfCol[4]) return 'RF_EVEN';
    return 'RF_ODD';
  }

  // Payload vs ECC logic
  const R = totalCols - OVERHEAD_COLS;
  let N = Math.floor(R / 1.25); 
  while ((N + Math.ceil(N * ECC_RATIO)) > R) N--;
  while ((N + 1 + Math.ceil((N + 1) * ECC_RATIO)) <= R) N++;
  
  // 8 is start of payload (LF=3, QL=1, META=4) -> 3+1+4 = 8
  if (col < 8 + N) return 'PAYLOAD';
  return 'ECC_BLK';
};

// --- VISUALIZATION PALETTE ---
// hoverFill is a more opaque version of the stroke color for the active highlight
const ZONE_STYLES: Record<string, { stroke: string, fill: string, hoverFill: string }> = {
    FINDER_L: { stroke: '#525252', fill: 'transparent', hoverFill: 'rgba(82, 82, 82, 0.2)' },
    QUIET_L:  { stroke: '#e5e5e5', fill: 'rgba(255,255,255,0.2)', hoverFill: 'rgba(229, 229, 229, 0.3)' },
    META_IDX: { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.05)', hoverFill: 'rgba(16, 185, 129, 0.3)' }, // Emerald
    META_TOT: { stroke: '#0d9488', fill: 'rgba(13, 148, 136, 0.05)', hoverFill: 'rgba(13, 148, 136, 0.3)' }, // Teal
    PAYLOAD:  { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.05)', hoverFill: 'rgba(59, 130, 246, 0.3)' }, // Blue
    ECC_BLK:  { stroke: '#a855f7', fill: 'rgba(168, 85, 247, 0.05)', hoverFill: 'rgba(168, 85, 247, 0.3)' }, // Purple
    QUIET_R:  { stroke: '#e5e5e5', fill: 'rgba(255,255,255,0.2)', hoverFill: 'rgba(229, 229, 229, 0.3)' },
    RF_EVEN:  { stroke: '#f97316', fill: 'rgba(249, 115, 22, 0.05)', hoverFill: 'rgba(249, 115, 22, 0.3)' }, // Orange
    RF_ODD:   { stroke: '#ec4899', fill: 'rgba(236, 72, 153, 0.05)', hoverFill: 'rgba(236, 72, 153, 0.3)' }, // Pink
    RF_END:   { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.05)', hoverFill: 'rgba(239, 68, 68, 0.3)' }, // Red
};

const ROW_HIGHLIGHTS = {
    CLOCK:  { fill: 'rgba(220, 38, 38, 0.15)', stroke: '#dc2626' }, // Red
    PARITY: { fill: 'rgba(245, 158, 11, 0.15)', stroke: '#d97706' }, // Amber
};

const ChunkCanvas: React.FC<ChunkCanvasProps> = ({ chunk, height, debugMode, packetIndex, onHover }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [localHoverCol, setLocalHoverCol] = useState<number | null>(null);
  
  const cellSize = height / ROWS;
  const width = chunk.length * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset
    ctx.clearRect(0, 0, width, height);
    
    // --- 1. Draw Bits (Standard Layer) ---
    ctx.fillStyle = '#171717'; 
    chunk.forEach((col, x) => {
        col.forEach((bit, y) => {
            if (bit) ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        });
    });

    // --- 2. Debug Overlays (Zones & Rows) ---
    if (debugMode) {
        
        // A. Draw Horizontal Row Highlights (Clock & Parity)
        // Row 0: Clock A
        ctx.fillStyle = ROW_HIGHLIGHTS.CLOCK.fill;
        ctx.fillRect(0, 0, width, cellSize);
        ctx.strokeStyle = ROW_HIGHLIGHTS.CLOCK.stroke;
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, width, cellSize);

        // Row 7: Clock B
        ctx.fillStyle = ROW_HIGHLIGHTS.CLOCK.fill;
        ctx.fillRect(0, 7 * cellSize, width, cellSize);
        ctx.strokeRect(0, 7 * cellSize, width, cellSize);

        // Row 5: Parity
        ctx.fillStyle = ROW_HIGHLIGHTS.PARITY.fill;
        ctx.fillRect(0, 5 * cellSize, width, cellSize);
        ctx.strokeStyle = ROW_HIGHLIGHTS.PARITY.stroke;
        ctx.strokeRect(0, 5 * cellSize, width, cellSize);

        // B. Calculate Zones
        const zones: { type: string, start: number, length: number }[] = [];
        if (chunk.length > 0) {
            let currentType = getDetailedColType(0, chunk);
            let startIndex = 0;
            
            for (let i = 1; i < chunk.length; i++) {
                const type = getDetailedColType(i, chunk);
                if (type !== currentType) {
                    zones.push({ type: currentType, start: startIndex, length: i - startIndex });
                    currentType = type;
                    startIndex = i;
                }
            }
            zones.push({ type: currentType, start: startIndex, length: chunk.length - startIndex });
        }

        // C. Draw Zones
        const activeZone = localHoverCol !== null 
            ? zones.find(z => localHoverCol >= z.start && localHoverCol < (z.start + z.length)) 
            : null;

        zones.forEach(zone => {
            const isActive = activeZone === zone;
            // Skip active zone in first pass
            if (isActive) return;

            const style = ZONE_STYLES[zone.type];
            if (!style) return;

            const x = zone.start * cellSize;
            const w = zone.length * cellSize;
            const h = height;

            if (style.fill !== 'transparent') {
                ctx.fillStyle = style.fill;
                ctx.fillRect(x, 0, w, h);
            }
            ctx.strokeStyle = style.stroke;
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 1, 1, w - 2, h - 2); 
        });

        // D. Draw Active Zone (Highlight)
        if (activeZone) {
            const style = ZONE_STYLES[activeZone.type];
            if (style) {
                const x = activeZone.start * cellSize;
                const w = activeZone.length * cellSize;
                const h = height;
                const expansion = 4; 
                
                // Active Background
                ctx.fillStyle = style.hoverFill;
                ctx.fillRect(x - expansion/2, 0, w + expansion, h);

                // Active Border
                ctx.strokeStyle = style.stroke;
                ctx.lineWidth = 3;
                ctx.strokeRect(x - 2, 0, w + 4, h);
            }
        }
    }

  }, [chunk, height, cellSize, width, debugMode, localHoverCol]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const colIdx = Math.floor(x / cellSize);
    const rowIdx = Math.floor(y / cellSize);

    // Update Local Hover State
    if (colIdx >= 0 && colIdx < chunk.length && rowIdx >= 0 && rowIdx < ROWS) {
        setLocalHoverCol(colIdx);
    } else {
        setLocalHoverCol(null);
    }

    // Bubble up to tooltip
    if (colIdx >= 0 && colIdx < chunk.length && rowIdx >= 0 && rowIdx < ROWS) {
      const type = getDetailedColType(colIdx, chunk);
      const bitValue = chunk[colIdx][rowIdx] ? 1 : 0;
      onHover({ packetIdx: packetIndex, col: colIdx, row: rowIdx, type, bitValue }, e);
    } else {
      onHover(null, e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setLocalHoverCol(null);
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

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'PAYLOAD': return 'text-blue-400 border-blue-900/50 bg-blue-900/20';
      case 'ECC_BLK': return 'text-purple-400 border-purple-900/50 bg-purple-900/20';
      case 'META_IDX': return 'text-emerald-400 border-emerald-900/50 bg-emerald-900/20';
      case 'META_TOT': return 'text-teal-400 border-teal-900/50 bg-teal-900/20';
      case 'RF_END': return 'text-red-400 border-red-900/50 bg-red-900/20';
      case 'RF_EVEN': return 'text-orange-400 border-orange-900/50 bg-orange-900/20';
      case 'RF_ODD': return 'text-pink-400 border-pink-900/50 bg-pink-900/20';
      default: return 'text-neutral-400 border-neutral-700 bg-neutral-800';
    }
  };

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
        <span className={`px-1.5 py-0.5 rounded border text-[10px] ${getBadgeColor(data.type)}`}>{data.type}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-y-1 text-neutral-300">
        <span className="text-neutral-500">POS:</span> <span>R{data.row} : C{data.col}</span>
        <span className="text-neutral-500">VAL:</span> <span className={data.bitValue ? 'text-white font-bold' : 'text-neutral-600'}>{data.bitValue}</span>
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
  const [tooltip, setTooltip] = useState<TooltipData>({ visible: false, x: 0, y: 0, packetIdx: 0, col: 0, row: 0, type: '', bitValue: 0 });
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
    return generateStripcodeV8(text, w, height);
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

  // Determine outer container layout
  // If disableReflow is true (inline mode), we use inline-block and w-auto
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