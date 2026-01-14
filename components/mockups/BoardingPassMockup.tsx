import React from 'react';
import StripCode from '../StripCode';

export const BoardingPassMockup = () => {
    // Longer text to demonstrate wrapping on the main ticket
    const encodedData = "AZ0324_CDG_FCO_22MAY_1510_ROSSI_MARIO_MR_ETKT0552102897424_SEQ004_OPERATED_BY_ITA_AIRWAYS_MAIN_CABIN_CHECKED_BAGGAGE_02";
    const brandColor = "#002395"; // ITA Airways Blue
    
    return (
        <div className="relative w-[750px] h-[280px] bg-white rounded-2xl overflow-hidden shadow-2xl flex font-sans group select-none">
             {/* Texture */}
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply" 
                  style={{ backgroundImage: `radial-gradient(circle, #000 0.5px, transparent 0.5px)`, backgroundSize: '10px 10px' }}></div>

             {/* Left (Main Ticket) */}
             <div className="flex-[3.5] flex flex-col border-r-2 border-dashed border-neutral-300 relative z-10">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 text-white relative overflow-hidden" style={{ backgroundColor: brandColor }}>
                     {/* Decorative Wing Curve */}
                     <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/10 skew-x-12 transform origin-bottom translate-x-10"></div>
                     
                     <div className="flex items-center gap-3 z-10">
                        <span className="font-black italic text-3xl tracking-tighter">ITA</span>
                        <div className="h-6 w-[1px] bg-white/30"></div>
                        <span className="font-medium uppercase text-[11px] tracking-[0.2em] opacity-90">Airways</span>
                     </div>
                     <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 z-10">Boarding Pass</div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between relative bg-white">
                    <div className="flex justify-between items-start">
                         <div>
                            <div className="text-[10px] uppercase text-neutral-400 font-bold tracking-wide mb-1">Passenger Name</div>
                            <div className="text-xl font-bold text-neutral-900">ROSSI / MARIO MR</div>
                         </div>
                         <div className="text-right">
                            <div className="text-[10px] uppercase text-neutral-400 font-bold tracking-wide mb-1">Class</div>
                            <div className="text-xl font-bold text-neutral-900">ECONOMY</div>
                         </div>
                    </div>

                    <div className="flex gap-16 mt-2 items-center">
                        <div>
                            <div className="text-[10px] uppercase text-neutral-400 font-bold tracking-wide mb-1">From</div>
                            <div className="text-3xl font-black text-neutral-900 tracking-tight">PARIS <span className="text-lg font-normal text-neutral-400 ml-1">CDG</span></div>
                        </div>
                         <div className="text-neutral-300 pt-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                         </div>
                        <div>
                            <div className="text-[10px] uppercase text-neutral-400 font-bold tracking-wide mb-1">To</div>
                            <div className="text-3xl font-black text-neutral-900 tracking-tight">ROME <span className="text-lg font-normal text-neutral-400 ml-1">FCO</span></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4 p-3 bg-neutral-50/80 rounded-lg border border-neutral-100">
                         <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">Flight</div>
                            <div className="text-lg font-black text-neutral-900">AZ324</div>
                         </div>
                         <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">Date</div>
                            <div className="text-lg font-bold text-neutral-900">22MAY</div>
                         </div>
                         <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">Boarding</div>
                            <div className="text-lg font-bold text-neutral-900">14:30</div>
                         </div>
                         <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">Gate</div>
                            <div className="text-lg font-black text-neutral-900 text-emerald-600">A68</div>
                         </div>
                    </div>

                    {/* Stripcode Section */}
                    <div className="mt-3 pt-3 relative border-t border-neutral-100">
                        <div className="w-full max-w-[520px]">
                            <StripCode 
                                text={encodedData}
                                height={24}
                                showLabels={false}
                                revealTextOnHover={true}
                                detailedTooltip={false}
                                disableReflow={false} 
                                verticalGap={4}
                                className="grayscale opacity-90"
                            />
                        </div>
                    </div>
                </div>
             </div>

             {/* Stub (Right) */}
             <div className="flex-1 flex flex-col bg-white min-w-[200px] z-10 relative">
                 {/* Perforation visual */}
                <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] z-20 flex flex-col items-center justify-center overflow-hidden">
                    {Array.from({length: 20}).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-neutral-100 rounded-full my-1.5 shadow-inner"></div>
                    ))}
                </div>

                <div className="h-16 flex items-center justify-center text-white" style={{ backgroundColor: brandColor }}>
                    <span className="font-black italic text-xl tracking-tighter">ITA</span>
                </div>
                <div className="p-5 flex-1 flex flex-col relative">
                    <div className="space-y-4 mb-2">
                        <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold">Passenger</div>
                            <div className="text-sm font-bold text-neutral-900 truncate">ROSSI/MARIO</div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-[9px] uppercase text-neutral-400 font-bold">Flight</div>
                                <div className="text-sm font-bold text-neutral-900">AZ324</div>
                            </div>
                             <div>
                                <div className="text-[9px] uppercase text-neutral-400 font-bold">Date</div>
                                <div className="text-sm font-bold text-neutral-900">22MAY</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold">Seat</div>
                            <div className="text-3xl font-black text-neutral-900 text-center bg-neutral-100 rounded py-2 mt-1">47A</div>
                        </div>
                    </div>

                    {/* Stub Stripcode */}
                    <div className="mt-auto border-t border-neutral-100 pt-2 overflow-hidden">
                         <StripCode 
                                text={encodedData}
                                height={16} 
                                showLabels={false}
                                revealTextOnHover={true}
                                detailedTooltip={false}
                                disableReflow={false}
                                verticalGap={2}
                                className="grayscale opacity-80"
                            />
                    </div>
                </div>
             </div>
        </div>
    );
};