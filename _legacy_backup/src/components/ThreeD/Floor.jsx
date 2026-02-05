import React from 'react';

const Floor = ({ onClick }) => {
    return (
        <group>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.01, 0]}
                receiveShadow
                onClick={onClick}
            >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color="#0f172a"
                    roughness={0.1}
                    metalness={0.2}
                />
            </mesh>
            {/* Visual floor border */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.02, 0]}
                onClick={onClick}
            >
                <planeGeometry args={[102, 102]} />
                <meshBasicMaterial color="#1e293b" />
            </mesh>
        </group>
    );
};

export default Floor;

