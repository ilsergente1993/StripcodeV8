import React, { useState } from 'react';
import { Laboratory } from './components/Laboratory';
import { DocumentationPage } from './components/DocumentationPage';
import { BookPage } from './components/BookPage';
import { ScientificPaper } from './components/ScientificPaper';
import { ComparingPage } from './components/ComparingPage';

type Page = 'index' | 'laboratory' | 'docs' | 'comparing';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('index');

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-50 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HEADER */}
      <header className="flex-none h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 z-30 shadow-sm overflow-hidden">
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" onClick={() => setCurrentPage('index')}>
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs rounded shrink-0">V8</div>
            <div className="flex flex-col leading-none">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 font-sans whitespace-nowrap">
                    STRIPCODE <span className="text-emerald-600">GEN</span>
                </h1>
                <span className="text-[8px] sm:text-[9px] text-neutral-400 font-mono mt-0.5 uppercase tracking-tighter">REV 0.1</span>
            </div>
        </div>
        
        <nav className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto no-scrollbar ml-4 py-2 scroll-smooth">
            {[
              { id: 'index', label: 'USE CASES' },
              { id: 'comparing', label: 'COMPARING' },
              { id: 'laboratory', label: 'LABORATORY' },
              { id: 'docs', label: 'DOCUMENTATION' }
            ].map((item) => (
              <button 
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`text-[11px] sm:text-sm font-bold tracking-wide transition-colors whitespace-nowrap pb-1 ${
                    currentPage === item.id 
                    ? 'text-neutral-900 border-b-2 border-emerald-500' 
                    : 'text-neutral-500 hover:text-emerald-600'
                  }`}
              >
                  {item.label}
              </button>
            ))}
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* INDEX PAGE (USE CASES) */}
        {currentPage === 'index' && (
            <div className="h-full overflow-y-auto bg-neutral-100 pb-20">
                <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 space-y-12 sm:space-y-16">
                    
                    {/* CASE 1: SCIENTIFIC PAPER */}
                    <section>
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Academic Implementation</h2>
                            <p className="text-neutral-500 mt-2 text-sm sm:text-base max-w-2xl mx-auto px-4">
                                Integrating Stripcode V8 into academic formatting. Scroll horizontally to view the full document.
                            </p>
                        </div>
                        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
                          <ScientificPaper />
                        </div>
                    </section>

                    {/* SEPARATOR */}
                    <div className="w-16 sm:w-24 h-1 bg-neutral-300 mx-auto rounded-full"></div>

                    {/* CASE 2: NOVEL */}
                    <section>
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Narrative Embedding</h2>
                            <p className="text-neutral-500 mt-2 text-sm sm:text-base max-w-2xl mx-auto px-4">
                                Substrate-compatible encoding for fiction. Optimized for standard trade paperback margins.
                            </p>
                        </div>
                        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
                          <BookPage />
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