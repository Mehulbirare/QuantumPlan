import React from 'react';
import useFloorPlanStore from '../../stores/floorPlanStore';
import useFurnitureStore from '../../stores/furnitureStore';
import Walls from './Walls';
import Floor from './Floor';
import Furniture from './Furniture';

const Scene = ({ activeTool }) => {
    const { getActiveFloor } = useFloorPlanStore();
    const { setSelectedId } = useFurnitureStore();
    const floor = getActiveFloor();

    console.log('3D Scene - Floor data:', floor);
    console.log('3D Scene - Walls:', floor?.walls);
    console.log('3D Scene - Furniture:', floor?.furniture);

    const handleFloorClick = () => {
        // Deselect furniture when clicking on floor
        setSelectedId(null);
    };

    if (!floor) {
        return (
            <group>
                {/* Empty scene with floor and grid */}
                <Floor onClick={handleFloorClick} />
                <gridHelper args={[100, 100, "#1e293b", "#0f172a"]} />

                {/* Demo marker to show scene is loaded */}
                <mesh position={[0, 1, 0]}>
                    <sphereGeometry args={[0.5]} />
                    <meshStandardMaterial color="#ef4444" />
                </mesh>
            </group>
        );
    }

    return (
        <group>
            {floor.walls && floor.walls.length > 0 && (
                <Walls walls={floor.walls} openings={floor.openings || []} />
            )}
            <Floor onClick={handleFloorClick} />
            {floor.furniture && floor.furniture.length > 0 && (
                <Furniture activeTool={activeTool} />
            )}

            {/* Visual Reference Grid */}
            <gridHelper args={[100, 100, "#1e293b", "#0f172a"]} />

            {/* Debug: Show origin point */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.3]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
};

export default Scene;

