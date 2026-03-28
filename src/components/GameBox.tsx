import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store';

export const GameBox: React.FC = () => {
    const boxSize = useGameStore((state) => state.boxSize);
    const { x, y, z } = boxSize;

    const wallMaterial = (
        <meshStandardMaterial
            color="#4d4d4d"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
        />
    );

    const baseMaterial = (
        <meshStandardMaterial
            color="#1a6633"
            side={THREE.DoubleSide}
            metalness={0.1}
            roughness={0.8}
        />
    );

    // Points for the outline lines
    const linePoints: [number, number, number][] = [
        // 4 vertical lines
        // Top square
        [x, y, z],
        [x, y, -z],
        [-x, y, -z],
        [-x, y, z],
        [x, y, z],
        [-x, y, z],
        [-x, y, -z],
        [-x, -y, -z],
        [-x, -y, z],
        [-x, y, z],
        [-x, -y, z],
        [x, -y, z],
        [x, y, z],
        [x, -y, z],
        [x, -y, -z],
        [x, y, -z],
        [x, -y, -z],
        [-x, -y, -z],
    ];

    return (
        <group>
            {/* Walls */}
            {/* Left */}
            <RigidBody type="fixed">
                <mesh position={[-x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[z * 2, y * 2]} />
                    {wallMaterial}
                </mesh>
                <CuboidCollider args={[0.05, y, z]} position={[-x - 0.05, 0, 0]} />
            </RigidBody>

            {/* Right */}
            <RigidBody type="fixed">
                <mesh position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[z * 2, y * 2]} />
                    {wallMaterial}
                </mesh>
                <CuboidCollider args={[0.05, y, z]} position={[x + 0.05, 0, 0]} />
            </RigidBody>

            {/* Back */}
            <RigidBody type="fixed">
                <mesh position={[0, 0, -z]}>
                    <planeGeometry args={[x * 2, y * 2]} />
                    {wallMaterial}
                </mesh>
                <CuboidCollider args={[x, y, 0.05]} position={[0, 0, -z - 0.05]} />
            </RigidBody>

            {/* Front */}
            <RigidBody type="fixed">
                <mesh position={[0, 0, z]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[x * 2, y * 2]} />
                    {wallMaterial}
                </mesh>
                <CuboidCollider args={[x, y, 0.05]} position={[0, 0, z + 0.05]} />
            </RigidBody>

            {/* Base */}
            <RigidBody type="fixed">
                <mesh position={[0, -y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[x * 2, z * 2]} />
                    {baseMaterial}
                </mesh>
                <CuboidCollider args={[x, 0.05, z]} position={[0, -y - 0.05, 0]} />
            </RigidBody>

            {/* Outline */}
            {/* R3F Line component for the edges */}
            <Line
                points={linePoints}
                color="black"
                lineWidth={1}
            />
        </group>
    );
};
