import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store';
import { BallIcon } from './BallIcon';
import { BALL_CONFIGS } from '../constants';

export const TitleScreen: React.FC = () => {
    const setGameStarted = useGameStore((state) => state.setGameStarted);
    const resetGame = useGameStore((state) => state.resetGame);
    const score = useGameStore((state) => state.points);
    const [currentBallSize, setCurrentBallSize] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBallSize((prev) => 3);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handlePlay = () => {
        resetGame();
        setGameStarted(true);
    };

    const currentConfig = BALL_CONFIGS[currentBallSize] || BALL_CONFIGS[3];

    return (
        <div className="title-screen">
            <div className="title-content">
                <h1 style={{ display: "flex", alignItems: "center" }}>
                    <BallIcon color={currentConfig.color} name={currentConfig.name} size={100} />
                    Ball Blitz
                </h1>
                <p>Score: {score}</p>
                <button className="play-button" onClick={handlePlay}>
                    PLAY
                </button>
            </div>
        </div>
    );
};
