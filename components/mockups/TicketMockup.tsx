import React from 'react';
import StripCode from '../StripCode';

export const TicketMockup = () => (
    <div className="relative w-[700px] h-[280px] flex font-sans rounded-3xl overflow-hidden shadow-2xl select-none group">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-multiply" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* LEFT PART (Main) */}
        <div className="flex-[2.8] bg-gradient-to-br from-orange-400 to-orange-500 p-0 relative flex flex-col text-neutral-900">
            
            {/* Left Vertical Stripcode - Absolute Positioning for alignment */}
            <div className="absolute left-0 top-6 bottom-6 w-14 flex items-center justify-center border-r border-black/10 bg-black/5 z-10">
                 <div className="-rotate-90 whitespace-nowrap opacity-80 mix-blend-multiply">
                     <StripCode 
                        text="FESTIVAL_TICKET_ID_9928334_GATE_A" 
                        height={24} 
                        showLabels={false} 
                        disableReflow={true} 
                        revealTextOnHover={true}
                        detailedTooltip={false}
                        transparentBackground={true}
                    />
                 </div>
            </div>

            <div className="pl-20 pr-8 py-6 h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="inline-block px-2 py-0.5 bg-black text-orange-500 text-[10px] font-bold uppercase tracking-widest rounded mb-2">Live Event</div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.85] text-neutral-900 drop-shadow-sm">
                            Summer<br/>Festival
                        </h1>
                    </div>
                    <div className="text-right opacity-60 mix-blend-multiply">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    </div>
                </div>

                <div className="flex items-end justify-between w-full border-t-2 border-black/10 pt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-7xl font-black tracking-tighter text-neutral-900 leading-none">20</span>
                        <div className="flex flex-col font-bold text-sm leading-tight uppercase">
                            <span>September</span>
                            <span className="opacity-60">20:35 PM</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                         <div className="border-2 border-black/10 rounded-lg px-4 py-1 bg-white/10 backdrop-blur-sm">
                            <span className="block text-[9px] font-bold uppercase opacity-50">Seat</span>
                            <span className="block text-2xl font-black leading-none">20</span>
                         </div>
                         <div className="border-2 border-black/10 rounded-lg px-4 py-1 bg-white/10 backdrop-blur-sm">
                            <span className="block text-[9px] font-bold uppercase opacity-50">Row</span>
                            <span className="block text-2xl font-black leading-none">03</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* PERFORATION */}
        <div className="w-[2px] bg-orange-400 relative flex flex-col items-center justify-center z-30">
             <div className="absolute top-0 bottom-0 border-l-[3px] border-dotted border-black/30"></div>
             <div className="absolute -top-4 -left-3 w-8 h-8 bg-neutral-100 rounded-full shadow-inner"></div>
             <div className="absolute -bottom-4 -left-3 w-8 h-8 bg-neutral-100 rounded-full shadow-inner"></div>
        </div>

        {/* RIGHT PART (Stub) */}
        <div className="flex-1 bg-gradient-to-br from-orange-400 to-orange-500 p-0 flex flex-col relative text-neutral-900">
             <div className="px-6 py-6 h-full flex flex-col relative z-10">
                <div className="pr-8">
                    <h2 className="text-2xl font-black uppercase leading-none text-neutral-900 tracking-tighter">Summer<br/>Festival</h2>
                    <p className="mt-2 font-bold uppercase tracking-widest text-[9px] opacity-60">Admit One</p>
                </div>

                <div className="mt-auto space-y-2 pr-8 mb-2">
                     <div className="flex justify-between items-baseline border-b-2 border-black/10 pb-1">
                        <span className="text-[10px] font-bold uppercase opacity-50">Seat</span>
                        <span className="text-lg font-black">20</span>
                     </div>
                     <div className="flex justify-between items-baseline border-b-2 border-black/10 pb-1">
                        <span className="text-[10px] font-bold uppercase opacity-50">Row</span>
                        <span className="text-lg font-black">03</span>
                     </div>
                </div>
            </div>

            {/* Right Vertical Stripcode - Absolute positioned to match Left */}
            <div className="absolute right-0 top-6 bottom-6 w-10 flex items-center justify-center border-l border-black/10 bg-black/5 z-10">
                 <div className="-rotate-90 whitespace-nowrap opacity-90 mix-blend-multiply origin-center scale-90">
                     <StripCode 
                        text="FESTIVAL_20_SEPT_SEAT_20_ROW_03" 
                        height={24} 
                        showLabels={false} 
                        disableReflow={true} 
                        revealTextOnHover={true}
                        detailedTooltip={false}
                        transparentBackground={true}
                    />
                 </div>
            </div>
        </div>
    </div>
);