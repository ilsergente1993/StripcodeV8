import React from 'react';
import StripCode from './StripCode';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-neutral-100 min-h-screen">
        
        {/* Header */}
        <div className="p-8 border-b border-neutral-100 bg-white">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Stripcode V9 Datasheet</h2>
          <p className="text-sm text-neutral-400 uppercase tracking-wide">Rev. B-2 // Enhanced Protocol</p>
        </div>

        {/* Body */}
        <div className="p-12 space-y-12">
          
          <section>
            <h3 className="text-lg font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              01. Physical Architecture (V9)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed">
                <div>
                    <p className="mb-4"><span className="font-semibold text-neutral-900">Row Matrix:</span> 8 Rows (Fixed Height). A single column represents 1 Byte of vertical data.</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 mt-4">
                        <li><strong className="text-neutral-900">R0:</strong> Clock A (Alternating 1/0)</li>
                        <li><strong className="text-neutral-900">R1-R4:</strong> Data Nibble (MSB...LSB)</li>
                        <li><strong className="text-neutral-900">R5:</strong> Parity (XOR R1-R4)</li>
                        <li><strong className="text-neutral-900">R6:</strong> Separator (Always 0, except in Markers)</li>
                        <li><strong className="text-blue-600">R7:</strong> Timeline / Abs Position Track</li>
                    </ul>
                </div>
                <div>
                     <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-100 font-mono text-xs shadow-sm">
                        <div className="flex justify-between border-b border-neutral-200 pb-2 mb-2 font-bold text-neutral-400">
                            <span>BIT</span><span>ROLE</span>
                        </div>
                        <div className="flex justify-between text-neutral-400"><span>0</span><span>CLK_A</span></div>
                        <div className="flex justify-between text-neutral-900 font-bold"><span>1</span><span>DATA_8</span></div>
                        <div className="flex justify-between text-neutral-900 font-bold"><span>2</span><span>DATA_4</span></div>
                        <div className="flex justify-between text-neutral-900 font-bold"><span>3</span><span>DATA_2</span></div>
                        <div className="flex justify-between text-neutral-900 font-bold"><span>4</span><span>DATA_1</span></div>
                        <div className="flex justify-between text-emerald-600 font-bold"><span>5</span><span>PARITY</span></div>
                        <div className="flex justify-between text-neutral-300"><span>6</span><span>SEP</span></div>
                        <div className="flex justify-between text-blue-500 font-bold"><span>7</span><span>TIMELINE</span></div>
                     </div>
                </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              02. The Timeline Track (Row 7)
            </h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 text-sm text-neutral-700">
                <p>
                    <strong>New in V9:</strong> Unlike V8's simple inverted clock, V9 utilizes Row 7 as a temporal anchor. 
                    This allows scanners to determine absolute position even during partial scans.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                    <h4 className="font-bold text-neutral-900 mb-2">Cycle Logic (19 Columns)</h4>
                    <p className="mb-4 text-neutral-600">Row 7 repeats a specific cycle every 19 columns of payload:</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                        <li><strong>1-12:</strong> Standard Clock (Inverted R0)</li>
                        <li><strong>13-15:</strong> <span className="font-mono bg-neutral-200 px-1 rounded">SYNC</span> Pattern [1, 1, 1]</li>
                        <li><strong>16-19:</strong> <span className="font-mono bg-neutral-200 px-1 rounded">POS</span> Index (4-bit binary)</li>
                    </ul>
                    <p className="mt-4 text-xs text-neutral-500">
                        The 4-bit POS index encodes the relative position (0-15) of the current segment within the total payload.
                    </p>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="grayscale opacity-80">
                         <StripCode text="TIMELINE_SYNC_TEST_PATTERN" height={32} showLabels={false} revealTextOnHover={true} detailedTooltip={true} />
                    </div>
                    <p className="text-center text-[10px] mt-2 text-neutral-400 font-mono">Observe R7 (Bottom Row) Logic</p>
                </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              03. Dynamic Sequence Markers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-600">
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">FIRST CHUNK MARKER</strong>
                    The first packet in a sequence is marked by a "hole" (0-bit) in the Top Block (Row 1) of the Left Finder. This visually indicates the start of a message.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">LAST CHUNK MARKER</strong>
                    The final packet is marked by a "hole" (0-bit) in the Bottom Block (Row 6) of the Left Finder.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">NATURAL WIDTH</strong>
                    V9 removes zero-padding. The strip ends naturally after the last ECC block and Right Finder, creating a variable-length aesthetic.
                </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};