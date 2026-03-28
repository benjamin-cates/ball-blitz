import React from 'react';
import { useGameStore } from '../store';
import { BALL_CONFIGS } from '../constants';
import { BallIcon } from './BallIcon';

export const BallCounter: React.FC = () => {
    const ballCounts = useGameStore((state) => state.ballCounts);
    const points = useGameStore((state) => state.points);

    // Filter out sizes with 0 count and sort by size
    const activeBalls = Object.entries(ballCounts)
        .map(([size, count]) => ({
            size: parseInt(size),
            count,
            config: BALL_CONFIGS[parseInt(size)] || BALL_CONFIGS[0]
        }))
        .sort((a, b) => b.size - a.size);

    while (activeBalls.length > 1 && activeBalls[0].count == 0) activeBalls.shift();

    if (activeBalls.length === 0) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'sans-serif',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        }}>
            Points: {points}
            {activeBalls.map(({ size, count, config }) => (
                <div key={size} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                    <BallIcon color={config.color} name={config.name} />
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{config.name}:</span>
                    <span>{count}</span>
                </div>
            ))}
        </div>
    );
};
