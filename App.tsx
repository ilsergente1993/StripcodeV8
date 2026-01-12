import React, { useState } from 'react';
import { Laboratory } from './components/Laboratory';
import { DocumentationPage } from './components/DocumentationPage';
import { BookPage } from './components/BookPage';
import { ScientificPaper } from './components/ScientificPaper';
import { ComparingPage } from './components/ComparingPage';
import StripCode from './components/StripCode';

type Page = 'index' | 'laboratory' | 'docs' | 'comparing';

// --- MOCKUP COMPONENTS (CSS-Only) ---

const TicketMockup = () => (
    <div className="relative w-[650px] h-[260px] flex font-sans rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT PART */}
        <div className="flex-[2.8] bg-[#FCA549] p-6 relative flex flex-col justify-between text-[#1F2937]">
            {/* Left Vertical Stripcode */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-black/5 bg-[#e89843]">
                 <div className="-rotate-90 whitespace-nowrap opacity-80 mix-blend-multiply origin-center translate-y-2">
                     <StripCode 
                        text="FESTIVAL_TICKET_ID_9928334_GATE_A" 
                        height={20} 
                        showLabels={false} 
                        disableReflow={true} 
                        revealTextOnHover={true}
                        detailedTooltip={false}
                    />
                 </div>
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 -rotate-90 text-[8px] font-mono font-bold tracking-widest opacity-40 whitespace-nowrap">
                    #882910293
                 </div>
            </div>

            <div className="pl-10 h-full flex flex-col justify-between">
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.9] text-[#1a1a1a]">Festival<br/>Ticket</h1>
                    <p className="mt-2 font-bold uppercase tracking-widest text-xs opacity-70">Stadium Arena</p>
                </div>

                <div className="flex items-end justify-between w-full">
                    <div className="flex items-center gap-2">
                        <span className="text-6xl font-black tracking-tighter text-[#1a1a1a]">20</span>
                        <div className="flex flex-col font-bold text-xs leading-tight uppercase">
                            <span>September</span>
                            <span className="opacity-60">20:35</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                         <div className="border-2 border-black/10 rounded px-3 py-1 bg-black/5">
                            <span className="block text-[9px] font-bold uppercase opacity-50">Seat</span>
                            <span className="block text-xl font-bold leading-none">20</span>
                         </div>
                         <div className="border-2 border-black/10 rounded px-3 py-1 bg-black/5">
                            <span className="block text-[9px] font-bold uppercase opacity-50">Row</span>
                            <span className="block text-xl font-bold leading-none">03</span>
                         </div>
                    </div>
                </div>
                
                <div className="text-[9px] font-bold uppercase opacity-40 mt-2 tracking-wide">
                    General Admission • Non-Refundable • Rain or Shine
                </div>
            </div>
        </div>

        {/* PERFORATION */}
        <div className="w-[2px] bg-[#FCA549] relative flex flex-col items-center justify-center z-10">
             <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-black/20"></div>
             <div className="absolute -top-3 -left-2 w-5 h-5 bg-neutral-100 rounded-full shadow-inner"></div>
             <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-neutral-100 rounded-full shadow-inner"></div>
        </div>

        {/* RIGHT PART (STUB) */}
        <div className="flex-1 bg-[#FCA549] p-5 flex flex-col relative text-[#1F2937]">
            <div className="pr-6">
                <h2 className="text-xl font-black uppercase leading-none text-[#1a1a1a]">Festival<br/>Ticket</h2>
                <p className="mt-1 font-bold uppercase tracking-widest text-[9px] opacity-70">Stadium</p>
            </div>

            <div className="mt-4 flex items-center gap-1">
                 <span className="text-3xl font-black tracking-tighter text-[#1a1a1a]">20</span>
                 <div className="flex flex-col font-bold text-[9px] leading-tight uppercase">
                    <span>Sept</span>
                    <span className="opacity-60">20:35</span>
                 </div>
            </div>

            <div className="mt-auto space-y-1 pr-6 mb-2">
                 <div className="flex justify-between items-baseline border-b border-black/10 pb-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">Seat</span>
                    <span className="text-sm font-bold">20</span>
                 </div>
                 <div className="flex justify-between items-baseline border-b border-black/10 pb-1">
                    <span className="text-[9px] font-bold uppercase opacity-50">Row</span>
                    <span className="text-sm font-bold">03</span>
                 </div>
            </div>
            
            {/* Right Vertical Stripcode */}
            <div className="absolute right-2 top-0 bottom-0 w-8 flex items-center justify-center">
                 <div className="-rotate-90 whitespace-nowrap opacity-90 mix-blend-multiply origin-center scale-75">
                     <StripCode 
                        text="FESTIVAL_20_SEPT_SEAT_20_ROW_03" 
                        height={24} 
                        showLabels={false} 
                        disableReflow={true} 
                        revealTextOnHover={true}
                        detailedTooltip={false}
                    />
                 </div>
            </div>
        </div>
    </div>
);

const ParcelMockup = () => (
    <div className="relative w-[300px] h-[340px] bg-white border-4 border-neutral-900 flex flex-col font-sans text-neutral-900 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="flex border-b-4 border-neutral-900 h-20">
            <div className="w-20 border-r-4 border-neutral-900 flex items-center justify-center">
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
                USPS PRIORITY MAIL <span className="text-sm border border-black rounded-full w-4 h-4 flex items-center justify-center">R</span>
            </h2>
        </div>

        {/* Address Info */}
        <div className="flex-1 p-3 text-[10px] font-bold relative flex flex-col">
             <div className="absolute top-2 right-1 text-right">
                <div className="text-lg leading-none">0004</div>
                <div className="border-2 border-neutral-900 px-1 inline-block text-[11px] mt-1">C000</div>
            </div>

            <div className="mb-2 uppercase leading-tight text-neutral-500 text-[9px]">
                John Doe<br/>
                123 Main St<br/>
                Washington, DC 20268
            </div>
            
            <div className="mb-3 uppercase font-bold text-neutral-900 text-[9px]">
                NO DELIVERY WEEKEND OR HOLIDAY
            </div>

            <div className="flex mt-2">
                 <span className="w-12 pt-1 text-neutral-500 uppercase text-[9px]">Ship To:</span>
                 <div className="uppercase text-xs leading-snug font-bold">
                    John Doe<br/>
                    John Doe Enterprises<br/>
                    123 Main St<br/>
                    Merrifield VA 22082
                 </div>
            </div>
        </div>

        {/* Tracking Section (Thick Border Top) */}
        <div className="border-t-[4px] border-neutral-900 p-2 relative">
             <div className="text-center font-bold text-[10px] uppercase mb-1">USPS TRACKING #</div>
             
             {/* Replaces Barcode - Large Stripcode with Wrapping */}
             <div className="flex justify-center mb-1 bg-white border-y border-neutral-100 py-1 w-full px-1">
                 <StripCode 
                    text="9505_5120_1224_1110_0000_00_LOGISTICS_RT_009" 
                    height={24} // Reduced height to fit multiple lines
                    showLabels={false} 
                    disableReflow={false} // Enable wrapping
                    revealTextOnHover={true}
                    detailedTooltip={false}
                    className="grayscale"
                />
             </div>
             <div className="text-center font-mono text-[10px] tracking-widest font-bold mb-1">
                9505 5120 1224 1110 0000 00
             </div>

             {/* Footer with small QR replacement (Bottom Right) */}
             <div className="absolute bottom-3 right-3 border border-neutral-900 p-0.5 bg-white">
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

const BoardingPassMockup = () => {
    // Longer text to demonstrate wrapping on the main ticket
    const encodedData = "AZ0324_CDG_FCO_22MAY_1510_ROSSI_MARIO_MR_ETKT0552102897424_SEQ004_OPERATED_BY_ITA_AIRWAYS_MAIN_CABIN_CHECKED_BAGGAGE_02";
    
    return (
        <div className="relative w-[720px] h-[260px] bg-white rounded-xl overflow-hidden shadow-2xl flex font-sans">
             {/* Left (Main Ticket) */}
             <div className="flex-[3.5] flex flex-col border-r-2 border-dashed border-neutral-200 relative overflow-hidden">
                {/* Header */}
                <div className="h-14 bg-[#000080] flex items-center justify-between px-6 text-white">
                     <div className="flex items-center gap-2">
                        <span className="font-black italic text-2xl tracking-tighter">ITA</span>
                        <span className="font-light uppercase text-[10px] tracking-widest mt-1 opacity-80">Airways</span>
                     </div>
                     <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Boarding Pass</div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                         <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">Passenger Name</div>
                            <div className="text-lg font-bold text-neutral-900">ROSSI / MARIO MR</div>
                         </div>
                         <div className="text-right">
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">Class</div>
                            <div className="text-lg font-bold text-neutral-900">ECONOMY</div>
                         </div>
                    </div>

                    <div className="flex gap-12 mt-1">
                        <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">From</div>
                            <div className="text-xl font-bold text-neutral-900">PARIS <span className="text-sm font-normal text-neutral-400">CDG</span></div>
                        </div>
                         <div className="flex items-center pt-2 text-neutral-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                         </div>
                        <div>
                            <div className="text-[9px] uppercase text-neutral-400 font-bold tracking-wide">To</div>
                            <div className="text-xl font-bold text-neutral-900">ROME <span className="text-sm font-normal text-neutral-400">FCO</span></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-2 p-2 bg-neutral-50 rounded border border-neutral-100">
                         <div>
                            <div className="text-[8px] uppercase text-neutral-400 font-bold tracking-wide">Flight</div>
                            <div className="text-base font-black text-neutral-900">AZ324</div>
                         </div>
                         <div>
                            <div className="text-[8px] uppercase text-neutral-400 font-bold tracking-wide">Date</div>
                            <div className="text-base font-bold text-neutral-900">22MAY</div>
                         </div>
                         <div>
                            <div className="text-[8px] uppercase text-neutral-400 font-bold tracking-wide">Boarding</div>
                            <div className="text-base font-bold text-neutral-900">14:30</div>
                         </div>
                         <div>
                            <div className="text-[8px] uppercase text-neutral-400 font-bold tracking-wide">Gate</div>
                            <div className="text-base font-black text-neutral-900">A68</div>
                         </div>
                    </div>

                    {/* Stripcode Section - Full Width, Wrapping Enabled, Constrained Width */}
                    <div className="mt-2 pt-2 relative border-t border-neutral-100">
                        {/* Max Width added to prevent overflowing the flex container */}
                        <div className="w-full max-w-[500px]">
                            <StripCode 
                                text={encodedData}
                                height={24}
                                showLabels={false}
                                revealTextOnHover={true}
                                detailedTooltip={false}
                                disableReflow={false} // Allow wrapping
                                verticalGap={4}
                                className="grayscale opacity-90"
                            />
                        </div>
                    </div>
                </div>
             </div>

             {/* Stub (Right) */}
             <div className="flex-1 flex flex-col bg-white min-w-[180px]">
                <div className="h-14 bg-[#000080] flex items-center justify-center text-white">
                    <span className="font-black italic text-lg tracking-tighter">ITA</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <div className="space-y-3 mb-2">
                        <div>
                            <div className="text-[8px] uppercase text-neutral-400 font-bold">Passenger</div>
                            <div className="text-sm font-bold text-neutral-900 truncate">ROSSI/MARIO</div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-[8px] uppercase text-neutral-400 font-bold">Flight</div>
                                <div className="text-sm font-bold text-neutral-900">AZ324</div>
                            </div>
                             <div>
                                <div className="text-[8px] uppercase text-neutral-400 font-bold">Date</div>
                                <div className="text-sm font-bold text-neutral-900">22MAY</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-[8px] uppercase text-neutral-400 font-bold">Seat</div>
                            <div className="text-2xl font-black text-neutral-900 text-center bg-neutral-100 rounded py-1">47A</div>
                        </div>
                    </div>

                    {/* Stub Stripcode - Same text, wrapped, SMALLER HEIGHT */}
                    <div className="mt-auto border-t border-neutral-100 pt-2 overflow-hidden">
                         <StripCode 
                                text={encodedData}
                                height={12} // Reduced height
                                showLabels={false}
                                revealTextOnHover={true}
                                detailedTooltip={false}
                                disableReflow={false}
                                verticalGap={1}
                                className="grayscale opacity-80"
                            />
                    </div>
                </div>
             </div>
        </div>
    );
};

const SecureIDMockup = () => (
    <div className="relative w-[450px] h-[280px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 font-sans flex flex-col text-neutral-900">
        
        {/* Top Header with Stripcode - Calculated density for full width fill */}
        <div className="pt-5 px-6 pb-4 bg-neutral-900 flex flex-col items-center relative shadow-sm">
             <div className="w-full flex justify-center invert opacity-90">
                <StripCode 
                    text="S10010010019770201110201" 
                    height={44} // Calculated height to fill ~400px width with 24 chars (approx density)
                    showLabels={false} 
                    disableReflow={true}
                    revealTextOnHover={true}
                    detailedTooltip={false}
                />
             </div>
        </div>
        
        {/* Magnetic Stripe (Decorative) */}
        <div className="w-full h-8 bg-[#1a1a1a] border-t border-neutral-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white/10 to-transparent"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-5 flex gap-4 bg-white relative">
            
            {/* Holographic Watermark Overlay */}
            <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-100/40 to-blue-100/40 blur-2xl pointer-events-none"></div>

            {/* Left Text Info */}
            <div className="w-[140px] text-[7px] font-bold leading-[1.3] text-neutral-500 flex flex-col relative z-10">
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-3 h-3 bg-red-600 rounded-[1px] shadow-sm"></div>
                    <span className="text-[11px] font-black text-neutral-900 tracking-tight leading-none">MEDICAL<br/>ALERT</span>
                </div>
                
                <div className="space-y-2 border-l-2 border-neutral-100 pl-2">
                    <p className="uppercase">
                        <span className="text-neutral-900">Encoded Data:</span><br/>
                        Birth, Expiration, Revision, & Transaction Dates.
                    </p>
                    <p className="uppercase">
                        <span className="text-neutral-900">Identity:</span><br/>
                        DL/ID Card #, Name, Address, Gender.
                    </p>
                    <p className="uppercase">
                        <span className="text-neutral-900">System:</span><br/>
                        Issuing State & Inventory Control #.
                    </p>
                </div>
                
                {/* Vertical Text */}
                <div className="absolute right-[-14px] top-10 text-xl tracking-[0.3em] origin-center rotate-90 text-neutral-100 font-black select-none pointer-events-none">
                    SECURE
                </div>
            </div>

            {/* Right: DENSE Stripcode Body */}
            <div className="flex-1 flex items-start justify-center pt-1 z-10 overflow-hidden">
                <div className="border border-neutral-100 bg-neutral-50/50 p-2 w-full rounded h-full flex items-center">
                    <div className="w-full max-w-[200px]">
                        <StripCode 
                            text="MEDICAL_ALERT_SYSTEM_ID_88292_DOB_1985_05_12_EXP_2030_NO_ALLERGIES_TYPE_A_POS_DONOR_YES_CONTACT_ICE" 
                            height={14} // Reduced height further to prevent overflow
                            showLabels={false} 
                            disableReflow={false} // Allow wrapping
                            verticalGap={2} // Tiny gap between strips
                            revealTextOnHover={true}
                            detailedTooltip={false}
                            className="grayscale opacity-90"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom OCR Text */}
        <div className="px-6 pb-3 pt-2 font-mono text-[8px] leading-tight tracking-[0.15em] text-neutral-400 uppercase border-t border-neutral-100 bg-neutral-50/30">
            IDUSAS1001001&lt;0&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br/>
            7702010F1502020USA&lt;&lt;&lt;&lt;&lt;&lt;&lt;MI&lt;0
        </div>
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('index');
  const [docSlideIndex, setDocSlideIndex] = useState(0);
  const [mockupSlideIndex, setMockupSlideIndex] = useState(0);

  const docSlides = [
      { id: 'paper', component: <ScientificPaper />, label: 'Scientific Implementation' },
      { id: 'book', component: <BookPage />, label: 'Narrative Implementation' }
  ];

  const mockupSlides = [
      { id: 'ticket', component: <TicketMockup />, label: 'Event Ticketing', desc: 'Seamless stub integration.' },
      { id: 'parcel', component: <ParcelMockup />, label: 'Parcel Delivery', desc: 'High-speed tracking for logistics.' },
      { id: 'boarding', component: <BoardingPassMockup />, label: 'Boarding Pass', desc: 'Multi-line encoding for travel docs.' },
      { id: 'id', component: <SecureIDMockup />, label: 'Medical Data Card', desc: 'High-density medical record encoding.' }
  ];

  const nextDocSlide = () => setDocSlideIndex((prev) => (prev + 1) % docSlides.length);
  const prevDocSlide = () => setDocSlideIndex((prev) => (prev - 1 + docSlides.length) % docSlides.length);

  const nextMockupSlide = () => setMockupSlideIndex((prev) => (prev + 1) % mockupSlides.length);
  const prevMockupSlide = () => setMockupSlideIndex((prev) => (prev - 1 + mockupSlides.length) % mockupSlides.length);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-50 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HEADER */}
      <header className="flex-none h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-30 shadow-sm">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('index')}>
            <div className="w-6 h-6 bg-neutral-900 text-white flex items-center justify-center font-bold text-xs rounded">V9</div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 font-sans">
                STRIPCODE <span className="text-emerald-600">GEN</span>
            </h1>
        </div>
        
        <nav className="flex items-center space-x-8">
            <button 
                onClick={() => setCurrentPage('index')}
                className={`text-sm font-bold tracking-wide transition-colors ${currentPage === 'index' ? 'text-neutral-900 border-b-2 border-emerald-500' : 'text-neutral-500 hover:text-emerald-600'}`}
            >
                USE CASES
            </button>
            <button 
                onClick={() => setCurrentPage('comparing')}
                className={`text-sm font-bold tracking-wide transition-colors ${currentPage === 'comparing' ? 'text-neutral-900 border-b-2 border-emerald-500' : 'text-neutral-500 hover:text-emerald-600'}`}
            >
                COMPARING
            </button>
            <button 
                onClick={() => setCurrentPage('laboratory')}
                className={`text-sm font-bold tracking-wide transition-colors ${currentPage === 'laboratory' ? 'text-neutral-900 border-b-2 border-emerald-500' : 'text-neutral-500 hover:text-emerald-600'}`}
            >
                LABORATORY
            </button>
            <button 
                onClick={() => setCurrentPage('docs')}
                className={`text-sm font-bold tracking-wide transition-colors ${currentPage === 'docs' ? 'text-neutral-900 border-b-2 border-emerald-500' : 'text-neutral-500 hover:text-emerald-600'}`}
            >
                DOCUMENTATION
            </button>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* INDEX PAGE (USE CASES) */}
        {currentPage === 'index' && (
            <div className="h-full overflow-y-auto bg-neutral-100 pb-20 scroll-smooth">
                <div className="max-w-7xl mx-auto py-12 px-4 space-y-16">
                    
                    {/* SECTION 1: FORMATTING ENGINE SLIDESHOW */}
                    <section className="relative group/slider">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-neutral-900">Formatting Engine</h2>
                            <p className="text-neutral-500 mt-2">
                                Substrate-compatible encoding for standard print media.
                            </p>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-neutral-200 border border-neutral-300 max-w-5xl mx-auto h-[600px]">
                            {/* Slides Container */}
                            <div 
                                className="flex transition-transform duration-500 ease-in-out h-full" 
                                style={{ transform: `translateX(-${docSlideIndex * 100}%)` }}
                            >
                                {docSlides.map((slide, idx) => (
                                    <div key={idx} className="w-full flex-shrink-0 h-full overflow-y-auto bg-neutral-100 flex items-start justify-center pt-8">
                                        {/* Scale wrapper to fit big docs in the slider view */}
                                        <div className="transform scale-[0.65] origin-top shadow-lg">
                                            <div className="pointer-events-none">{slide.component}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Controls */}
                            <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
                                <button onClick={prevDocSlide} className="w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-neutral-800">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                                </button>
                            </div>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
                                <button onClick={nextDocSlide} className="w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-neutral-800">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                </button>
                            </div>

                            {/* Label Badge */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                                {docSlides[docSlideIndex].label}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: REAL WORLD APPLICATIONS */}
                    <section>
                         <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-neutral-900">Real-World Integration</h2>
                            <p className="text-neutral-500 mt-2">
                                High-aesthetic deployment replacing legacy QR matrices.
                            </p>
                        </div>

                        <div className="relative max-w-4xl mx-auto h-[350px] flex items-center justify-center">
                            
                            {/* Simple Card Slider */}
                            <div className="flex items-center gap-8 transition-all duration-500">
                                {/* Previous Preview */}
                                <div className="opacity-40 scale-75 blur-[1px] cursor-pointer" onClick={prevMockupSlide}>
                                    {mockupSlides[(mockupSlideIndex - 1 + mockupSlides.length) % mockupSlides.length].component}
                                </div>

                                {/* Active Slide */}
                                <div className="z-10 transform scale-100 shadow-[0_0_50px_rgba(16,185,129,0.15)] rounded-xl transition-transform duration-300">
                                    {mockupSlides[mockupSlideIndex].component}
                                </div>

                                {/* Next Preview */}
                                <div className="opacity-40 scale-75 blur-[1px] cursor-pointer" onClick={nextMockupSlide}>
                                    {mockupSlides[(mockupSlideIndex + 1) % mockupSlides.length].component}
                                </div>
                            </div>

                             {/* Mobile/Quick Nav Dots */}
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
                                {mockupSlides.map((_, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setMockupSlideIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-colors ${idx === mockupSlideIndex ? 'bg-emerald-500' : 'bg-neutral-300'}`}
                                    />
                                ))}
                             </div>
                        </div>
                        
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-bold text-neutral-800">{mockupSlides[mockupSlideIndex].label}</h3>
                            <p className="text-sm text-neutral-500">{mockupSlides[mockupSlideIndex].desc}</p>
                        </div>

                    </section>

                </div>
            </div>
        )}

        {/* COMPARING PAGE */}
        {currentPage === 'comparing' && (
            <ComparingPage />
        )}

        {/* LABORATORY PAGE */}
        {currentPage === 'laboratory' && (
            <Laboratory />
        )}

        {/* DOCUMENTATION PAGE */}
        {currentPage === 'docs' && (
            <DocumentationPage />
        )}

      </div>
    </div>
  );
};

export default App;