import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store';
import { BallIcon } from './BallIcon';
import { BALL_CONFIGS } from '../constants';

export const TitleScreen: React.FC = () => {
    const setGameStarted = useGameStore((state) => state.setGameStarted);
    const resetGame = useGameStore((state) => state.resetGame);
    const score = useGameStore((state) => state.points);
    const lastDroppedBall = useGameStore((state) => state.lastDroppedBall);
    const gameOver = useGameStore((state) => state.gameOver);
    const [currentBallSize, setCurrentBallSize] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBallSize((prev) => prev == 9 ? 3 : (prev + 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    let showSize = gameOver ? BALL_CONFIGS.findIndex(v => v.name == lastDroppedBall) : currentBallSize;

    const handlePlay = () => {
        resetGame();
        setGameStarted(true);
    };

    const currentConfig = BALL_CONFIGS[showSize] || BALL_CONFIGS[3];

    return (
        <div className="title-screen">
            <div className="title-content">
                <h1 style={{ display: "flex", alignItems: "center" }}>
                    <BallIcon color={currentConfig.color} name={currentConfig.name} size={100} />
                    {gameOver && lastDroppedBall ? (lastDroppedBall + " Ball") : "Ball Blitz"}
                </h1>
                <p>Score: {score}</p>
                {gameOver && <p className="drop-message">you dropped the ball.</p>}
                <button className="play-button" onClick={handlePlay}>
                    {gameOver ? "TRY AGAIN" : "PLAY"}
                </button>
            </div>
        </div>
    );
};
