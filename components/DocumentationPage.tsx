import React from 'react';
import StripCode from './StripCode';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-neutral-100 min-h-screen">
        
        {/* Header */}
        <div className="p-8 border-b border-neutral-100 bg-white">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Stripcode V8 Datasheet</h2>
          <p className="text-sm text-neutral-400 uppercase tracking-wide">Rev. A-G // Standard Protocol</p>
        </div>

        {/* Body */}
        <div className="p-12 space-y-12">
          
          <section>
            <h3 className="text-lg font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              01. Physical Architecture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed">
                <div>
                    <p className="mb-4"><span className="font-semibold text-neutral-900">Row Matrix:</span> 8 Rows (Fixed Height). A single column represents 1 Byte of vertical data.</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 mt-4">
                        <li><strong className="text-neutral-900">R0:</strong> Clock A (Alternating 1/0)</li>
                        <li><strong className="text-neutral-900">R1-R4:</strong> Data Nibble (MSB...LSB)</li>
                        <li><strong className="text-neutral-900">R5:</strong> Parity (XOR R1-R4)</li>
                        <li><strong className="text-neutral-900">R6:</strong> Separator (Always 0)</li>
                        <li><strong className="text-neutral-900">R7:</strong> Clock B (Inverse R0)</li>
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
                        <div className="flex justify-between text-neutral-400"><span>7</span><span>CLK_B</span></div>
                     </div>
                </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              02. Packet Structure
            </h3>
            <div className="overflow-hidden rounded-lg border border-neutral-200 mb-6">
                <table className="w-full text-sm text-left bg-white">
                    <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 font-semibold">
                        <tr>
                            <th className="py-4 px-6">SECTION</th>
                            <th className="py-4 px-6">WIDTH</th>
                            <th className="py-4 px-6">DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">FINDER_L</td>
                            <td className="py-4 px-6">3 Cols</td>
                            <td className="py-4 px-6 text-neutral-500">Left Anchor (Solid/Empty Pattern).</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">QUIET_L</td>
                            <td className="py-4 px-6">1 Col</td>
                            <td className="py-4 px-6 text-neutral-500">Spacer.</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-emerald-600">METADATA</td>
                            <td className="py-4 px-6">4 Cols</td>
                            <td className="py-4 px-6 text-neutral-500">Chunk Index & Total Count.</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-blue-600">PAYLOAD</td>
                            <td className="py-4 px-6">Variable</td>
                            <td className="py-4 px-6 text-neutral-500">Split-Byte Encoded Data.</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-purple-600">ECC</td>
                            <td className="py-4 px-6">~25%</td>
                            <td className="py-4 px-6 text-neutral-500">Rolling Hash Error Correction.</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-6 font-bold text-neutral-800">FINDER_R</td>
                            <td className="py-4 px-6">2 Cols</td>
                            <td className="py-4 px-6 text-neutral-500">Right Anchor (Contains EOF bits).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full bg-neutral-100 p-8 rounded flex justify-center">
                 <StripCode text="EXAMPLE_PACKET_STRUCTURE" height={48} />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              03. Logic & Constraints
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-600">
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">ECC RATIO</strong>
                    Fixed at 0.25 (25%). For every 4 data columns, 1 parity column is generated to ensure data integrity.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">LIQUID REFLOW</strong>
                    Data flows naturally into available width. If the container shrinks, data splits into multiple valid packets.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">SPLIT-BYTE</strong>
                    ASCII characters are split into two 4-bit nibbles (High/Low) to fit the 4-bit central data channel.
                </div>
                <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-base">RIGHT FINDER LOGIC</strong>
                    The Right Finder encodes row parity (Even/Odd) and End-Of-File (EOF) status directly in the anchor pattern.
                </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};