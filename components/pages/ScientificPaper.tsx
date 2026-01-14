import React from 'react';
import StripCode from '../StripCode';

export const ScientificPaper: React.FC = () => {
  return (
    <div className="bg-white shadow-xl w-[816px] h-[1056px] p-[48px] text-[10pt] leading-[1.3] font-serif text-[#000] mx-auto overflow-hidden relative">
        
        {/* HEADER - Reduced margin */}
        <div className="text-center mb-6">
          <h1 className="text-[18pt] font-bold leading-tight mb-2 uppercase">
            Analisi Spettrale del Canto Primo:<br/>Encoding V9 dell'Ira Funesta
          </h1>
          <div className="text-[11pt] italic mb-3">
            Omero<sup>1</sup>, Vincenzo Monti<sup>2</sup>
          </div>
          <div className="text-[9pt]">
            <sup>1</sup>Archivio Storico Greco, Monte Olimpo<br/>
            <sup>2</sup>Dipartimento di Traduzione Classica
          </div>
        </div>

        {/* TWO COLUMN LAYOUT - Reduced gap */}
        <div className="grid grid-cols-2 gap-8 text-justify">
            
            {/* LEFT COL - Reduced vertical gaps */}
            <div className="flex flex-col gap-4">
                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">Proemio</strong>
                    <p className="indent-4">
                        Cantami, o Diva, del Pelìde Achille l'ira funesta che infiniti addusse lutti agli Achei, molte anzi tempo all'Orco generose travolse 
                        <span className="inline-block align-baseline mx-1 opacity-80">
                             {/* Increased height to 16 to fill line */}
                             <StripCode text="ALME_D_EROI_TRAVOLSE_ALL_ORCO_GENEROSE" height={16} showLabels={false} verticalGap={0} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                        </span>
                        alme d'eroi, e di cani e d'augelli orrido pasto lor salme abbandonò (così di Giove l'alto consiglio s'adempìa), da quando primamente disgiunse aspra contesa.
                    </p>
                </div>

                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">1. Il Re de' Prodi</strong>
                    <p className="indent-4 mb-1">
                        Il re de' prodi Atride e il divo Achille. E qual de' numi inimicolli? Il figlio di Latona e di Giove. Irato al Re, destò nel campo un 
                        <span className="inline-block align-baseline mx-1 opacity-80">
                             <StripCode text="MORBO_ORRENDO_LA_GENTE_PERIA" height={16} showLabels={false} verticalGap={0} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                        </span>
                        morbo orrendo, e la gente perìa: colpa d'Atride che fece al sacerdote Crise onta.
                    </p>
                    <p className="indent-4">
                        Costui venuto agli annosi vascelli achei, per riscattar la figlia, infinite seco portava ricchezze.
                    </p>
                </div>

                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">2. Analisi del Riscatto</strong>
                    <p className="indent-4 mb-1">
                        E in man le bende dell'arco lungi-saettante Apollo, avvolte allo scettro d'oro, e tutti i Greci pregava, e in prima i due d'Atreo figliuoli, ordinatori di genti:
                    </p>
                    {/* Reduced vertical margin for figure */}
                    <div className="my-2 border-t border-b border-black py-2">
                        <figure className="text-center">
                            <div className="grayscale">
                                <StripCode text="ATRIDAE_ET_ALII_BENE_OCREATI_ACHIVI_VOBIS_QUIDEM_DII_CONCEDANT" height={32} showLabels={false} revealTextOnHover={true} detailedTooltip={false} />
                            </div>
                            <figcaption className="text-[8pt] mt-1 font-sans italic text-neutral-600">
                                Fig 1. Scansione metrica dell'esametro dattilico.
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>

            {/* RIGHT COL */}
            <div className="flex flex-col gap-4">
                 <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">3. La Preghiera</strong>
                    <p className="indent-4 mb-1">
                        "Atridi, e voi tutti, o coturnati Achei, a voi concedano i Numi, che l'olimpiche case hanno in abitazione, di distruggere la città di Priamo, e 
                        <span className="inline-block align-baseline mx-1">
                            {/* Increased height to 16 to fill line */}
                            <StripCode text="FELICEMENTE_IN_PATRIA_FARE_RITORNO_MA_LA_CARI_FIGLIA" height={16} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                        </span>
                        felicemente in patria far ritorno; ma la cara figlia a me sciogliete, e ricevete questi doni, venerando il figlio di Giove, il lungi-saettante Apollo."
                    </p>
                    <p className="indent-4">
                         Allora tutti gli altri Achei con grida acclamaron che onorato fosse il sacerdote, e i ricchi doni accettati.
                    </p>
                </div>

                <div>
                    <strong className="block text-[9pt] font-bold border-b border-black mb-1 uppercase">4. Il Rifiuto</strong>
                    <p className="indent-4">
                        Ma ciò non piacque in cor ad Agamennone figlio d'Atreo, che anzi superbo il cacciò, minacciando e ingiuriando: "Vecchio, ch'io più non ti colga, o che or t'indugi presso le concave navi, o che poscia ci torni; che 
                        <span className="inline-block align-baseline mx-1">
                            <StripCode text="NULLA_T_GIOVEREBBE_LO_SCETTRO_E_LE_BENDE_DEL_DIO_NON_LA_SCIOGLIERO_IO" height={16} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                        </span>
                        nulla ti gioverebbe lo scettro e le bende del Dio. Non la scioglierò io; prima la coglierà vecchiaia nella nostra magione in Argo, lungi dalla patria, mentre la tela tesse."
                    </p>
                </div>

                 <div className="flex-1"></div>

                 {/* REFERENCES - Compacted */}
                 <div className="mt-4 pt-2 border-t-2 border-black">
                    <strong className="block text-[9pt] font-bold mb-1 uppercase">Riferimenti Bibliografici</strong>
                    <ul className="text-[8pt] space-y-2">
                        <li className="flex gap-2">
                            <span className="font-bold">[1]</span>
                            <div className="flex flex-col w-full">
                                <span>Apollo, A. <i>"Frecce, Pestilenze e Dati."</i> Olimpo Journal, Vol 1.</span>
                                <div className="mt-1 opacity-80 grayscale">
                                    <StripCode text="REF_APOLLO_ARCO_ARGENTEO_LUNGI_SAETTANTE" height={12} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold">[2]</span>
                            <div className="flex flex-col w-full">
                                <span>Calcante, T. <i>"Profezie Digitali e Interpretazione degli Uccelli."</i></span>
                                <div className="mt-1 opacity-80 grayscale">
                                    <StripCode text="REF_CALCANTE_PROFETA_DEGLI_ACHEI_V9_PROTOCOL" height={12} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold">[3]</span>
                            <div className="flex flex-col w-full">
                                <span>Achille, P. <i>"Ira: Una Prospettiva Algoritmica."</i> Myrmidon Press.</span>
                                <div className="mt-1 opacity-80 grayscale">
                                    <StripCode text="REF_PELIDE_ACHILLE_IRA_FUNESTA_INFINITI_LUTTI" height={12} showLabels={false} revealTextOnHover={true} detailedTooltip={false} disableReflow={true} />
                                </div>
                            </div>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>

        {/* FOOTER - Moved up */}
        <div className="mt-6 text-center text-[8pt] border-t border-black pt-2">
            Estratto dal Libro I dell'Iliade. Traduzione di Vincenzo Monti (1810). V9 Encoding Standard.
        </div>
    </div>
  );
};