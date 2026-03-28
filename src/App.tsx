import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import { GameBox } from './components/GameBox';
import { BallSpawner } from './components/BallSpawner';
import { Ball } from './components/Ball';
import { BallCounter } from './components/BallCounter';
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
  const isShaking = useGameStore((state) => state.isShaking);
  const setShaking = useGameStore((state) => state.setShaking);
  const debugMode = useGameStore((state) => state.debugMode);
  const addPoints = useGameStore((state) => state.addPoints);
  const setBoxSize = useGameStore((state) => state.setBoxSize);
  const setBallCounts = useGameStore((state) => state.setBallCounts);

  const updateBallCounts = useCallback((currentBalls: BallInstance[]) => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 };
    currentBalls.forEach(ball => {
      counts[ball.size] = (counts[ball.size] || 0) + 1;
    });
    setBallCounts(counts);
  }, [setBallCounts]);

  const handleSpawn = useCallback((size: number, position: THREE.Vector3) => {
    const id = Math.random().toString(36).substr(2, 9);
    setBalls((prev) => {
      const next = [...prev, { id, size, position, isNew: false }];
      updateBallCounts(next);
      return next;
    });
    addPoints(size);
  }, [addPoints, updateBallCounts]);

  const handleMerge = useCallback((id1: string, id2: string, newSize: number, position: THREE.Vector3) => {
    setBalls((prev) => {
      // Check if both still exist (to avoid double-merging)
      if (!prev.find(b => b.id === id1) || !prev.find(b => b.id === id2)) {
        return prev;
      }

      const filtered = prev.filter(b => b.id !== id1 && b.id !== id2);
      const newId = Math.random().toString(36).substr(2, 9);
      const nextBalls = [...filtered, { id: newId, size: newSize, position, isNew: true }];
      updateBallCounts(nextBalls);

      // Scaling logic: if any ball is size 9 (Beach Ball) or higher, grow the box
      const hasLargeBall = nextBalls.some(b => b.size >= 9);
      if (hasLargeBall) {
        setBoxSize(4, 7, 6);
      } else {
        setBoxSize(4, 6, 5);
      }

      addPoints(newSize * newSize);
      return nextBalls;
    });
  }, [addPoints, setBoxSize]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#666' }}>
      <BallCounter />
      <button
        onClick={() => {
          setShaking(true);
          setTimeout(() => setShaking(false), 500);
        }}
        disabled={isShaking}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1,
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: isShaking ? '#999' : '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isShaking ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          transition: 'transform 0.1s'
        }}
        onMouseDown={(e) => { if (!isShaking) e.currentTarget.style.transform = 'scale(0.95)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {isShaking ? 'SHAKING...' : 'SHAKE'}
      </button>
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

        <Physics gravity={[0, -45, 0]} debug={debugMode}>
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
    </div >
  );
};

export default App;
