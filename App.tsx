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
            <div className="h-full overflow-y-auto bg-neutral-100 pb-20">
                <div className="max-w-7xl mx-auto py-12 px-4 space-y-16">
                    
                    {/* CASE 1: SCIENTIFIC PAPER */}
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-neutral-900">Academic Implementation</h2>
                            <p className="text-neutral-500 mt-2 max-w-2xl mx-auto">
                                Integrating Stripcode V9 into academic formatting for dense, optical reference management.
                                Based on standard ACM two-column layouts.
                            </p>
                        </div>
                        <ScientificPaper />
                    </section>

                    {/* SEPARATOR */}
                    <div className="w-24 h-1 bg-neutral-300 mx-auto rounded-full"></div>

                    {/* CASE 2: NOVEL */}
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-neutral-900">Narrative Embedding</h2>
                            <p className="text-neutral-500 mt-2 max-w-2xl mx-auto">
                                Substrate-compatible encoding for fiction and trade paperbacks. 
                                Demonstrates standard margins, left alignment, and footnote integration.
                            </p>
                        </div>
                        <BookPage />
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