import React, { useMemo } from 'react';

export const Barcode128: React.FC<{ text: string, scale?: number }> = ({ text, scale = 2 }) => {
    const generatePattern = (str: string) => {
        const patterns: number[] = [];
        patterns.push(2,1,1,2,1,4); // Start B
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            const w1 = (code % 3) + 1;
            const w2 = ((code >> 2) % 3) + 1;
            const w3 = ((code >> 4) % 2) + 1;
            const w4 = 1;
            const w5 = 11 - (w1+w2+w3+w4+2); 
            patterns.push(w1, 1, w2, 1, w3, Math.max(1, w5));
        }
        patterns.push(3,1,1,1,2,3); // Check
        patterns.push(2,3,3,1,1,1,2); // Stop
        return patterns;
    };

    const widths = useMemo(() => generatePattern(text), [text]);
    const totalUnits = widths.reduce((a, b) => a + b, 0);

    return (
        <div className="flex flex-col items-center">
            <div 
                className="flex items-stretch bg-white px-2 overflow-hidden" 
                style={{ height: '64px', minWidth: `${totalUnits * scale}px` }}
            >
                {widths.map((w, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            width: `${w * scale}px`, 
                            backgroundColor: i % 2 === 0 ? 'black' : 'white' 
                        }} 
                    />
                ))}
            </div>
            <div className="font-mono text-xs mt-1 tracking-[0.3em]">{text}</div>
        </div>
    );
};