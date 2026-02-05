import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const Player = () => {
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls();
    const velocity = useRef(new THREE.Vector3());
    const direction = useRef(new THREE.Vector3());

    const SPEED = 5;

    useFrame((state, delta) => {
        const { forward, backward, left, right } = getKeys();

        // Calculate movement direction
        direction.current.set(
            Number(right) - Number(left),
            0,
            Number(backward) - Number(forward)
        );
        direction.current.normalize();

        // Apply movement relative to camera orientation
        const camDir = new THREE.Vector3();
        camera.getWorldDirection(camDir);
        camDir.y = 0; // Keep movement on flat plane
        camDir.normalize();

        const camSide = new THREE.Vector3().crossVectors(camera.up, camDir).normalize();

        const moveX = (camDir.x * -direction.current.z) + (camSide.x * direction.current.x);
        const moveZ = (camDir.z * -direction.current.z) + (camSide.z * direction.current.x);

        velocity.current.set(moveX * SPEED, 0, moveZ * SPEED);

        // Update camera position
        camera.position.x += velocity.current.x * delta;
        camera.position.z += velocity.current.z * delta;

        // Lock height to eye level
        camera.position.y = 1.6;
    });

    return null;
};

export default Player;
