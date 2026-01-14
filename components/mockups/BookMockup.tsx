import React from 'react';
import StripCode from '../StripCode';

interface BookMockupProps {
  inputText?: string;
}

// Iliad Chunks
const TXT_1_CHUNK = "CANTAMI_O_DIVA_DEL_PELIDE_ACHILLE_L_IRA_FUNESTA_CHE_INFINITI_ADDUSSE_LUTTI_AGLI_ACHEI"; 
const TXT_2_CHUNK = "MOLTE_ANZI_TEMPO_ALL_ORCO_GENEROSE_TRAVOLSE_ALME_D_EROI_E_DI_CANI_E_D_AUGELLI_ORRIDO_PASTO";
const TXT_3_CHUNK = "COSI_DI_GIOVE_L_ALTO_CONSIGLIO_S_ADEMPIA_DA_QUANDO_PRIMAMENTE_DISGIUNSE_ASPRA_CONTESA";

// Updated to be longer as requested
const TXT_INLINE_1 = "L_IRA_FUNESTA_CHE_INFINITI_ADDUSSE_LUTTI_AGLI_ACHEI";
const TXT_INLINE_2 = "E_QUAL_DE_NUMI_INIMICOLLI_IL_FIGLIO_DI_LATONA_E_DI_GIOVE";

export const BookMockup: React.FC<BookMockupProps> = () => {
  const fontSize = 18; 
  const stripHeight = fontSize;
  const verticalGap = fontSize * 0.5;

  return (
    <div 
      className="relative bg-[#fbf9f4] text-[#1a1918] shadow-2xl rounded-[2px] flex flex-col font-book mx-auto"
      style={{
          boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)',
          width: '600px', 
          height: '900px', // Fixed height
          padding: '40px 30px', // Reduced padding
          overflow: 'hidden'
      }}
    >
      {/* Paper Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-multiply" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Header */}
      <div className="flex justify-between items-start text-xs text-neutral-400 mb-6 font-sans z-10">
          <span>Iliade</span>
          <span>3</span>
      </div>

      {/* Content */}
      <div className="z-10 text-left leading-relaxed text-neutral-900" style={{ fontSize: `${fontSize}px` }}>
          <h2 className="text-2xl font-bold mb-6 text-neutral-800 italic">Libro Primo</h2>

          <p className="mb-4">
              Cantami, o Diva, del Pelìde Achille l'ira funesta che infiniti addusse lutti agli Achei, molte anzi tempo all'Orco generose travolse alme d'eroi. Era questo il segnale, l'inizio della fine, scritto non solo nel destino ma nel codice stesso della 
              <span className="inline-block align-baseline mx-1">
                  <StripCode text={TXT_INLINE_1} height={14} showLabels={false} revealTextOnHover={true} disableReflow={true} detailedTooltip={false} />
              </span> 
              memoria.
          </p>

          {/* Block 1 */}
          <div className="my-4 grayscale opacity-80 mix-blend-multiply pl-4 border-l-2 border-neutral-300">
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
              E di cani e d'augelli orrido pasto lor salme abbandonò (così di Giove l'alto consiglio s'adempìa), da quando primamente disgiunse aspra contesa il re de' prodi Atride e il divo Achille. E qual de' 
              <span className="inline-block align-baseline mx-1">
                  <StripCode text={TXT_INLINE_2} height={14} showLabels={false} revealTextOnHover={true} disableReflow={true} detailedTooltip={false} />
              </span> 
              numi inimicolli?
          </p>
          
          {/* Block 2 */}
          <div className="my-4 grayscale opacity-80 mix-blend-multiply">
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
              Il figlio di Latona e di Giove. Irato al Re, destò nel campo un morbo orrendo, e la gente perìa: colpa d'Atride che fece al sacerdote Crise onta. Costui venuto agli annosi vascelli achei, per riscattar la figlia.
          </p>

            {/* Block 3 */}
            <div className="my-4 grayscale opacity-80 mix-blend-multiply">
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
                Infinite seco portava ricchezze, e in man le bende dell'arco lungi-saettante Apollo.
          </p>
      </div>

      {/* Footer Footnotes & Long Code */}
      <div className="mt-auto pt-6 border-t border-neutral-300 z-10">
            
            <div className="w-full grayscale opacity-60 mb-4">
              <StripCode 
                  text="COMMENTARIO_AL_LIBRO_PRIMO_VERSO_UNO_QUARANTA_V9_ARCHIVE_NODE_772_BETA" 
                  height={14} 
                  showLabels={false} 
                  revealTextOnHover={true} 
                  detailedTooltip={false} 
                  disableReflow={true} 
              />
            </div>

            <div className="w-full grayscale opacity-60">
              <StripCode 
                  text="INDEX_REFERENZIATO_PELIDE_ACHILLE_ATRIDE_AGAMENNONE_CRISE_APOLLO_MONTI_1810" 
                  height={14} 
                  showLabels={false} 
                  revealTextOnHover={true} 
                  detailedTooltip={false} 
                  disableReflow={true} 
              />
            </div>
      </div>

    </div>
  );
};