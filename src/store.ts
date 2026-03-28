import { create } from 'zustand';

interface GameState {
    points: number;
    boxSize: { x: number; y: number; z: number };
    addPoints: (points: number) => void;
    setBoxSize: (x: number, y: number, z: number) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    points: 0,
    boxSize: { x: 4, y: 6, z: 4 },
    addPoints: (p) => set((state) => ({ points: state.points + p })),
    setBoxSize: (x, y, z) => set({ boxSize: { x, y, z } }),
    resetGame: () => set({ points: 0, boxSize: { x: 4, y: 6, z: 4 } }),
}));
