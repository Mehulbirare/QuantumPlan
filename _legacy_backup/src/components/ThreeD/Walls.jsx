import React, { useMemo } from 'react';
import { calculateDistance, getAngle } from '../../utils/geometry';

const Walls = ({ walls, openings }) => {
    const wallHeight = 10;
    const wallThickness = 0.5;
    const pixelsPerFoot = 20;

    const wallMeshes = useMemo(() => {
        return walls.map((wall) => {
            const length = calculateDistance(wall.start, wall.end) / pixelsPerFoot;
            const angle = getAngle(wall.start, wall.end);

            const centerX = (wall.start.x + wall.end.x) / (2 * pixelsPerFoot);
            const centerZ = (wall.start.y + wall.end.y) / (2 * pixelsPerFoot);

            const wallOpenings = (openings || []).filter(o => o.wallId === wall.id);

            return (
                <group key={wall.id} position={[centerX, wallHeight / 2, centerZ]} rotation={[0, -angle, 0]}>
                    {/* Main Wall Segment */}
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[length, wallHeight, wallThickness]} />
                        <meshStandardMaterial
                            color={wall.color || "#f1f5f9"}
                            roughness={wall.material === 'smooth' ? 0.3 : 0.8}
                            metalness={0.05}
                        />
                    </mesh>

                    {/* Baseboard */}
                    <mesh position={[0, -wallHeight / 2 + 0.25, 0]}>
                        <boxGeometry args={[length + 0.01, 0.5, wallThickness + 0.05]} />
                        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.3} />
                    </mesh>

                    {/* Top Trim */}
                    <mesh position={[0, wallHeight / 2 - 0.1, 0]}>
                        <boxGeometry args={[length + 0.01, 0.2, wallThickness + 0.05]} />
                        <meshStandardMaterial color="#cbd5e1" />
                    </mesh>

                    {/* Openings Visualizers */}
                    {wallOpenings.map((op) => {
                        const opPos = (op.position - 0.5) * length;
                        const opWidth = (op.width || 36) / 12; // inches to feet
                        const opHeight = op.type === 'door' ? 7 : 4;
                        const opElevation = op.type === 'door' ? -wallHeight / 2 + opHeight / 2 : 1;

                        return (
                            <mesh key={op.id} position={[opPos, opElevation, 0]}>
                                <boxGeometry args={[opWidth, opHeight, wallThickness + 0.1]} />
                                <meshStandardMaterial color={op.type === 'door' ? "#78350f" : "#0ea5e9"} transparent opacity={0.6} />
                            </mesh>
                        );
                    })}
                </group>
            );
        });
    }, [walls, openings]);

    return <group>{wallMeshes}</group>;
};

export default Walls;
