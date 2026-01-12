import React from 'react';
import StripCode from './StripCode';

interface BookPageProps {
  inputText?: string;
}

// Meaningful chunks for the story
const TXT_1_CHUNK = "KEY_NOT_IN_LOCK_BUT_IN_HAND"; 
const TXT_2_CHUNK = "V9_HANDSHAKE_INIT_2049_SECURE";
const TXT_3_CHUNK = "DATA_CORRECTION_ALPHA_NINE_ZERO";
const TXT_INLINE_1 = "PG_142_REF_0A";
const TXT_INLINE_2 = "PG_142_LOCK";
const TXT_FOOTER_LONG = "ARCHIVE_RECORD_744_992_X_FINAL_ENTRY_LOG_SYSTEM_OFFLINE_TERMINATED_BY_ADMIN_V9_SIG_END";

export const BookPage: React.FC<BookPageProps> = () => {
  const fontSize = 18; 
  const stripHeight = fontSize;
  const verticalGap = fontSize * 0.5;

  return (
    <div className="w-full flex justify-center py-12 px-4 bg-[#f0f0eb]">
      <div 
        className="relative bg-[#fbf9f4] text-[#1a1918] shadow-2xl rounded-[2px] flex flex-col font-book"
        style={{
           boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)',
           width: '600px', // Standard trade paperback width approx
           minHeight: '900px',
           padding: '60px 50px', // Standard margins
        }}
      >
        {/* Paper Grain */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-multiply" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        ></div>

        {/* Header */}
        <div className="flex justify-between items-start text-xs text-neutral-400 mb-8 font-sans z-10">
            <span>The Archive</span>
            <span>142</span>
        </div>

        {/* Content */}
        <div className="z-10 text-left leading-relaxed text-neutral-900" style={{ fontSize: `${fontSize}px` }}>
            <h2 className="text-2xl font-bold mb-8 text-neutral-800">Chapter 4: The Protocol</h2>

            <p className="mb-4">
                The room was silent. Elara adjusted her glasses, peering at the faded manuscript. "It's not just ink," she whispered. "It's executable code." She traced the margin, where the text seemed to fracture. It was specifically labeled <span className="inline-block align-middle mx-1"><StripCode text={TXT_INLINE_1} height={14} showLabels={false} revealTextOnHover={true} disableReflow={true} detailedTooltip={false} /></span> in the margin notes.
            </p>

            {/* Block 1 */}
            <div className="my-6 grayscale opacity-80 mix-blend-multiply pl-4 border-l-2 border-neutral-300">
                 <StripCode 
                    text={TXT_1_CHUNK} 
                    height={stripHeight} 
                    showLabels={false}
                    verticalGap={verticalGap}
                    revealTextOnHover={true}
                    detailedTooltip={false}
                />
            </div>

            <p className="mb-4">
                The scanner chirped. A simple key, likely for a physical locker. But as she turned the page, the density of the markings increased. The paragraphs themselves were merely carriers for a deeper signal. A signal that screamed <span className="inline-block align-middle mx-1"><StripCode text={TXT_INLINE_2} height={14} showLabels={false} revealTextOnHover={true} disableReflow={true} detailedTooltip={false} /></span> to anyone watching.
            </p>
            
            <p className="mb-4">
                "Look at this," she pointed. "Two clusters. A handshake."
            </p>

            {/* Block 2 */}
            <div className="my-6 grayscale opacity-80 mix-blend-multiply">
                 <StripCode 
                    text={TXT_2_CHUNK} 
                    height={stripHeight} 
                    showLabels={false}
                    verticalGap={verticalGap}
                    revealTextOnHover={true}
                    detailedTooltip={false}
                />
            </div>

            <p className="mb-4">
                The terminal accepted the authorization. Screens flickered to life. The final block was the most complex—a dense transmission that defied standard encryption.
            </p>

             {/* Block 3 */}
             <div className="my-6 grayscale opacity-80 mix-blend-multiply">
                 <StripCode 
                    text={TXT_3_CHUNK} 
                    height={stripHeight} 
                    showLabels={false}
                    verticalGap={verticalGap}
                    revealTextOnHover={true}
                    detailedTooltip={false}
                />
            </div>

            <p>
                 She sat back. The book wasn't history. It was a weapon.
            </p>
        </div>

        {/* Footer Footnotes & Long Code */}
        <div className="mt-auto pt-8 border-t border-neutral-300 z-10">
             <div className="text-xs space-y-3 text-neutral-600 mb-6">
                <div className="flex gap-2 items-start">
                    <span>1.</span>
                    <div className="w-full">
                        <p className="mb-1">Primary substrate layer ID.</p>
                        <div className="grayscale opacity-60"><StripCode text="REF_ID_001" height={10} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} /></div>
                    </div>
                </div>
                <div className="flex gap-2 items-start">
                    <span>2.</span>
                    <div className="w-full">
                        <p className="mb-1">Secondary auth key (Level 2).</p>
                        <div className="grayscale opacity-60"><StripCode text="SEC_AUTH" height={10} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} /></div>
                    </div>
                </div>
             </div>
             
             {/* Long Footer Code */}
             <div className="w-full overflow-hidden grayscale opacity-40">
                <StripCode 
                    text={TXT_FOOTER_LONG} 
                    height={24} 
                    showLabels={false} 
                    revealTextOnHover={true}
                    detailedTooltip={false}
                />
             </div>
        </div>

      </div>
    </div>
  );
};