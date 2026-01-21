import React, { useState, useRef, useEffect } from 'react';
import { LaboratoryPage } from './components/pages/LaboratoryPage';
import { DocumentationPage } from './components/pages/DocumentationPage';
import { ComparingPage } from './components/pages/ComparingPage';

// Import extracted mockups
import { TicketMockup } from './components/mockups/TicketMockup';
import { ParcelMockup } from './components/mockups/ParcelMockup';
import { BoardingPassMockup } from './components/mockups/BoardingPassMockup';
import { SecureIDMockup } from './components/mockups/SecureIDMockup';
import { BookMockup } from './components/mockups/BookMockup';
import { ScientificPaperMockup } from './components/mockups/ScientificPaperMockup';
import metadata from './metadata.json';


type Page = 'index' | 'laboratory' | 'docs' | 'comparing';

// --- MOCKUP CONFIGURATION ---
const MOCKUP_DIMENSIONS = {
    'ticket': { width: 700, height: 280 },
    'parcel': { width: 300, height: 340 },
    'boarding': { width: 750, height: 280 },
    'id': { width: 800, height: 450 },
    // Docs dimensions (must match the components exactly)
    'paper': { width: 816, height: 1056 },
    'book': { width: 600, height: 900 }
};

// --- RESPONSIVE SCALER COMPONENT ---
interface MockupScalerProps {
    children: React.ReactNode;
    baseWidth: number;
    baseHeight: number;
    id: string;
}

const MockupScaler: React.FC<MockupScalerProps> = ({ children, baseWidth, baseHeight, id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [pinchScale, setPinchScale] = useState(1);

    // Pinch gesture state
    const lastDist = useRef<number | null>(null);

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const parentW = containerRef.current.offsetWidth;
            const parentH = containerRef.current.offsetHeight;
            const padding = 20; // Reduced padding for better fit

            const availableW = Math.max(0, parentW - padding);
            const availableH = Math.max(0, parentH - padding);

            if (availableW === 0 || availableH === 0) return;

            const scaleW = availableW / baseWidth;
            const scaleH = availableH / baseHeight;

            // Fit containment
            const fitScale = Math.min(scaleW, scaleH);
            // Allow scaling up if screen is big, but limit huge upscaling
            setScale(Math.min(fitScale, 1.2));
        };

        updateScale();
        // Observer for smoother resizing
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [baseWidth, baseHeight, id]);

    // Touch handlers for Pinch to Zoom
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            lastDist.current = dist;
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && lastDist.current !== null) {
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            const factor = dist / lastDist.current;
            // Limit zoom levels
            setPinchScale(prev => Math.min(Math.max(prev * factor, 1), 3));
            lastDist.current = dist;
        }
    };

    const onTouchEnd = () => {
        lastDist.current = null;
    };

    // Reset pinch when slide changes
    useEffect(() => {
        setPinchScale(1);
    }, [id]);

    const totalScale = scale * pinchScale;

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div style={{
                width: baseWidth,
                height: baseHeight,
                transform: `scale(${totalScale})`,
                transformOrigin: 'center center',
                transition: lastDist.current ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}>
                {children}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('index');
    const [docSlideIndex, setDocSlideIndex] = useState(0);
    const [mockupSlideIndex, setMockupSlideIndex] = useState(0);

    const docSlides = [
        { id: 'paper', component: <ScientificPaperMockup />, label: 'Scientific Implementation', ...MOCKUP_DIMENSIONS.paper },
        { id: 'book', component: <BookMockup />, label: 'Narrative Implementation', ...MOCKUP_DIMENSIONS.book }
    ];

    const mockupSlides = [
        { id: 'ticket', component: <TicketMockup />, label: 'Event Ticketing', desc: 'Seamless stub integration.', ...MOCKUP_DIMENSIONS.ticket },
        { id: 'parcel', component: <ParcelMockup />, label: 'Parcel Delivery', desc: 'High-speed tracking for logistics.', ...MOCKUP_DIMENSIONS.parcel },
        { id: 'boarding', component: <BoardingPassMockup />, label: 'Boarding Pass', desc: 'Multi-line encoding for travel docs.', ...MOCKUP_DIMENSIONS.boarding },
        { id: 'id', component: <SecureIDMockup />, label: 'Medical Data Card', desc: 'High-density medical record encoding.', ...MOCKUP_DIMENSIONS.id }
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
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold tracking-tight text-neutral-900 font-sans leading-none">
                            STRIPCODE <span className="text-emerald-600">GEN</span>
                        </h1>
                        <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                            REV. {String(metadata.revision).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
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

                {/* Mobile Simple Nav */}
                <div className="md:hidden flex space-x-4">
                    <button onClick={() => setCurrentPage('laboratory')} className="text-xs font-bold text-emerald-600">LAB</button>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-hidden relative">

                {/* INDEX PAGE (USE CASES) */}
                {currentPage === 'index' && (
                    <div className="h-full overflow-y-auto bg-neutral-100 scroll-smooth overflow-x-hidden relative flex flex-col">
                        <div className="max-w-7xl mx-auto py-12 px-4 space-y-24 flex-1 w-full">

                            {/* SECTION 1: FORMATTING ENGINE SLIDESHOW (Rebuilt using Scaler) */}
                            <section className="relative group/slider pt-4 pb-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Formatting Engine</h2>
                                    <p className="text-neutral-500 mt-2 text-lg">
                                        Substrate-compatible encoding for standard print media.
                                    </p>
                                </div>

                                {/* New Responsive Slider Container */}
                                <div className="relative w-full h-[600px] bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">

                                    {/* Navigation Arrows */}
                                    <div className="absolute inset-y-0 left-0 w-20 z-30 flex items-center justify-center pointer-events-none">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevDocSlide(); }}
                                            className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 w-20 z-30 flex items-center justify-center pointer-events-none">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextDocSlide(); }}
                                            className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>

                                    {/* Viewport for Docs */}
                                    <div className="flex-1 relative w-full overflow-hidden bg-neutral-50/50">
                                        <MockupScaler
                                            id={docSlides[docSlideIndex].id}
                                            baseWidth={docSlides[docSlideIndex].width}
                                            baseHeight={docSlides[docSlideIndex].height}
                                        >
                                            {docSlides[docSlideIndex].component}
                                        </MockupScaler>
                                    </div>

                                    <div className="h-14 bg-white border-t border-neutral-100 flex items-center justify-center z-30">
                                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">{docSlides[docSlideIndex].label}</h3>
                                    </div>
                                </div>
                            </section>

                            {/* SECTION 2: REAL WORLD APPLICATIONS (RESPONSIVE SLIDER) */}
                            <section className="pb-12 w-full">
                                <div className="text-center mb-8 md:mb-16">
                                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">Real-World Integration</h2>
                                    <p className="text-neutral-500 mt-2 text-sm md:text-lg">
                                        High-aesthetic deployment. Pinch to zoom on mobile.
                                    </p>
                                </div>

                                <div className="relative w-full h-[350px] md:h-[500px] bg-neutral-200/50 rounded-2xl border border-neutral-200 overflow-hidden flex flex-col">

                                    {/* Navigation Arrows (Always Visible) */}
                                    <div className="absolute inset-y-0 left-0 w-16 z-30 flex items-center justify-center pointer-events-none">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevMockupSlide(); }}
                                            className="pointer-events-auto w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                    </div>

                                    <div className="absolute inset-y-0 right-0 w-16 z-30 flex items-center justify-center pointer-events-none">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextMockupSlide(); }}
                                            className="pointer-events-auto w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:scale-110 active:scale-95 transition-all"
                                        >
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>

                                    {/* Viewport for Mockup */}
                                    <div className="flex-1 relative w-full overflow-hidden">
                                        <MockupScaler
                                            id={mockupSlides[mockupSlideIndex].id}
                                            baseWidth={mockupSlides[mockupSlideIndex].width}
                                            baseHeight={mockupSlides[mockupSlideIndex].height}
                                        >
                                            {mockupSlides[mockupSlideIndex].component}
                                        </MockupScaler>
                                    </div>

                                    {/* Info Bar */}
                                    <div className="h-16 bg-white border-t border-neutral-200 flex items-center justify-between px-6 z-30">
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900">{mockupSlides[mockupSlideIndex].label}</h3>
                                            <p className="text-xs text-neutral-500 hidden md:block">{mockupSlides[mockupSlideIndex].desc}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {mockupSlides.map((_, idx) => (
                                                <div key={idx} className={`h-1.5 rounded-full transition-colors ${idx === mockupSlideIndex ? 'bg-emerald-500 w-6' : 'bg-neutral-300 w-1.5'}`} />
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>

                        {/* FOOTER - Explicitly at bottom of scroll container */}
                        <div className="mt-auto py-12 text-center text-neutral-400 text-xs font-mono border-t border-neutral-200 bg-neutral-100">
                            made with &lt;3 in Italy
                        </div>
                    </div>
                )}

                {/* COMPARING PAGE */}
                {currentPage === 'comparing' && (
                    <ComparingPage />
                )}

                {/* LABORATORY PAGE */}
                {currentPage === 'laboratory' && (
                    <LaboratoryPage />
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