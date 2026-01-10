import React, { useState, useEffect, useRef, useMemo } from 'react';
import StripCode from './StripCode';
import { generateStripcodeV8, ROWS } from '../engine';

// --- VISUAL GENERATOR: BARCODE 128 (Authentic Look) ---
const Barcode128: React.FC<{ text: string, scale?: number }> = ({ text, scale = 2 }) => {
    // Visual approximation of Code 128B
    const generatePattern = (str: string) => {
        const patterns: number[] = [];
        patterns.push(2,1,1,2,1,4); // Start B
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            const w1 = (code % 3) + 1;
            const w2 = ((code >> 2) % 3) + 1;
            const w3 = ((code >> 4) % 2) + 1;
            const w4 = 1;
            const w5 = 11 - (w1+w2+w3+w4+2); 
            patterns.push(w1, 1, w2, 1, w3, Math.max(1, w5));
        }
        patterns.push(3,1,1,1,2,3); // Check
        patterns.push(2,3,3,1,1,1,2); // Stop
        return patterns;
    };

    const widths = useMemo(() => generatePattern(text), [text]);
    const totalUnits = widths.reduce((a, b) => a + b, 0);

    return (
        <div className="flex flex-col items-center">
            <div 
                className="flex items-stretch bg-white px-2 overflow-hidden" 
                style={{ height: '64px', minWidth: `${totalUnits * scale}px` }}
            >
                {widths.map((w, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            width: `${w * scale}px`, 
                            backgroundColor: i % 2 === 0 ? 'black' : 'white' 
                        }} 
                    />
                ))}
            </div>
            <div className="font-mono text-xs mt-1 tracking-[0.3em]">{text}</div>
        </div>
    );
};

// --- VISUAL GENERATOR: QR CODE (Authentic Look) ---
const AuthenticQRCode: React.FC<{ text: string, moduleSize?: number }> = ({ text, moduleSize = 4 }) => {
    const [matrix, setMatrix] = useState<boolean[][]>([]);
    const [size, setSize] = useState(21);

    useEffect(() => {
        const version = Math.max(1, Math.min(10, Math.ceil(text.length / 15)));
        const dim = 21 + (version - 1) * 4;
        setSize(dim);
        const grid = Array(dim).fill(null).map(() => Array(dim).fill(false));
        const reserved = Array(dim).fill(null).map(() => Array(dim).fill(false));

        const place = (r: number, c: number, val: boolean) => {
            if (r >= 0 && r < dim && c >= 0 && c < dim) {
                grid[r][c] = val;
                reserved[r][c] = true;
            }
        };

        const drawFinder = (ox: number, oy: number) => {
            for(let y=0; y<7; y++) {
                for(let x=0; x<7; x++) {
                    const isBorder = y===0 || y===6 || x===0 || x===6;
                    const isInner = y>=2 && y<=4 && x>=2 && x<=4;
                    place(oy+y, ox+x, isBorder || isInner);
                }
            }
        };
        drawFinder(0, 0);       
        drawFinder(dim-7, 0);   
        drawFinder(0, dim-7);   

        for(let i=8; i<dim-8; i++) {
            place(6, i, i%2===0);
            place(i, 6, i%2===0);
        }

        if (version > 1) {
             const ax = dim - 9;
             const ay = dim - 9;
             for(let y=0; y<5; y++) {
                for(let x=0; x<5; x++) {
                    const isBorder = y===0 || y===4 || x===0 || x===4;
                    const isCenter = y===2 && x===2;
                    place(ay+y, ax+x, isBorder || isCenter);
                }
             }
        }

        let bitIdx = 0;
        const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        for(let x=dim-1; x>=0; x-=2) {
            if (x===6) x--; 
            for(let y=0; y<dim; y++) {
                if (!reserved[y][x]) {
                    const val = ((x*y + bitIdx + seed) % 2) === 0; 
                    grid[y][x] = val;
                    bitIdx++;
                }
                if (x>0 && !reserved[y][x-1]) {
                    const val = ((x*y + bitIdx + seed * 2) % 3) !== 0; 
                    grid[y][x-1] = val;
                    bitIdx++;
                }
            }
        }
        setMatrix(grid);
    }, [text]);

    return (
        <div className="bg-white p-2 inline-block">
            <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${size}, ${moduleSize}px)` 
                }}
            >
                {matrix.map((row, y) => (
                    row.map((filled, x) => (
                        <div 
                            key={`${x}-${y}`} 
                            style={{ 
                                width: moduleSize, 
                                height: moduleSize, 
                                backgroundColor: filled ? 'black' : 'white' 
                            }} 
                        />
                    ))
                ))}
            </div>
        </div>
    );
};

export const ComparingPage: React.FC = () => {
  const [text, setText] = useState("V8_PROTOCOL_COMPARISON");
  const [containerWidth, setContainerWidth] = useState(600);
  const [isLiquid, setIsLiquid] = useState(true); // Toggle State
  const stripContainerRef = useRef<HTMLDivElement>(null);

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    // For calculation purposes, if liquid is off, we calculate assuming a single long line (infinite width)
    const calcWidth = isLiquid && stripContainerRef.current ? stripContainerRef.current.offsetWidth : 10000;
    const stripHeight = 32;
    const chunks = generateStripcodeV8(text, calcWidth, stripHeight);
    
    const stripPixelArea = chunks.reduce((acc, chunk) => acc + (chunk.length * (stripHeight/ROWS) * stripHeight), 0);
    const stripDims = `${chunks.length > 0 ? chunks.reduce((a,c)=>a+(c.length*(stripHeight/ROWS)),0) : 0} x ${stripHeight}`;

    const qrVersion = Math.max(1, Math.min(10, Math.ceil(text.length / 15)));
    const qrDim = 21 + (qrVersion - 1) * 4;
    const qrModuleSize = 4;
    const qrPixelArea = (qrDim * qrModuleSize) * (qrDim * qrModuleSize);
    const qrDims = `${qrDim * qrModuleSize} x ${qrDim * qrModuleSize}`;

    const barcodeWidth = (text.length * 11 + 30) * 2; 
    const barcodeHeight = 64;
    const barcodePixelArea = barcodeWidth * barcodeHeight;
    const barcodeDims = `${barcodeWidth} x ${barcodeHeight}`;

    return {
        strip: { area: stripPixelArea, dims: stripDims },
        qr: { area: qrPixelArea, dims: qrDims },
        barcode: { area: barcodePixelArea, dims: barcodeDims }
    };
  }, [text, containerWidth, isLiquid]);

  useEffect(() => {
    if (!stripContainerRef.current) return;
    const ro = new ResizeObserver(entries => {
        for(let entry of entries) {
            setContainerWidth(entry.contentRect.width);
        }
    });
    ro.observe(stripContainerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-neutral-100 pb-20">
        <div className="max-w-7xl mx-auto py-12 px-6">
            
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Technology Comparison</h2>
                <p className="text-neutral-500 max-w-2xl mx-auto">
                    Analyzing the efficiency, density, and spatial requirements of Stripcode V8 against traditional optical storage formats.
                </p>
            </div>

            {/* Interactive Control */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-12 sticky top-4 z-20">
                 <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Test Data Input</label>
                 <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="Type to compare..."
                 />
                 <div className="mt-2 flex justify-between text-xs text-neutral-400">
                    <span>Length: {text.length} chars</span>
                    <span>Raw Data: {text.length * 8} bits</span>
                 </div>
            </div>

            {/* Visual Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
                
                {/* 1. STRIPCODE V8 */}
                <div className="bg-white rounded-xl border-2 border-emerald-500/20 shadow-lg overflow-hidden flex flex-col relative h-full">
                    <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex justify-between items-center">
                        <div className="flex flex-col">
                            <h3 className="font-bold text-emerald-900">Stripcode V8</h3>
                            <span className="text-[10px] text-emerald-600 font-mono">ADAPTIVE TOPOLOGY</span>
                        </div>
                        <div className="flex items-center space-x-2">
                             <label className="text-[10px] font-bold text-emerald-700 uppercase cursor-pointer">Liquid Reflow</label>
                             <input 
                                type="checkbox" 
                                checked={isLiquid} 
                                onChange={(e) => setIsLiquid(e.target.checked)}
                                className="accent-emerald-600 w-4 h-4 cursor-pointer"
                             />
                        </div>
                    </div>
                    {/* Container */}
                    <div className="p-8 flex-1 bg-neutral-50 min-h-[250px] flex flex-col justify-center overflow-hidden">
                        <div ref={stripContainerRef} className="w-full">
                            <StripCode 
                                text={text} 
                                height={32} 
                                showLabels={false} 
                                disableReflow={!isLiquid}
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-white border-t border-neutral-100 text-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Geometry:</span>
                            <span className="font-mono">Ribbon (Fixed Height)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Surface (px²):</span>
                            <span className="font-mono font-bold text-emerald-600">{stats.strip.area.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* 2. QR CODE */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex justify-between items-center">
                         <div className="flex flex-col">
                            <h3 className="font-bold text-neutral-900">QR Code (Model 2)</h3>
                            <span className="text-[10px] text-neutral-500 font-mono">MATRIX TOPOLOGY</span>
                        </div>
                        <span className="text-[10px] font-bold bg-neutral-200 text-neutral-600 px-2 py-1 rounded">2D</span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col items-center justify-center bg-neutral-50 min-h-[250px]">
                        <AuthenticQRCode text={text} />
                    </div>
                    <div className="p-4 bg-white border-t border-neutral-100 text-xs space-y-2">
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Geometry:</span>
                            <span className="font-mono">Square Matrix</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Surface (px²):</span>
                            <span className="font-mono font-bold">{stats.qr.area.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* 3. BARCODE 1D */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex justify-between items-center">
                        <div className="flex flex-col">
                            <h3 className="font-bold text-neutral-900">Code 128 (1D)</h3>
                            <span className="text-[10px] text-neutral-500 font-mono">LINEAR TOPOLOGY</span>
                        </div>
                        <span className="text-[10px] font-bold bg-neutral-200 text-neutral-600 px-2 py-1 rounded">1D</span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col items-center justify-center bg-neutral-50 min-h-[250px] overflow-x-auto">
                        <Barcode128 text={text} />
                    </div>
                    <div className="p-4 bg-white border-t border-neutral-100 text-xs space-y-2">
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Geometry:</span>
                            <span className="font-mono">Linear Horizontal</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-neutral-500">Surface (px²):</span>
                            <span className="font-mono font-bold">{stats.barcode.area.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden mb-12">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-200">
                        <tr>
                            <th className="py-4 px-6">METRIC</th>
                            <th className="py-4 px-6 text-emerald-700">STRIPCODE V8</th>
                            <th className="py-4 px-6">QR CODE</th>
                            <th className="py-4 px-6">CODE 128</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">Total Surface (px²)</td>
                            <td className="py-4 px-6 text-emerald-700 font-bold">{stats.strip.area.toLocaleString()}</td>
                            <td className="py-4 px-6">{stats.qr.area.toLocaleString()}</td>
                            <td className="py-4 px-6">{stats.barcode.area.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">Dimensions (Approx)</td>
                            <td className="py-4 px-6 font-mono text-xs">{stats.strip.dims}</td>
                            <td className="py-4 px-6 font-mono text-xs">{stats.qr.dims}</td>
                            <td className="py-4 px-6 font-mono text-xs">{stats.barcode.dims}</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">Aspect Ratio</td>
                            <td className="py-4 px-6 text-emerald-700 font-medium">Variable (Liquid)</td>
                            <td className="py-4 px-6">1:1 (Rigid)</td>
                            <td className="py-4 px-6">High (Linear)</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">Error Correction</td>
                            <td className="py-4 px-6 text-emerald-700 font-medium">Rolling Hash (~25%)</td>
                            <td className="py-4 px-6">Reed-Solomon (7-30%)</td>
                            <td className="py-4 px-6 text-neutral-400">Check Digit Only</td>
                        </tr>
                    </tbody>
                </table>
            </div>

             <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-2">Efficiency Analysis</h4>
                <p className="text-emerald-800 text-sm leading-relaxed">
                    <strong>Surface Area Efficiency:</strong> Stripcode V8 utilizes a split-byte architecture that eliminates the need for large quiet zones required by 1D barcodes and the massive finder patterns of QR codes. 
                    <br/><br/>
                    As shown in the data above, for short-to-medium length strings, V8 often requires significantly less vertical space than QR codes, making it ideal for <strong>edge-printing</strong> on documents or thin product spines. While 1D barcodes are horizontally efficient, they lack the data density to store complex alphanumeric strings without becoming unwieldy.
                </p>
            </div>

        </div>
    </div>
  );
};