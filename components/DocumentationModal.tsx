import React from 'react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto flex flex-col text-neutral-600 font-sans border border-neutral-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Stripcode V9 Datasheet</h2>
            <p className="text-xs text-neutral-400 uppercase tracking-wide">Rev. B-2 // Enhanced Protocol</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-10">
          
          <section>
            <h3 className="text-sm font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              01. Physical Architecture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                    <p className="mb-2"><span className="font-semibold text-neutral-900">Row Matrix:</span> 8 Rows (Fixed Height)</p>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-500 mt-4">
                        <li><strong className="text-neutral-700">R0:</strong> Clock A (Alternating 1/0)</li>
                        <li><strong className="text-neutral-700">R1-R4:</strong> Data Nibble (MSB...LSB)</li>
                        <li><strong className="text-neutral-700">R5:</strong> Parity (XOR R1-R4)</li>
                        <li><strong className="text-neutral-700">R6:</strong> Separator</li>
                        <li><strong className="text-blue-600">R7:</strong> Timeline (Sync + Pos)</li>
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
            <h3 className="text-sm font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              02. Packet Structure (V9)
            </h3>
             <div className="overflow-hidden rounded-lg border border-neutral-200">
                <table className="w-full text-xs text-left bg-white">
                    <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 font-semibold">
                        <tr>
                            <th className="py-3 px-4">SECTION</th>
                            <th className="py-3 px-4">WIDTH</th>
                            <th className="py-3 px-4">DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        <tr>
                            <td className="py-3 px-4 font-bold text-neutral-800">FINDER_L</td>
                            <td className="py-3 px-4">3 Cols</td>
                            <td className="py-3 px-4 text-neutral-500">Dynamic: Contains First/Last Chunk Markers.</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 font-bold text-emerald-600">METADATA</td>
                            <td className="py-3 px-4">4 Cols</td>
                            <td className="py-3 px-4 text-neutral-500">Chunk Index & Total Count.</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 font-bold text-blue-600">PAYLOAD</td>
                            <td className="py-3 px-4">Variable</td>
                            <td className="py-3 px-4 text-neutral-500">Split-Byte + <strong className="text-blue-600">R7 Timeline</strong> Logic.</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 font-bold text-purple-600">ECC</td>
                            <td className="py-3 px-4">~25%</td>
                            <td className="py-3 px-4 text-neutral-500">Rolling Hash Error Correction.</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 font-bold text-neutral-800">FINDER_R</td>
                            <td className="py-3 px-4">2 Cols</td>
                            <td className="py-3 px-4 text-neutral-500">Right Anchor (Contains EOF bits).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 mb-6">
              03. Absolute Position Tracking
            </h3>
            <p className="text-xs mb-4 text-neutral-600">
                V9 introduces a 19-column cycle on Row 7 to maintain absolute position awareness:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-neutral-100 p-2 rounded">
                    <strong>1-12</strong><br/>Standard Clock
                </div>
                <div className="bg-blue-50 text-blue-800 p-2 rounded border border-blue-100">
                    <strong>13-15</strong><br/>SYNC Burst
                </div>
                <div className="bg-blue-50 text-blue-800 p-2 rounded border border-blue-100">
                    <strong>16-19</strong><br/>POS Index (4-bit)
                </div>
            </div>
          </section>

        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50 text-center rounded-b-xl">
            <button 
                onClick={onClose}
                className="px-8 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded shadow-lg hover:shadow-xl transition-all"
            >
                Close Datasheet
            </button>
        </div>
      </div>
    </div>
  );
};