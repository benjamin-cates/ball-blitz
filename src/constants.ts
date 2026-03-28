import golfModel from './assets/Golf_compressed.glb';
import poolModel from './assets/Pool.glb';
import tennisModel from './assets/Tennis.glb';
import baseballModel from './assets/Baseball_compressed.glb';
import bowlingModel from './assets/Bowling_compressed.glb';
import soccerModel from './assets/Soccer.glb';
import basketballModel from './assets/Basketball_compressed.glb';
import beachBallModel from './assets/Beach_ball.glb';
import { useGLTF } from '@react-three/drei';

export interface BallConfig {
    name: string;
    radius: number;
    startRadius: number;
    scale: number;
    color: string;
    modelUrl?: string;
    points: number;
}

// Preload all models
[
    golfModel,
    poolModel,
    tennisModel,
    baseballModel,
    bowlingModel,
    soccerModel,
    basketballModel,
    beachBallModel
].forEach(url => {
    if (url) useGLTF.preload(url);
});

export const BALL_CONFIGS: BallConfig[] = [
    {
        name: "Placeholder", // Index 0
        radius: 0.4,
        startRadius: 0.1,
        scale: 4.0,
        color: "#ff80ff",
        points: 0,
    },
    {
        name: "Ping Pong", // Index 1
        radius: 0.7,
        startRadius: 0.4,
        scale: 0.7 / 0.4,
        color: "#ff734d",
        points: 1,
    },
    {
        name: "Golf", // Index 2
        radius: 1.0,
        startRadius: 0.7,
        scale: 0.31, // Ported from Rust scale
        color: "#e6e6e6",
        modelUrl: golfModel,
        points: 2,
    },
    {
        name: "Pool", // Index 3
        radius: 1.3,
        startRadius: 1.0,
        scale: 0.95,
        color: "#1b1bb1",
        modelUrl: poolModel,
        points: 3,
    },
    {
        name: "Tennis", // Index 4
        radius: 1.6,
        startRadius: 1.3,
        scale: 1.06,
        color: "#5ebf00",
        modelUrl: tennisModel,
        points: 4,
    },
    {
        name: "Baseball", // Index 5
        radius: 1.9,
        startRadius: 1.6,
        scale: 1.5,
        color: "#ffffff",
        modelUrl: baseballModel,
        points: 5,
    },
    {
        name: "Bowling", // Index 6
        radius: 2.2,
        startRadius: 1.9,
        scale: 6.85,
        color: "#cccccc",
        modelUrl: bowlingModel,
        points: 6,
    },
    {
        name: "Soccer", // Index 7
        radius: 2.5,
        startRadius: 2.2,
        scale: 2.16,
        color: "#cccccc",
        modelUrl: soccerModel,
        points: 7,
    },
    {
        name: "Basketball", // Index 8
        radius: 2.8,
        startRadius: 2.5,
        scale: 4.7,
        color: "#b44f20",
        modelUrl: basketballModel,
        points: 8,
    },
    {
        name: "Beach Ball", // Index 9
        radius: 3.1,
        startRadius: 2.8,
        scale: 2.65,
        color: "#ffffff",
        modelUrl: beachBallModel,
        points: 9,
    },
    {
        name: "Beach Ball 2",
        radius: 3.8,
        startRadius: 3.1,
        scale: 2.65 * 3.8 / 3.1,
        color: "#ffffff",
        modelUrl: beachBallModel,
        points: 20,
    },
    {
        name: "Beach Ball 3",
        radius: 4.8,
        startRadius: 3.8,
        scale: 2.65 * 4.8 / 3.1,
        color: "#ffffff",
        modelUrl: beachBallModel,
        points: 50,
    }
];

export const getBallRadius = (size: number) => {
    return size * 0.3 + 0.4;
};

export const getBallStartRadius = (size: number) => {
    return (size * 0.3 - 0.3 + 0.4) * 0.95;
};
