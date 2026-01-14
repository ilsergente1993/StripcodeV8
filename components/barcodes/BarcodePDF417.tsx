import React from 'react';

export const BarcodePDF417: React.FC<{ text: string }> = ({ text }) => {
    // PDF417 Structure:
    // Rows = based on data length.
    // Columns = Start + Left Row Indicator + Data (Fixed 3 for visual) + Right Row Indicator + Stop
    
    // Ensure we have enough rows to represent the data visually, 
    // but PDF417 is variable. We'll simulate 3 data columns.
    const dataCols = 3; 
    const calculatedRows = Math.ceil(text.length / dataCols);
    // Clamp rows for visual sanity in the UI (PDF417 can be 3 to 90 rows)
    const rowCount = Math.max(6, Math.min(30, calculatedRows));
    
    const scale = 1.5; // Pixel scale
    const rowHeight = 4; // Row height in pixels (stacked tight)

    const renderCodeword = (seed: number, isStartOrStop: boolean = false) => {
        if (isStartOrStop) {
             // Simplified Start/Stop pattern (High density black/white bars)
             return (
                <div className="flex h-full">
                    <div className="bg-black" style={{ width: 4 * scale }}></div>
                    <div className="bg-white" style={{ width: 1 * scale }}></div>
                    <div className="bg-black" style={{ width: 1 * scale }}></div>
                    <div className="bg-white" style={{ width: 1 * scale }}></div>
                </div>
             )
        }

        // Generate pseudo-random bars based on seed to simulate specific codewords
        // PDF417 codeword: 17 modules, 4 bars, 4 spaces.
        const bars = [];
        let r = seed;
        for(let i=0; i<4; i++) {
             // Simple LCG for deterministic pseudo-randomness
             r = (r * 9301 + 49297) % 233280;
             const wBar = (r % 3) + 1;
             const wSpace = ((r >> 2) % 3) + 1;
             bars.push({ b: wBar, s: wSpace });
        }

        return (
            <div className="flex h-full border-r border-white/0">
                {bars.map((b, i) => (
                    <React.Fragment key={i}>
                        <div className="bg-black" style={{ width: b.b * scale }}></div>
                        <div className="bg-white" style={{ width: b.s * scale }}></div>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="inline-flex flex-col bg-white p-2 border border-neutral-200 shadow-sm">
            {Array.from({ length: rowCount }).map((_, r) => (
                <div key={r} className="flex" style={{ height: rowHeight }}>
                    
                    {/* Start Pattern */}
                    {renderCodeword(0, true)}

                    {/* Left Row Indicator (Function of Row ID) */}
                    {renderCodeword(r * 47 + rowCount)}

                    {/* Data Columns */}
                    {Array.from({ length: dataCols }).map((_, c) => {
                        // Correctly map grid position to text index
                        // We loop through the text across the grid
                        const charIndex = (r * dataCols + c) % (text.length || 1);
                        const charCode = text.charCodeAt(charIndex) || 0;
                        
                        // Seed combines position and value to ensure unique visuals for different chars
                        // and different positions of the same char
                        const seed = (r * dataCols + c + 1) * (charCode + 1);
                        
                        return (
                            <div key={c}>
                                {renderCodeword(seed)}
                            </div>
                        );
                    })}

                    {/* Right Row Indicator (Function of Row ID) */}
                    {renderCodeword(r * 97 + rowCount)}

                    {/* Stop Pattern */}
                    {renderCodeword(0, true)}
                </div>
            ))}
        </div>
    );
}