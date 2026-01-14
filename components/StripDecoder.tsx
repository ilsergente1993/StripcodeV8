import React, { useState, useCallback, useRef } from 'react';
import { decodeChunkFromMatrix, assembleStripcode, DecodedChunk, ROWS } from '../engine/engine';
import StripCode from './StripCode';

export const StripDecoder: React.FC = () => {
    const [decodedChunks, setDecodedChunks] = useState<DecodedChunk[]>([]);
    const [finalText, setFinalText] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedFiles, setProcessedFiles] = useState<{name: string, status: 'ok'|'error', idx?: number}[]>([]);

    const processFile = (file: File): Promise<void> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    setProcessedFiles(prev => [...prev, { name: file.name, status: 'error' }]);
                    resolve();
                    return;
                }

                // Simple Binarization & Grid Scan
                // Assumption: User uploads cropped chunk image.
                // 1. Detect content bounds (trim whitespace)
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
                let hasContent = false;

                // Scan for "black" pixels (threshold < 128)
                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const idx = (y * canvas.width + x) * 4;
                        const avg = (data[idx] + data[idx+1] + data[idx+2]) / 3;
                        if (avg < 128 && data[idx+3] > 50) { // Dark and not transparent
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                            hasContent = true;
                        }
                    }
                }

                if (!hasContent) {
                    setProcessedFiles(prev => [...prev, { name: file.name, status: 'error' }]);
                    resolve();
                    return;
                }

                const contentH = maxY - minY + 1;
                const contentW = maxX - minX + 1;
                
                // Estimated cell size
                const cellH = contentH / ROWS;
                // V9 is roughly square cells, but width might vary.
                const estimatedCols = Math.round(contentW / cellH);

                // Sample the grid
                const matrix: boolean[][] = [];
                
                for (let c = 0; c < estimatedCols; c++) {
                    const colData: boolean[] = [];
                    const centerX = minX + (c * cellH) + (cellH / 2); // Assume square cells
                    
                    if (centerX > maxX) break;

                    for (let r = 0; r < ROWS; r++) {
                        const centerY = minY + (r * cellH) + (cellH / 2);
                        const idx = (Math.floor(centerY) * canvas.width + Math.floor(centerX)) * 4;
                        const avg = (data[idx] + data[idx+1] + data[idx+2]) / 3;
                        // True if Black (Low brightness)
                        colData.push(avg < 128);
                    }
                    matrix.push(colData);
                }

                const result = decodeChunkFromMatrix(matrix);
                if (result) {
                    setDecodedChunks(prev => {
                        const next = [...prev, result];
                        // Trigger re-assembly
                        const text = assembleStripcode(next);
                        setFinalText(text);
                        return next;
                    });
                    setProcessedFiles(prev => [...prev, { name: file.name, status: 'ok', idx: result.index }]);
                } else {
                    setProcessedFiles(prev => [...prev, { name: file.name, status: 'error' }]);
                }
                
                URL.revokeObjectURL(img.src);
                resolve();
            };
            img.onerror = () => {
                setProcessedFiles(prev => [...prev, { name: file.name, status: 'error' }]);
                resolve();
            };
        });
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;
        setIsProcessing(true);
        // Clear previous if starting new batch? No, keep accumulating.
        // Actually for a clean UX, let's keep adding. User can clear manually.
        
        const fileArray = Array.from(files);
        // Process sequentially to keep UI responsive
        for (const file of fileArray) {
            await processFile(file);
        }
        setIsProcessing(false);
    };

    const handleReset = () => {
        setDecodedChunks([]);
        setProcessedFiles([]);
        setFinalText('');
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-neutral-200 mt-12 mb-12">
            <div className="flex justify-between items-center mb-6 border-b border-neutral-100 pb-4">
                <div>
                    <h2 className="text-lg font-bold text-neutral-900">V9 Decoder / Verifier</h2>
                    <p className="text-xs text-neutral-500">
                        Upload raw chunk images to reconstruct the data stream.
                        <br/>
                        <span className="text-[10px] text-neutral-400">Note: Images must be clean, unscaled crops of the V9 strip.</span>
                    </p>
                </div>
                <button 
                    onClick={handleReset}
                    className="text-xs font-bold text-neutral-400 hover:text-red-500 uppercase tracking-wider transition-colors"
                >
                    Reset Buffer
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Dropzone */}
                <div className="flex-1">
                    <label 
                        className={`
                            border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all
                            ${isProcessing ? 'border-neutral-200 bg-neutral-50 cursor-wait' : 'border-neutral-300 hover:border-emerald-500 hover:bg-emerald-50/10'}
                        `}
                    >
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFiles(e.target.files)}
                            disabled={isProcessing}
                        />
                        <div className="text-center p-4">
                             <svg className="w-8 h-8 mx-auto text-neutral-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                             <span className="text-sm font-bold text-neutral-600 block">Click or Drag Chunk Images</span>
                             <span className="text-xs text-neutral-400 mt-1 block">Supports multiple files simultaneously</span>
                        </div>
                    </label>

                    {/* File List */}
                    {processedFiles.length > 0 && (
                        <div className="mt-4 max-h-40 overflow-y-auto space-y-2 pr-2">
                            {processedFiles.map((f, i) => (
                                <div key={i} className="flex justify-between items-center text-xs p-2 bg-neutral-50 rounded border border-neutral-100">
                                    <span className="truncate max-w-[150px] text-neutral-600">{f.name}</span>
                                    {f.status === 'ok' ? (
                                        <span className="text-emerald-600 font-bold font-mono">CHUNK_{f.idx?.toString(16).toUpperCase().padStart(2, '0')}</span>
                                    ) : (
                                        <span className="text-red-500 font-bold">FAIL</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Result Area */}
                <div className="flex-1 flex flex-col">
                    <div className="bg-neutral-900 text-emerald-400 font-mono text-sm p-4 rounded-lg flex-1 min-h-[192px] shadow-inner overflow-auto whitespace-pre-wrap break-all">
                        {finalText || <span className="text-neutral-600 italic">// Decoded output will appear here...</span>}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                         <div className="text-xs text-neutral-500 font-bold">
                            CHUNKS RECOVERED: {decodedChunks.length}
                         </div>
                         {decodedChunks.length > 0 && (
                            <div className="text-xs text-neutral-400">
                                TOTAL EXPECTED: {decodedChunks[0].total}
                            </div>
                         )}
                    </div>

                    {/* Visual Confirmation of Ordering */}
                    {decodedChunks.length > 1 && (
                        <div className="mt-4 pt-4 border-t border-neutral-100">
                            <p className="text-[10px] text-neutral-400 uppercase font-bold mb-2">Sequence Reconstruction</p>
                            <div className="flex gap-1 overflow-x-auto pb-2">
                                {decodedChunks.sort((a,b) => a.index - b.index).map((c, i) => (
                                    <div key={i} className="flex-none w-6 h-8 bg-emerald-100 border border-emerald-300 rounded flex items-center justify-center text-[10px] font-bold text-emerald-800" title={`Index: ${c.index}`}>
                                        {c.index.toString(16).toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};