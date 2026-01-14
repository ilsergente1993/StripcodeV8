import React from 'react';
import StripCode from '../StripCode';

export const SecureIDMockup = () => (
    <div className="relative w-[800px] h-[450px] flex items-center justify-center select-none group perspective-[2000px] p-8">
        
        {/* === FRONT CARD (Bottom Left Layer) === */}
        <div className="absolute left-4 top-12 w-[440px] h-[280px] rounded-xl overflow-hidden shadow-xl z-10 transition-all duration-700 ease-out group-hover:translate-x-[-40px] group-hover:rotate-y-[5deg] group-hover:scale-[1.02] bg-gradient-to-br from-[#e0f7fa] via-[#e3f2fd] to-[#e8f5e9] border border-neutral-300/50">
            
            {/* Security Pattern (Guilloche Simulation) */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(circle at 30% 20%, rgba(22, 163, 74, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(2, 132, 199, 0.1) 0%, transparent 50%)` }}>
            </div>
            <div className="absolute inset-0 opacity-[0.08]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c10-10 20-10 30 0s10 20 0 30-20 10-30 0-10-20 0-30zM0 0c10-10 20-10 30 0s10 20 0 30-20 10-30 0-10-20 0-30z' fill='%230284c7' fill-rule='evenodd'/%3E%3C/svg%3E")`}}>
            </div>

            {/* Header Band */}
            <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-orange-300/30 via-transparent to-red-300/30"></div>
            </div>

            {/* Content Container */}
            <div className="relative p-5 h-full flex flex-col font-sans">
                
                {/* Top Section */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        {/* EU/Italy Flag Icon */}
                        <div className="w-9 h-6 bg-[#003399] rounded-[2px] flex items-center justify-center border border-white/20 shadow-sm relative overflow-hidden">
                            <span className="text-white font-bold text-[8px] tracking-tight z-10">IT</span>
                            <div className="absolute inset-0 flex flex-wrap justify-center items-center opacity-30">
                                <div className="text-[4px] text-yellow-400">★</div>
                            </div>
                        </div>
                        <div className="text-[8px] font-bold leading-[1.1] text-[#004d40] tracking-wide uppercase">
                            Repubblica Italiana<br/>
                            <span className="text-[#01579b]">Ministero dell'Interno</span>
                        </div>
                    </div>
                    <div className="text-[11px] font-mono font-bold text-neutral-800 tracking-wide">CA 00000 AA</div>
                </div>

                <div className="absolute top-14 right-5 text-[7px] font-bold text-[#01579b] uppercase tracking-widest opacity-70">
                    Carta di Identità / Identity Card
                </div>

                {/* Main Body */}
                <div className="flex gap-5 mt-4">
                    {/* Photo Box */}
                    <div className="w-[100px] h-[130px] bg-neutral-200 relative overflow-hidden shadow-inner grayscale rounded-[2px]">
                        <div className="absolute inset-0 flex items-end justify-center bg-neutral-300">
                            <svg className="w-24 h-24 text-neutral-400 mb-[-10px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        </div>
                        {/* Hologram Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-60 mix-blend-soft-light"></div>
                        <div className="absolute bottom-1 left-1 text-[6px] font-bold text-white drop-shadow-md">ITA</div>
                    </div>

                    {/* Personal Details */}
                    <div className="flex-1 space-y-1.5 pt-1">
                        <div>
                            <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Cognome / Surname</div>
                            <div className="text-[13px] font-bold text-neutral-900 leading-none">ROSSI</div>
                        </div>
                        <div>
                            <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Nome / Name</div>
                            <div className="text-[13px] font-bold text-neutral-900 leading-none">BIANCA</div>
                        </div>
                        
                        <div className="flex gap-4">
                            <div>
                                <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Nata il / Born</div>
                                <div className="text-[10px] font-bold text-neutral-900">30.12.1994</div>
                            </div>
                            <div>
                                <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Sesso / Sex</div>
                                <div className="text-[10px] font-bold text-neutral-900">F</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div>
                                <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Statura / Height</div>
                                <div className="text-[10px] font-bold text-neutral-900">165</div>
                            </div>
                            <div>
                                <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Cittadinanza</div>
                                <div className="text-[10px] font-bold text-neutral-900">ITA</div>
                            </div>
                        </div>

                        <div className="pt-1">
                            <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Scadenza / Expiry</div>
                            <div className="text-[10px] font-bold text-neutral-900">30.12.2034</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Right Number */}
                <div className="absolute bottom-3 right-5">
                    <div className="text-[11px] font-bold text-neutral-800 tracking-wider">123456</div>
                </div>
            </div>
        </div>

        {/* === BACK CARD (Top Right Layer - Overlapping) === */}
        <div className="absolute left-[300px] top-[100px] w-[440px] h-[280px] rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-20 transition-all duration-700 ease-out group-hover:translate-x-[20px] group-hover:rotate-y-[-5deg] group-hover:scale-[1.02] bg-gradient-to-tl from-[#e0f7fa] to-[#f1f8e9] border border-neutral-300/50">
             
             {/* Security Pattern */}
             <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='18' fill='none' stroke='%2315803d' stroke-width='0.5'/%3E%3C/svg%3E")`}}></div>

             <div className="p-6 relative h-full flex flex-col font-sans">
                
                {/* Top Row Data */}
                <div className="flex justify-between items-start mb-5">
                    <div>
                        <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Codice Fiscale / Tax Code</div>
                        <div className="text-[13px] font-mono font-bold text-neutral-900 tracking-tight">RSSBNC94T70H501U</div>
                    </div>
                    <div className="text-right">
                         <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Estremi Atto di Nascita</div>
                         <div className="text-[9px] font-bold text-neutral-700">00000.2.A00</div>
                    </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                    <div className="text-[6px] text-[#01579b] uppercase font-bold tracking-tight">Indirizzo di Residenza / Residence</div>
                    <div className="text-[10px] font-bold text-neutral-900 leading-tight">VIA DELLE ROSE 12<br/>00100 ROMA (RM)</div>
                </div>

                {/* STRIPCODE INTEGRATION */}
                {/* Replacing the standard barcode with V9 Stripcode */}
                <div className="my-2 border-y border-blue-200/50 py-3 bg-white/60 backdrop-blur-[2px] shadow-sm">
                    <div className="w-full flex justify-center">
                        <StripCode 
                            text="ID_ITA_RSSBNC94T70H501U_DOC_CA00000AA_EXP_20341230_SEC_L3" 
                            height={32} 
                            showLabels={false} 
                            disableReflow={false} 
                            revealTextOnHover={true}
                            detailedTooltip={false}
                            className="opacity-90 mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* MRZ - Machine Readable Zone (Bottom) */}
                <div className="mt-auto font-mono text-[11px] leading-[1.4] tracking-[0.15em] text-neutral-600/90 break-all bg-white/40 p-2 rounded-sm border-t border-neutral-100">
                    IDITACA00000AA4&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>
                    9412308F3412304ITA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;0<br/>
                    ROSSI&lt;&lt;BIANCA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                </div>
             </div>
        </div>
    </div>
);