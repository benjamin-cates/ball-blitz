import React, { useRef, useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../store';

export const GameBox: React.FC = () => {
    const targetBoxSize = useGameStore((state) => state.boxSize);
    const isShaking = useGameStore((state) => state.isShaking);
    // Use a key to force re-render when the target size changes if needed, 
    // but here we'll use it to ensure the RigidBody and colliders are fresh if they don't update correctly.
    // However, the user specifically asked to force a rerender.
    const rigidBodyKey = useMemo(() => `${targetBoxSize.x}-${targetBoxSize.y}-${targetBoxSize.z}`, [targetBoxSize]);

    const currentBoxSize = useRef(new THREE.Vector3(targetBoxSize.x, targetBoxSize.y, targetBoxSize.z));

    // Refs for meshes and colliders to update them manually during animation
    const leftWallRef = useRef<THREE.Mesh>(null);
    const rightWallRef = useRef<THREE.Mesh>(null);
    const backWallRef = useRef<THREE.Mesh>(null);
    const frontWallRef = useRef<THREE.Mesh>(null);
    const baseRef = useRef<THREE.Mesh>(null);
    const outlineRef = useRef<any>(null);

    const leftColliderRef = useRef<any>(null);
    const rightColliderRef = useRef<any>(null);
    const backColliderRef = useRef<any>(null);
    const frontColliderRef = useRef<any>(null);
    const baseColliderRef = useRef<any>(null);

    const groupRef = useRef<THREE.Group>(null);
    const shakeOffset = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        const lerpSpeed = 5.0; // Increased speed for better feel
        currentBoxSize.current.x = THREE.MathUtils.lerp(currentBoxSize.current.x, targetBoxSize.x, delta * lerpSpeed);
        currentBoxSize.current.y = THREE.MathUtils.lerp(currentBoxSize.current.y, targetBoxSize.y, delta * lerpSpeed);
        currentBoxSize.current.z = THREE.MathUtils.lerp(currentBoxSize.current.z, targetBoxSize.z, delta * lerpSpeed);

        const { x, y, z } = currentBoxSize.current;

        // Handle Shaking
        if (isShaking) {
            const time = state.clock.getElapsedTime() * 30;
            shakeOffset.current.set(
                Math.sin(time) * 0.2,
                Math.cos(time * 0.9) * 0.2,
                Math.sin(time * 1.1) * 0.2
            );
        } else {
            shakeOffset.current.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        }

        if (groupRef.current) {
            groupRef.current.position.copy(shakeOffset.current);
        }

        // Update meshes
        if (leftWallRef.current) {
            leftWallRef.current.position.set(-x, 0, 0);
            leftWallRef.current.scale.set(z * 2, y * 2, 1);
        }
        if (rightWallRef.current) {
            rightWallRef.current.position.set(x, 0, 0);
            rightWallRef.current.scale.set(z * 2, y * 2, 1);
        }
        if (backWallRef.current) {
            backWallRef.current.position.set(0, 0, -z);
            backWallRef.current.scale.set(x * 2, y * 2, 1);
        }
        if (frontWallRef.current) {
            frontWallRef.current.position.set(0, 0, z);
            frontWallRef.current.scale.set(x * 2, y * 2, 1);
        }
        if (baseRef.current) {
            baseRef.current.position.set(0, -y, 0);
            baseRef.current.scale.set(x * 2, z * 2, 1);
        }

        // Update colliders
        if (leftColliderRef.current) {
            leftColliderRef.current.setTranslation({ x: -x - 0.05 + shakeOffset.current.x, y: shakeOffset.current.y, z: shakeOffset.current.z });
            leftColliderRef.current.setHalfExtents({ x: 0.05, y, z });
        }
        if (rightColliderRef.current) {
            rightColliderRef.current.setTranslation({ x: x + 0.05 + shakeOffset.current.x, y: shakeOffset.current.y, z: shakeOffset.current.z });
            rightColliderRef.current.setHalfExtents({ x: 0.05, y, z });
        }
        if (backColliderRef.current) {
            backColliderRef.current.setTranslation({ x: shakeOffset.current.x, y: shakeOffset.current.y, z: -z - 0.05 + shakeOffset.current.z });
            backColliderRef.current.setHalfExtents({ x, y, z: 0.05 });
        }
        if (frontColliderRef.current) {
            frontColliderRef.current.setTranslation({ x: shakeOffset.current.x, y: shakeOffset.current.y, z: z + 0.05 + shakeOffset.current.z });
            frontColliderRef.current.setHalfExtents({ x, y, z: 0.05 });
        }
        if (baseColliderRef.current) {
            baseColliderRef.current.setTranslation({ x: shakeOffset.current.x, y: -y - 0.05 + shakeOffset.current.y, z: shakeOffset.current.z });
            baseColliderRef.current.setHalfExtents({ x, y: 0.05, z });
        }

        // Update outline
        if (outlineRef.current) {
            const points = [
                x, y, z,
                x, y, -z,
                -x, y, -z,
                -x, y, z,
                x, y, z,
                -x, y, z,
                -x, y, -z,
                -x, -y, -z,
                -x, -y, z,
                -x, y, z,
                -x, -y, z,
                x, -y, z,
                x, y, z,
                x, -y, z,
                x, -y, -z,
                x, y, -z,
                x, -y, -z,
                -x, -y, -z,
            ];
            outlineRef.current.geometry.setPositions(points);
        }
    });

    // Initial values for the render
    const { x, y, z } = currentBoxSize.current;

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
    const wallFriction = 1.0;

    return (
        <group ref={groupRef}>
            <mesh ref={leftWallRef} position={[-x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[1, 1]} />
                {wallMaterial}
            </mesh>
            <mesh ref={rightWallRef} position={[x, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[1, 1]} />
                {wallMaterial}
            </mesh>
            <mesh ref={backWallRef} position={[0, 0, -z]}>
                <planeGeometry args={[1, 1]} />
                {wallMaterial}
            </mesh>
            <mesh ref={frontWallRef} position={[0, 0, z]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[1, 1]} />
                {wallMaterial}
            </mesh>
            <mesh ref={baseRef} position={[0, -y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                {baseMaterial}
            </mesh>
            <RigidBody key={rigidBodyKey} type="fixed" friction={wallFriction} restitution={0.2}>
                <CuboidCollider ref={leftColliderRef} args={[0.05, y, z]} position={[-x - 0.05, 0, 0]} />
                <CuboidCollider ref={rightColliderRef} args={[0.05, y, z]} position={[x + 0.05, 0, 0]} />
                <CuboidCollider ref={backColliderRef} args={[x, y, 0.05]} position={[0, 0, -z - 0.05]} />
                <CuboidCollider ref={frontColliderRef} args={[x, y, 0.05]} position={[0, 0, z + 0.05]} />
                <CuboidCollider ref={baseColliderRef} args={[x, 0.05, z]} position={[0, -y - 0.05, 0]} />
            </RigidBody>

            {/* Outline */}
            {/* R3F Line component for the edges */}
            <Line
                ref={outlineRef}
                points={
                    linePoints
                }
                color="black"
                lineWidth={1}
            />
        </group>
    );
};
