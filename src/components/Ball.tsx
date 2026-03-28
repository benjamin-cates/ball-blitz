import React, { useRef, useState, useEffect } from 'react';
import { RigidBody, type RigidBodyProps, type CollisionPayload, vec3, BallCollider } from '@react-three/rapier';
import { Gltf } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BALL_CONFIGS, getBallRadius, getBallStartRadius } from '../constants';
import { useGameStore } from '../store';

interface BallProps extends RigidBodyProps {
    id: string;
    size: number;
    onMerge?: (id1: string, id2: string, newSize: number, position: THREE.Vector3) => void;
    isExample?: boolean;
    animate?: boolean;
}

export const Ball: React.FC<BallProps> = ({ id, size, onMerge, isExample, animate, ...props }) => {
    const config = BALL_CONFIGS[Math.min(size, BALL_CONFIGS.length - 1)] || BALL_CONFIGS[0];
    const rbRef = useRef<any>(null);
    const meshRef = useRef<THREE.Group>(null);
    const startRadius = getBallStartRadius(size);
    const radius = getBallRadius(size);
    const [currentRadius, setCurrentRadius] = useState(radius);
    const setGameOver = useGameStore((state) => state.setGameOver);
    const setLastDroppedBall = useGameStore((state) => state.setLastDroppedBall);
    const gameOver = useGameStore((state) => state.gameOver);

    useFrame(() => {
        if (isExample || gameOver || !rbRef.current) return;

        const pos = rbRef.current.translation();
        if (pos.y < -10) {
            setLastDroppedBall(config.name);
            setGameOver(true);
        }
    });

    // Initial growth animation
    useEffect(() => {
        if (isExample || !animate) {
            setCurrentRadius(radius);
        } else {
            setCurrentRadius(startRadius);
            const startTime = Date.now();
            const duration = 500;
            const animateFn = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                setCurrentRadius(startRadius + (radius - startRadius) * progress);
                if (progress < 1) requestAnimationFrame(animateFn);
            };
            animateFn();
        }
    }, [size, isExample, animate, radius, startRadius]);

    const handleCollision = (payload: CollisionPayload) => {
        if (isExample || !onMerge) return;

        // Check if we hit another ball
        const other = payload.other.rigidBodyObject;
        if (other && (other as any).userData?.type === 'ball') {
            const otherSize = (other as any).userData?.size;
            const otherId = (other as any).userData?.id;
            if (otherSize === size && id < otherId) { // Basic lock to prevent double merge
                const myPos = vec3(rbRef.current.translation());
                onMerge(id, otherId, size + 1, myPos);
            }
        }
    };

    return (
        <RigidBody
            ref={rbRef}
            colliders={false}
            onCollisionEnter={handleCollision}
            userData={{ type: 'ball', size, id }}
            type={isExample ? 'kinematicPosition' : 'dynamic'}
            {...props}
        >
            {id == "preview" ? <></> : <BallCollider friction={0.3} restitution={0.2} args={[currentRadius]} />}
            <group ref={meshRef} scale={1}>
                {config.modelUrl ? (
                    <Gltf castShadow src={config.modelUrl} scale={config.scale * currentRadius / startRadius} />
                ) : (
                    <mesh castShadow>
                        <sphereGeometry args={[currentRadius, 32, 32]} />
                        <meshStandardMaterial
                            color={config.color}
                            roughness={0.67}
                            metalness={0.2}
                        />
                    </mesh>
                )}
            </group>
        </RigidBody>
    );
};
