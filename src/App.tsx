import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import { GameBox } from './components/GameBox';
import { BallSpawner } from './components/BallSpawner';
import { Ball } from './components/Ball';
import { useGameStore } from './store';
import './App.css';

interface BallInstance {
  id: string;
  size: number;
  position: THREE.Vector3;
  isNew?: boolean;
}

const App: React.FC = () => {
  const [balls, setBalls] = useState<BallInstance[]>([]);
  const points = useGameStore((state) => state.points);
  const addPoints = useGameStore((state) => state.addPoints);
  const setBoxSize = useGameStore((state) => state.setBoxSize);
  const boxSize = useGameStore((state) => state.boxSize);

  const handleSpawn = useCallback((size: number, position: THREE.Vector3) => {
    const id = Math.random().toString(36).substr(2, 9);
    setBalls((prev) => [...prev, { id, size, position, isNew: false }]);
    addPoints(size);
  }, [addPoints]);

  const handleMerge = useCallback((id1: string, id2: string, newSize: number, position: THREE.Vector3) => {
    setBalls((prev) => {
      // Check if both still exist (to avoid double-merging)
      if (!prev.find(b => b.id === id1) || !prev.find(b => b.id === id2)) {
        return prev;
      }

      const filtered = prev.filter(b => b.id !== id1 && b.id !== id2);
      const newId = Math.random().toString(36).substr(2, 9);

      // Scaling logic from Rust: if we hit size 9, grow the box
      if (newSize === 9) {
        setBoxSize(4, 7, 6);
      }

      addPoints(newSize * newSize);
      return [...filtered, { id: newId, size: newSize, position, isNew: true }];
    });
  }, [addPoints, setBoxSize]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#666' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontSize: 24, zIndex: 1, pointerEvents: 'none' }}>
        Points: {points}
      </div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[30, 0, 0]} />
        <OrbitControls makeDefault />

        <ambientLight intensity={0.8} />
        <spotLight
          position={[30, 20, 5]}
          angle={Math.PI / 10}
          penumbra={0.1}
          intensity={3000}
          castShadow
          shadow-mapSize={[4096, 4096]}
        />
        <spotLight
          position={[-10, 4, 30]}
          angle={Math.PI / 10}
          penumbra={0.1}
          intensity={5000}
          castShadow
        />

        <Physics gravity={[0, -45, 0]}>
          <GameBox />
          <BallSpawner onSpawn={handleSpawn} />
          {balls.map((ball) => (
            <Ball
              key={ball.id}
              id={ball.id}
              size={ball.size}
              position={[ball.position.x, ball.position.y, ball.position.z]}
              onMerge={handleMerge}
              animate={ball.isNew}
            />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;
