import React, { useState, useRef, useEffect } from 'react';
import StripCode from './StripCode';

export const Laboratory: React.FC = () => {
  const [inputText, setInputText] = useState<string>('STRIPCODE V8 // INITIALIZED SYSTEM READY...');
  const [stripHeight, setStripHeight] = useState<number>(96); // Default 96px
  const [isDebug, setIsDebug] = useState(false);

  // Custom Resize Logic for the Digital Output Card
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    if (cardRef.current) {
        startWidth.current = cardRef.current.getBoundingClientRect().width;
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    document.body.style.cursor = 'ew-resize';
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startX.current;
    const newWidth = Math.max(280, startWidth.current + delta);
    setCardWidth(newWidth);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
    document.body.style.cursor = 'default';
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-neutral-100">
      
      {/* INPUT SECTION */}
      <section className="flex-none z-20 bg-white border-b border-neutral-200 shadow-sm relative">
          <div className="max-w-5xl mx-auto p-4 sm:p-6">
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Input Data Stream ({inputText.length} bytes)
            </label>
            <div className="relative">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to encode..."
                    className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-neutral-400"
                    spellCheck={false}
                />
                <div className="absolute bottom-3 right-3">
                    <div className={`w-2 h-2 rounded-full ${inputText.length > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300'}`}></div>
                </div>
            </div>
          </div>
      </section>

      {/* OUTPUT SECTION */}
      <main className="flex-1 overflow-y-auto relative flex flex-col items-center py-6 sm:py-12 px-4 scroll-smooth">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
               style={{
                   backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                   backgroundSize: '24px 24px'
               }}
          ></div>

          <div className="relative z-10 w-full flex flex-col items-center max-w-full">
            <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-[10px] sm:text-sm font-semibold text-neutral-400 uppercase tracking-widest">Digital Output Buffer</h2>
            </div>

            {/* Resizable Card Container */}
            <div 
                ref={cardRef}
                style={{ width: cardWidth ? `${cardWidth}px` : '100%', maxWidth: '100%' }}
                className="bg-neutral-200 rounded-xl shadow-[0_15px_30px_-12px_rgba(0,0,0,0.1)] border border-neutral-300 min-h-[120px] sm:min-h-[150px] flex flex-col relative group transition-[width] duration-75 ease-linear"
            >
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-xl z-10"></div>
                
                {/* Card Header / Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-3 border-b border-neutral-300 bg-neutral-100 rounded-t-xl mt-1 gap-3">
                    <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase">
                        V8_ENGINE // RENDER_CORE
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 z-20 w-full sm:w-auto justify-center">
                        
                        {/* Height Dropdown */}
                        <div className="flex items-center space-x-2 bg-neutral-50 px-2 py-1 rounded border border-neutral-200">
                            <label className="text-[9px] font-bold text-neutral-500 uppercase">H:</label>
                            <select 
                                value={stripHeight} 
                                onChange={(e) => setStripHeight(Number(e.target.value))}
                                className="bg-transparent text-[11px] font-mono font-bold text-neutral-700 outline-none cursor-pointer"
                            >
                                {[32, 48, 64, 80, 96, 128, 144, 160].map(h => (
                                  <option key={h} value={h}>{h}px</option>
                                ))}
                            </select>
                        </div>

                        {/* Debug Toggle */}
                        <button
                            onClick={() => setIsDebug(!isDebug)}
                            className={`px-2 py-1.5 sm:py-1 text-[9px] sm:text-[10px] font-bold border rounded transition-all uppercase tracking-wide flex-1 sm:flex-none ${
                                isDebug 
                                ? 'bg-neutral-900 border-neutral-900 text-white shadow-md' 
                                : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-600'
                            }`}
                        >
                            {isDebug ? 'VIS ON' : 'VIS OFF'}
                        </button>

                        {/* Desktop Resize Handle */}
                        <div 
                            onMouseDown={handleMouseDown}
                            className="hidden sm:flex w-6 h-6 items-center justify-center cursor-ew-resize hover:bg-neutral-200 rounded text-neutral-300 hover:text-emerald-500 transition-colors"
                            title="Resize Width"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <polyline points="9 21 3 21 3 15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-8 overflow-hidden touch-auto">
                    <StripCode 
                        text={inputText} 
                        height={stripHeight} 
                        debugMode={isDebug}
                    />

                    {inputText.length === 0 && (
                        <div className="w-full text-center py-8">
                            <span className="text-neutral-400 font-mono text-xs sm:text-sm italic">Waiting for input...</span>
                        </div>
                    )}
                </div>
                
                {/* Bottom Right Resize Handle (Touch Friendly) */}
                <div 
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    className="absolute bottom-1 right-1 cursor-ew-resize p-2 sm:p-1 opacity-40 hover:opacity-100 transition-opacity z-20"
                >
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 11H1V10H11V11ZM11 7H5V6H11V7ZM11 3H9V2H11V3Z" fill="#171717"/>
                    </svg>
                </div>
            </div>
            
            {/* Detailed Visual Legend */}
            {isDebug && (
                <div className="mt-8 flex flex-col items-center animate-fade-in-up w-full px-2">
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-6 max-w-4xl bg-white/50 p-4 rounded-lg border border-neutral-200">
                        
                        {/* COLUMN ZONES */}
                        <div className="flex flex-col gap-2">
                             <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-200 pb-1 mb-1">Column Zones</div>
                             <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-emerald-500 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">META: CURR</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-teal-600 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">META: TOT</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-blue-500 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">PAYLOAD</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-purple-500 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">ECC</span>
                                </div>
                             </div>
                        </div>

                        {/* SEPARATOR */}
                        <div className="hidden sm:block w-px bg-neutral-200"></div>

                        {/* RIGHT FINDER STATES */}
                        <div className="flex flex-col gap-2">
                             <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-200 pb-1 mb-1">RF Status</div>
                             <div className="grid grid-cols-3 sm:flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-orange-500 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">EVEN</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-pink-500 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">ODD</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 border-2 border-red-500 bg-transparent rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">END</span>
                                </div>
                             </div>
                        </div>

                        {/* SEPARATOR */}
                         <div className="hidden sm:block w-px bg-neutral-200"></div>

                        {/* ROWS */}
                         <div className="flex flex-col gap-2">
                             <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-200 pb-1 mb-1">Row Matrix</div>
                             <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-2.5 bg-red-600/20 border border-red-600 rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">CLOCK (0/7)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-2.5 bg-amber-500/20 border border-amber-500 rounded-sm"></div>
                                    <span className="text-[9px] font-bold text-neutral-600">PARITY (5)</span>
                                </div>
                             </div>
                        </div>

                    </div>
                </div>
            )}
            
            {!isDebug && (
                <div className="mt-4 text-center text-[10px] text-neutral-400 font-mono">
                    GENERATED BY STRIPCODE V8 ENGINE // REV A-G
                </div>
            )}
          </div>
      </main>
    </div>
  );
};