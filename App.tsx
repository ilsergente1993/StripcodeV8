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
             <div className="flex justify-center mb-1 bg-white border-y border-neutral-100 py-1">
                 <StripCode 
                    text="9505_5120_1224_1110_0000_00" 
                    height={24} // Reduced height to fit multiple lines if needed
                    showLabels={false} 
                    disableReflow={false} // Enable wrapping for better visibility
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
                />
             </div>
        </div>
    </div>
);

const BoardingPassMockup = () => (
    <div className="relative w-[680px] h-[250px] bg-white rounded-xl overflow-hidden shadow-2xl flex font-sans">
        {/* Main Section */}
        <div className="flex-[3] flex flex-col relative">
            {/* Blue Header */}
            <div className="h-14 bg-[#0057b8] flex items-center justify-between px-6 text-white">
                <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                    <span className="font-bold tracking-wider italic text-lg">ITA AIRWAYS</span>
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Boarding Pass</div>
            </div>

            {/* Info Body */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-[9px] uppercase text-neutral-400 font-bold">Passenger Name</div>
                        <div className="text-lg font-bold text-neutral-800">ROSSI / MARIO MR</div>
                    </div>
                     <div className="text-right">
                        <div className="text-[9px] uppercase text-neutral-400 font-bold">Flight</div>
                        <div className="text-lg font-bold text-neutral-800">AZ 324</div>
                    </div>
                </div>

                <div className="flex gap-8 mb-4">
                    <div>
                        <div className="text-[9px] uppercase text-neutral-400 font-bold">From</div>
                        <div className="text-xl font-bold text-neutral-800">PARIS <span className="text-sm text-neutral-400 font-normal">CDG</span></div>
                    </div>
                    <div>
                        <div className="text-[9px] uppercase text-neutral-400 font-bold">To</div>
                        <div className="text-xl font-bold text-neutral-800">ROME <span className="text-sm text-neutral-400 font-normal">FCO</span></div>
                    </div>
                    <div>
                        <div className="text-[9px] uppercase text-neutral-400 font-bold">Date</div>
                        <div className="text-xl font-bold text-neutral-800">22 MAY</div>
                    </div>
                     <div>
                        <div className="text-[9px] uppercase text-neutral-400 font-bold">Time</div>
                        <div className="text-xl font-bold text-neutral-800">15:10</div>
                    </div>
                </div>
                
                <div className="mt-auto flex items-end justify-between">
                     {/* Stripcode replacing Barcode */}
                     <div className="w-[300px]">
                         <StripCode 
                            text="AZ324_CDG_FCO_22MAY_1510_ROSSI_MARIO_47A_SEQ004_ETKT055210" 
                            height={24} 
                            showLabels={false} 
                            disableReflow={false} 
                            verticalGap={4}
                            className="grayscale opacity-90"
                        />
                     </div>
                     
                     <div className="text-center">
                         <div className="text-[9px] uppercase text-neutral-400 font-bold">Seat</div>
                         <div className="text-3xl font-black text-neutral-900">47A</div>
                     </div>
                </div>
            </div>
        </div>

        {/* Perforation */}
        <div className="w-[2px] relative flex flex-col items-center justify-center bg-white">
             <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-neutral-200"></div>
        </div>

        {/* Stub Section */}
        <div className="flex-1 flex flex-col bg-white border-l border-neutral-100">
             <div className="h-10 bg-[#0057b8] flex items-center justify-center text-white">
                <span className="font-bold text-xs tracking-wider italic">ITA</span>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
                 <div>
                    <div className="text-[8px] uppercase text-neutral-400 font-bold">Passenger</div>
                    <div className="text-sm font-bold text-neutral-800 truncate">ROSSI/MARIO</div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <div className="text-[8px] uppercase text-neutral-400 font-bold">Flight</div>
                        <div className="text-sm font-bold text-neutral-800">AZ 324</div>
                    </div>
                    <div>
                        <div className="text-[8px] uppercase text-neutral-400 font-bold">Seat</div>
                        <div className="text-xl font-black text-neutral-800">47A</div>
                    </div>
                </div>
                <div className="flex justify-between">
                     <div>
                        <div className="text-[8px] uppercase text-neutral-400 font-bold">Gate</div>
                        <div className="text-sm font-bold text-neutral-800">A68</div>
                    </div>
                     <div>
                        <div className="text-[8px] uppercase text-neutral-400 font-bold">Zone</div>
                        <div className="text-sm font-bold text-neutral-800">3</div>
                    </div>
                </div>
                
                 {/* Small vertical stripcode on stub */}
                 <div className="mt-auto pt-2 border-t border-neutral-100">
                     <StripCode 
                        text="AZ324_STUB_47A" 
                        height={16} 
                        showLabels={false} 
                        disableReflow={true} 
                        className="grayscale opacity-60"
                    />
                 </div>
            </div>
        </div>
    </div>
);

const IDCardMockup = () => (
    <div className="relative w-[380px] h-[220px] bg-[#e3e5e8] rounded-xl overflow-hidden shadow-xl border border-white/50 flex font-sans">
        {/* Photo Area */}
        <div className="w-1/3 bg-neutral-300 relative overflow-hidden">
             <div className="absolute inset-0 bg-neutral-400 flex items-center justify-center text-neutral-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Info Area */}
        <div className="flex-1 p-5 flex flex-col relative">
             {/* Holographic Overlay Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50 pointer-events-none"></div>

             <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="text-[8px] uppercase font-bold text-neutral-500 tracking-wider">Department of Defense</div>
                    <div className="text-lg font-bold text-neutral-800 leading-none mt-1">ACCESS CARD</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white shadow-sm"></div>
             </div>

             <div className="space-y-1 mt-2">
                <div className="text-[9px] text-neutral-500 uppercase">Operative</div>
                <div className="font-mono text-sm font-bold text-neutral-900">J. DOE</div>
             </div>

             {/* Stripcode at bottom */}
             <div className="mt-auto pt-3 border-t border-neutral-300/50">
                <div className="mix-blend-multiply opacity-80">
                    <StripCode 
                        text="ACCESS_LEVEL_5_CLEARANCE_ALPHA" 
                        height={16} 
                        showLabels={false} 
                        disableReflow={true} 
                    />
                </div>
             </div>
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
      { id: 'id', component: <IDCardMockup />, label: 'Secure Access', desc: 'Embedded visual credentials.' }
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