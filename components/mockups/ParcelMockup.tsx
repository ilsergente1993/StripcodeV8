import React from 'react';
import StripCode from '../StripCode';

export const ParcelMockup = () => (
    <div className="relative w-[300px] h-[340px] bg-white border-4 border-neutral-900 flex flex-col font-sans text-neutral-900 shadow-xl overflow-hidden group">
        {/* Top Header */}
        <div className="flex border-b-4 border-neutral-900 h-20">
            <div className="w-20 border-r-4 border-neutral-900 flex items-center justify-center bg-neutral-100">
                <span className="text-7xl font-bold tracking-tighter">P</span>
            </div>
            <div className="flex-1 flex justify-end p-2 items-center">
                <div className="border-2 border-neutral-900 px-2 py-1 text-center text-[9px] font-bold leading-tight uppercase">
                    U.S.<br/>POSTAGE<br/>PAID
                </div>
            </div>
        </div>

        {/* Service Banner */}
        <div className="border-b-4 border-neutral-900 py-1 text-center bg-white">
            <h2 className="text-xl font-black uppercase tracking-tighter flex items-center justify-center gap-2">
                USPS PRIORITY MAIL <span className="text-sm border-2 border-black rounded-full w-5 h-5 flex items-center justify-center text-[10px]">R</span>
            </h2>
        </div>

        {/* Address Info */}
        <div className="flex-1 p-4 text-[11px] font-bold relative flex flex-col">
             <div className="absolute top-3 right-3 text-right">
                <div className="text-2xl leading-none font-black">0004</div>
                <div className="border-2 border-neutral-900 px-1 inline-block text-[11px] mt-1">C000</div>
            </div>

            <div className="mb-4 uppercase leading-tight text-neutral-400 text-[9px]">
                John Doe<br/>
                123 Main St<br/>
                Washington, DC 20268
            </div>
            
            <div className="mb-4 uppercase font-black text-neutral-900 text-[10px] tracking-wide">
                NO DELIVERY WEEKEND OR HOLIDAY
            </div>

            <div className="flex mt-2">
                 <span className="w-14 pt-1 text-neutral-400 uppercase text-[9px] font-bold">Ship To:</span>
                 <div className="uppercase text-sm leading-snug font-bold">
                    John Doe<br/>
                    John Doe Enterprises<br/>
                    123 Main St<br/>
                    Merrifield VA 22082
                 </div>
            </div>
        </div>

        {/* Tracking Section (Thick Border Top) */}
        <div className="border-t-[4px] border-neutral-900 p-2 relative bg-neutral-50">
             <div className="text-center font-bold text-[10px] uppercase mb-1 text-neutral-500">USPS TRACKING #</div>
             
             {/* Replaces Barcode - Large Stripcode with Wrapping */}
             <div className="flex justify-center mb-1 bg-white border-y-2 border-neutral-200 py-2 w-full px-1 shadow-sm">
                 <StripCode 
                    text="9505_5120_1224_1110_0000_00_LOGISTICS_RT_009" 
                    height={28} 
                    showLabels={false} 
                    disableReflow={false} 
                    revealTextOnHover={true}
                    detailedTooltip={false}
                    className="grayscale mix-blend-multiply"
                />
             </div>
             <div className="text-center font-mono text-[11px] tracking-[0.2em] font-bold mb-1">
                9505 5120 1224 1110
             </div>

             {/* Footer with small QR replacement (Bottom Right) */}
             <div className="absolute bottom-3 right-3 border-2 border-neutral-900 p-0.5 bg-white">
                <StripCode 
                    text="QR_9505" 
                    height={16} 
                    showLabels={false} 
                    disableReflow={true} 
                    revealTextOnHover={true}
                    detailedTooltip={false}
                />
             </div>
        </div>
    </div>
);