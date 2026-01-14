import React from 'react';
import StripCode from '../StripCode';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-neutral-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-neutral-100 min-h-screen font-sans">
        
        {/* Header */}
        <div className="p-10 border-b border-neutral-100 bg-white">
          <div className="flex justify-between items-start">
            <div>
                <h2 className="text-4xl font-black text-neutral-900 mb-2 tracking-tight">Stripcode V9 Protocol</h2>
                <p className="text-sm text-neutral-400 uppercase tracking-widest font-mono">Reference Manual // Rev. B-2</p>
            </div>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-200">
                Stable Release
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-12 space-y-16">
          
          {/* SECTION 1 */}
          <section>
            <div className="flex items-baseline gap-4 border-b-2 border-neutral-900 pb-4 mb-8">
                <span className="text-xl font-black text-neutral-900">01.</span>
                <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Physical Architecture</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-sm leading-relaxed">
                <div>
                    <p className="mb-6 text-neutral-600">
                        The V9 standard enforces a rigid 8-row vertical matrix. This fixed height ensures compatibility with standard linear CCD arrays while allowing infinite horizontal expansion. Each column represents 1 Byte of vertical data (8 bits), split into data, parity, and control tracks.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors">
                            <span className="font-mono text-[10px] bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">R0</span>
                            <span className="font-bold text-neutral-900">Clock A</span>
                            <span className="text-neutral-500 text-xs ml-auto">Alternating 1/0 for grid align</span>
                        </li>
                        <li className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors">
                            <span className="font-mono text-[10px] bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">R1-R4</span>
                            <span className="font-bold text-neutral-900">Data Nibble</span>
                            <span className="text-neutral-500 text-xs ml-auto">4-bit Payload Fragment</span>
                        </li>
                        <li className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors">
                            <span className="font-mono text-[10px] bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">R5</span>
                            <span className="font-bold text-emerald-700">Parity</span>
                            <span className="text-neutral-500 text-xs ml-auto">Vertical XOR Checksum</span>
                        </li>
                        <li className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors">
                            <span className="font-mono text-[10px] bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">R6</span>
                            <span className="font-bold text-neutral-400">Separator</span>
                            <span className="text-neutral-500 text-xs ml-auto">Quiet track (Except Markers)</span>
                        </li>
                        <li className="flex items-center gap-3 p-2 rounded bg-blue-50/50 border border-blue-100">
                            <span className="font-mono text-[10px] bg-blue-200 px-1.5 py-0.5 rounded text-blue-800">R7</span>
                            <span className="font-bold text-blue-700">Timeline</span>
                            <span className="text-blue-500 text-xs ml-auto">Sync + Absolute Position</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100 flex items-center justify-center">
                     <div className="font-mono text-xs">
                        {/* Visual Matrix Rep */}
                        {[0,1,2,3,4,5,6,7].map(row => (
                            <div key={row} className="flex gap-2 mb-1 items-center">
                                <span className="text-neutral-300 w-4 text-right">R{row}</span>
                                <div className="flex gap-0.5">
                                    {[1,0,1,1,0,1,0,0].map((bit, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-[1px] ${
                                            row === 7 ? 'bg-blue-500' : 
                                            row === 5 ? 'bg-emerald-500' :
                                            (row > 0 && row < 5) ? 'bg-neutral-800' : 
                                            bit ? 'bg-neutral-400' : 'bg-neutral-200'
                                        }`}></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
          </section>

          {/* SECTION 2: R7 DEEP DIVE */}
          <section>
            <div className="flex items-baseline gap-4 border-b-2 border-blue-600 pb-4 mb-8">
                <span className="text-xl font-black text-blue-600">02.</span>
                <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wide">The Timeline Track (Row 7)</h3>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8 text-blue-900 text-sm leading-relaxed">
                <p>
                    <strong>Architectural Change:</strong> Previous iterations (V1-V8) relied on header metadata to establish position. V9 embeds 
                    <strong> absolute geolocation data</strong> directly into the bottom row (R7) of every payload segment. This enables "shred recovery"—a scanner can read a torn fragment of a stripcode and know exactly where that fragment belongs in the larger message stream.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Logic Column */}
                <div className="md:col-span-7 space-y-8">
                    
                    <div>
                        <h4 className="font-bold text-neutral-900 text-base mb-3">The 19-Column Supercycle</h4>
                        <p className="text-sm text-neutral-600 mb-4">
                            Row 7 does not carry payload data. Instead, it repeats a strict 19-column control cycle composed of three distinct phases. This cycle runs asynchronously to the byte boundaries.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex gap-4 p-3 border-l-2 border-neutral-300 pl-4">
                                <div className="text-xs font-mono font-bold text-neutral-400 min-w-[60px]">COLS 1-12</div>
                                <div>
                                    <h5 className="text-sm font-bold text-neutral-800">Phase A: Local Clock (Skew Correction)</h5>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Carries a standard alternating signal (1-0-1-0) that is always the inverse of the primary Clock A (R0). 
                                        <strong> Purpose:</strong> Allows the decoder to calculate local tilt/skew by comparing phase offsets between Top (R0) and Bottom (R7) rows.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-3 border-l-2 border-emerald-400 pl-4 bg-emerald-50/30 rounded-r">
                                <div className="text-xs font-mono font-bold text-emerald-600 min-w-[60px]">COLS 13-15</div>
                                <div>
                                    <h5 className="text-sm font-bold text-emerald-900">Phase B: SYNC Burst</h5>
                                    <p className="text-xs text-emerald-700 mt-1">
                                        A violation of the clock rule. Three consecutive HIGH bits <span className="font-mono bg-white px-1 border rounded">[1, 1, 1]</span>.
                                        <strong> Purpose:</strong> Signals the start of a Position Frame. A scanner looks for this "illegal" clock pattern to reset its internal counters.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-3 border-l-2 border-blue-500 pl-4 bg-blue-50/30 rounded-r">
                                <div className="text-xs font-mono font-bold text-blue-600 min-w-[60px]">COLS 16-19</div>
                                <div>
                                    <h5 className="text-sm font-bold text-blue-900">Phase C: Geolocation Nibble</h5>
                                    <p className="text-xs text-blue-700 mt-1">
                                        4 bits encoding the normalized horizontal position (0-15).
                                        <br/>
                                        <code className="bg-blue-100 px-1 rounded mt-1 inline-block">Val = floor((Current_Col / Total_Cols) * 15)</code>
                                        <br/>
                                        <strong> Purpose:</strong> Tells the scanner "You are reading the 7th segment of 15". Essential for stitching partial scans.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Column */}
                <div className="md:col-span-5 flex flex-col items-center justify-start pt-4">
                    <div className="w-full bg-white p-4 border border-neutral-200 rounded-lg shadow-sm">
                        <div className="mb-2 flex justify-between text-[10px] text-neutral-400 font-mono uppercase">
                            <span>Visualization</span>
                            <span>R7 Track Isolation</span>
                        </div>
                        <div className="grayscale opacity-90 mb-4 overflow-hidden">
                             <StripCode text="TIMELINE_SYNC_LOGIC_TEST_SEQUENCE_V9" height={48} showLabels={false} revealTextOnHover={true} detailedTooltip={true} />
                        </div>
                        <div className="text-[10px] text-neutral-500 leading-snug">
                            <p className="mb-2"><strong>To Observe:</strong> Hover over the strip above.</p>
                            <p>Look at the bottom row (R7). You will see long alternating sections (Clock), interrupted by solid blocks (SYNC), followed by variable patterns (Position).</p>
                        </div>
                    </div>

                    <div className="mt-6 w-full bg-neutral-900 text-neutral-400 p-4 rounded-lg font-mono text-xs">
                        <div className="mb-2 text-white font-bold border-b border-neutral-700 pb-1">DECODER LOGIC PSEUDOCODE</div>
                        <pre className="whitespace-pre-wrap leading-relaxed">
{`if (R7_Buffer == [1,1,1]) {
  State = READ_POS;
  Bit_Counter = 0;
} 
else if (State == READ_POS) {
  Pos_Nibble |= (Bit << (3-Bit_Counter));
  Bit_Counter++;
  if (Bit_Counter == 4) State = IDLE;
}`}
                        </pre>
                    </div>
                </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section>
            <div className="flex items-baseline gap-4 border-b-2 border-neutral-900 pb-4 mb-8">
                <span className="text-xl font-black text-neutral-900">03.</span>
                <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Dynamic Markers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-600">
                <div className="p-6 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <strong className="text-emerald-600 block mb-2 text-sm tracking-wide border-b border-emerald-100 pb-2">START OF MESSAGE</strong>
                    The first packet is physically distinct. A "hole" (0-bit) is forced into the Top Block (Row 1) of the Left Finder pattern. This enables instant orientation detection even without reading payload.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <strong className="text-red-600 block mb-2 text-sm tracking-wide border-b border-red-100 pb-2">END OF MESSAGE</strong>
                    The final packet is marked by a "hole" (0-bit) in the Bottom Block (Row 6) of the Left Finder. This signals the decoder to finalize the stream buffer.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <strong className="text-purple-600 block mb-2 text-sm tracking-wide border-b border-purple-100 pb-2">NATURAL TERMINATION</strong>
                    V9 removes zero-padding. The strip ends naturally after the last ECC block and Right Finder. The Right Finder structure itself changes parity to indicate EOF.
                </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};