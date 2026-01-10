import React from 'react';
import StripCode from './StripCode';

export const ScientificPaper: React.FC = () => {
  return (
    <div className="w-full bg-[#e8e8e8] py-12 px-4 flex justify-center font-serif text-[#000]">
      <div className="bg-white shadow-xl w-full max-w-[816px] min-h-[1056px] p-[48px] text-[10pt] leading-[1.2]">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-[18pt] font-bold leading-tight mb-2">
            On the Security of the V8 Optical Protocol<br/>for Analog Data Retention
          </h1>
          <div className="text-[11pt] italic mb-4">
            Dr. Elara Vance<sup>1</sup>, J. Doe<sup>2</sup>
          </div>
          <div className="text-[9pt]">
            <sup>1</sup>Department of Optical Cryptography, University of Milan<br/>
            <sup>2</sup>Stripcode Research Labs
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-2 gap-6 text-justify">
            
            {/* LEFT COL */}
            <div className="flex flex-col gap-4">
                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">Abstract</strong>
                    <p className="indent-4">
                        We present a novel analysis of the Stripcode V8 protocol. Unlike traditional QR matrices, V8 utilizes a linear clock-phasing mechanism 
                        <span className="inline-block align-middle mx-1 opacity-80" style={{ height: '14px' }}>
                             {/* Inline Stripcode Example */}
                             <StripCode text="CLOCK_PHASE_SYNC" height={14} showLabels={false} verticalGap={0} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                        </span>
                        to ensure synchronization across curved surfaces. This paper demonstrates that while V8 is robust against shear distortion, it remains vulnerable to high-frequency optical noise.
                    </p>
                </div>

                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">1. Introduction</strong>
                    <p className="indent-4 mb-2">
                        The need for high-density, analog-compatible storage has driven the development of linear barcodes. The V8 standard [1] introduces a unique "split-byte" architecture.
                    </p>
                    <p className="indent-4">
                        Data is encoded in 4-bit nibbles, protected by a rolling hash ECC [2]. The physical layer requires precise printing tolerances.
                    </p>
                </div>

                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">2. Protocol Analysis</strong>
                    <p className="indent-4 mb-2">
                        The core innovation is the <span className="italic">Liquid Reflow</span> capability.
                    </p>
                    <div className="my-2 border-t border-b border-black py-2">
                        <figure className="text-center">
                            <div className="grayscale">
                                <StripCode text="RAW_PACKET_STREAM_DUMP_400DPI_SAMPLE_A" height={24} showLabels={false} revealTextOnHover={true} detailedTooltip={false} />
                            </div>
                            <figcaption className="text-[8pt] mt-1 font-sans italic text-neutral-600">
                                Fig 1. Raw packet stream captured at 400dpi.
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>

            {/* RIGHT COL */}
            <div className="flex flex-col gap-4">
                 <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">3. Security Implications</strong>
                    <p className="indent-4 mb-2">
                        Our attack model assumes an adversary with access to a standard photocopier. 
                        By modifying the parity bit <span className="inline-block align-middle mx-1"><StripCode text="PARITY_ERR_INJECT" height={10} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} /></span> in the 5th row, we can induce a collision in the ECC check.
                    </p>
                    <p className="indent-4">
                         However, the overhead columns (LF/RF) provide a strong anchor that rejects 99.8% of malformed packets during the scanning phase.
                    </p>
                </div>

                 <div className="flex-1"></div>

                 {/* REFERENCES */}
                 <div className="mt-8 pt-4 border-t-2 border-black">
                    <strong className="block text-[9pt] font-bold mb-2 uppercase">References</strong>
                    <ul className="text-[8pt] space-y-3">
                        <li className="flex gap-2">
                            <span className="font-bold">[1]</span>
                            <div className="flex flex-col w-full">
                                <span>V8 Standards Committee. <i>"Optical Data Retention in Paper Substrates."</i> 2024.</span>
                                <div className="mt-1 opacity-80 grayscale">
                                    <StripCode text="REF_STD_COMM_24" height={12} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold">[2]</span>
                            <div className="flex flex-col w-full">
                                <span>Shannon, C. & Turing, A. <i>"Rolling Hash Implementations for 4-bit Logic."</i> J. Crypt. 1948.</span>
                                <div className="mt-1 opacity-80 grayscale">
                                    <StripCode text="REF_SHANNON_48" height={12} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold">[3]</span>
                            <div className="flex flex-col w-full">
                                <span>Vance, E. <i>"The Geometry of Information."</i> Proceeding of CCS, 2023.</span>
                                <div className="mt-1 opacity-80 grayscale">
                                    <StripCode text="REF_VANCE_23" height={12} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                                </div>
                            </div>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-[8pt] border-t border-black pt-2">
            ACM CCS '02, November 18-22, 2002, Washington, DC, USA. Copyright 2002 ACM 1-58113-612-9/02/0011...$5.00.
        </div>
      </div>
    </div>
  );
};