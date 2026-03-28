import React, { useState, useCallback, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { Ball } from './Ball';
import { useGameStore } from '../store';
import { getBallRadius } from '../constants';

interface BallSpawnerProps {
    onSpawn: (size: number, position: THREE.Vector3) => void;
}

export const BallSpawner: React.FC<BallSpawnerProps> = ({ onSpawn }) => {
    const [nextSize, setNextSize] = useState(() => Math.floor(Math.random() * 4) + 1);
    const [previewPos, setPreviewPos] = useState<THREE.Vector3 | null>(null);
    const boxSize = useGameStore((state) => state.boxSize);
    const { raycaster, mouse, camera } = useThree();

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -boxSize.y);
    const point = new THREE.Vector3();

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera);
        if (raycaster.ray.intersectPlane(plane, point)) {
            const radius = getBallRadius(nextSize);
            // Check if the intersection point is within the box boundaries
            const isWithinX = point.x >= -boxSize.x && point.x <= boxSize.x;
            const isWithinZ = point.z >= -boxSize.z && point.z <= boxSize.z;

            if (isWithinX && isWithinZ) {
                const clampedX = Math.max(-boxSize.x + radius, Math.min(boxSize.x - radius, point.x));
                const clampedZ = Math.max(-boxSize.z + radius, Math.min(boxSize.z - radius, point.z));
                setPreviewPos(new THREE.Vector3(clampedX, boxSize.y, clampedZ));
            } else {
                setPreviewPos(null);
            }
        } else {
            setPreviewPos(null);
        }
    });

    const handleClick = useCallback(() => {
        if (previewPos) {
            onSpawn(nextSize, previewPos.clone());
            setNextSize(Math.floor(Math.random() * 4) + 1);
        }
    }, [previewPos, nextSize, onSpawn]);

    // Attach click listener to window or a transparent overlay
    useEffect(() => {
        const handleWindowClick = () => handleClick();
        window.addEventListener('mousedown', handleWindowClick);
        return () => window.removeEventListener('mousedown', handleWindowClick);
    }, [handleClick]);

    return (
        <group>
            {previewPos && (
                <>
                    <Ball
                        id="preview"
                        size={nextSize}
                        position={[previewPos.x, previewPos.y, previewPos.z]}
                        isExample
                    />
                    <Line
                        points={[
                            [previewPos.x, previewPos.y, previewPos.z],
                            [previewPos.x, -boxSize.y, previewPos.z],
                        ]}
                        color="green"
                        lineWidth={1}
                    />
                </>
            )}
        </group>
    );
};
