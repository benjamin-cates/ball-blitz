import { create } from 'zustand';

interface GameState {
    points: number;
    debugMode: boolean;
    boxSize: { x: number; y: number; z: number };
    isShaking: boolean;
    addPoints: (points: number) => void;
    toggleDebugMode: () => void;
    setShaking: (isShaking: boolean) => void;
    ballCounts: Record<number, number>;
    setBoxSize: (x: number, y: number, z: number) => void;
    setBallCounts: (counts: Record<number, number>) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    ballCounts: {},
    points: 0,
    debugMode: false,
    boxSize: { x: 4, y: 6, z: 4 },
    isShaking: false,
    addPoints: (p) => set((state) => ({ points: state.points + p })),
    toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
    setShaking: (isShaking) => set({ isShaking }),
    setBoxSize: (x, y, z) => set({ boxSize: { x, y, z } }),
    setBallCounts: (ballCounts) => set({ ballCounts }),
    resetGame: () => set({ points: 0, boxSize: { x: 4, y: 6, z: 4 }, debugMode: false, isShaking: false, ballCounts: {} }),
}));
