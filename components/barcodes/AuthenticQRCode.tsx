import React from 'react';

export const AuthenticQRCode: React.FC<{ matrix: boolean[][], size: number, moduleSize?: number, error?: boolean }> = ({ matrix, size, moduleSize = 4, error }) => {
    if (error) {
        return (
            <div className="bg-red-50 p-6 border border-red-200 rounded text-center">
                <span className="text-xs font-bold text-red-500 block">CAPACITY EXCEEDED</span>
                <span className="text-[10px] text-red-400">Text too long for QR standard</span>
            </div>
        );
    }
    if (size === 0) return null;
    return (
        <div className="bg-white p-2 inline-block shadow-sm">
            <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${size}, ${moduleSize}px)` 
                }}
            >
                {matrix.map((row, y) => (
                    row.map((filled, x) => (
                        <div 
                            key={`${x}-${y}`} 
                            style={{ 
                                width: moduleSize, 
                                height: moduleSize, 
                                backgroundColor: filled ? 'black' : 'white' 
                            }} 
                        />
                    ))
                ))}
            </div>
        </div>
    );
};