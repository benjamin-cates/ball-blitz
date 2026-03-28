import React, { useRef, useState, useEffect } from 'react';
import { RigidBody, type RigidBodyProps, type CollisionPayload, vec3, BallCollider } from '@react-three/rapier';
import { Gltf } from '@react-three/drei';
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
    const config = BALL_CONFIGS[Math.min(size, 9)] || BALL_CONFIGS[0];
    const rbRef = useRef<any>(null);
    const meshRef = useRef<THREE.Group>(null);
    const [scale, setScale] = useState(1);
    const addPoints = useGameStore((state) => state.addPoints);

    const radius = getBallRadius(size);
    const startRadius = getBallStartRadius(size);
    const targetScale = radius / startRadius;

    // Initial growth animation
    useEffect(() => {
        if (isExample || !animate) {
            setScale(targetScale);
        } else {
            setScale(0.1);
            const startTime = Date.now();
            const duration = 500;
            const animateFn = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                setScale(0.1 + (targetScale - 0.1) * progress);
                if (progress < 1) requestAnimationFrame(animateFn);
            };
            animateFn();
        }
    }, [size, isExample, targetScale, animate]);

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
            restitution={0}
            friction={0.8}
            {...props}
        >
            {id == "preview" ? <></> : <BallCollider args={[radius]} />}
            <group ref={meshRef} scale={scale}>
                {config.modelUrl ? (
                    <Gltf castShadow src={config.modelUrl} scale={config.scale} />
                ) : (
                    <mesh castShadow>
                        <sphereGeometry args={[startRadius, 32, 32]} />
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
