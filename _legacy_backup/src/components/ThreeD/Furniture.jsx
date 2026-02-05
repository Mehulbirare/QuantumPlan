import React, { useRef } from 'react';
import { Html, TransformControls } from '@react-three/drei';
import useFurnitureStore from '../../stores/furnitureStore';
import useFloorPlanStore from '../../stores/floorPlanStore';

// Realistic furniture model components
const SofaModel = ({ w, h, d, color }) => {
    return (
        <group>
            {/* Base/Seat */}
            <mesh position={[0, -h * 0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.9, h * 0.4, d * 0.9]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Backrest */}
            <mesh position={[0, h * 0.15, -d * 0.35]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.9, h * 0.7, d * 0.2]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Left Armrest */}
            <mesh position={[-w * 0.4, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.15, h * 0.6, d * 0.8]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Right Armrest */}
            <mesh position={[w * 0.4, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.15, h * 0.6, d * 0.8]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Cushions */}
            <mesh position={[-w * 0.2, -h * 0.1, 0.1]} castShadow>
                <boxGeometry args={[w * 0.25, h * 0.15, d * 0.7]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            <mesh position={[w * 0.2, -h * 0.1, 0.1]} castShadow>
                <boxGeometry args={[w * 0.25, h * 0.15, d * 0.7]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
        </group>
    );
};

const ChairModel = ({ w, h, d, color }) => {
    return (
        <group>
            {/* Seat */}
            <mesh position={[0, -h * 0.3, 0]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.9, h * 0.15, d * 0.9]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Backrest */}
            <mesh position={[0, h * 0.1, -d * 0.35]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.8, h * 0.6, d * 0.15]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Legs */}
            {[
                [-w * 0.35, -h * 0.45, -d * 0.35],
                [w * 0.35, -h * 0.45, -d * 0.35],
                [-w * 0.35, -h * 0.45, d * 0.35],
                [w * 0.35, -h * 0.45, d * 0.35]
            ].map((pos, i) => (
                <mesh key={i} position={pos} castShadow>
                    <cylinderGeometry args={[0.08, 0.08, h * 0.5]} />
                    <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
                </mesh>
            ))}
        </group>
    );
};

const TableModel = ({ w, h, d, color, subcategory }) => {
    const isCoffeeTable = subcategory?.toLowerCase().includes('coffee');
    const tableHeight = isCoffeeTable ? h * 0.3 : h * 0.9;

    return (
        <group>
            {/* Tabletop */}
            <mesh position={[0, h * 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[w, h * 0.15, d]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
            </mesh>

            {/* Legs */}
            {[
                [-w * 0.4, -h * 0.15, -d * 0.4],
                [w * 0.4, -h * 0.15, -d * 0.4],
                [-w * 0.4, -h * 0.15, d * 0.4],
                [w * 0.4, -h * 0.15, d * 0.4]
            ].map((pos, i) => (
                <mesh key={i} position={pos} castShadow>
                    <cylinderGeometry args={[0.1, 0.1, tableHeight]} />
                    <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
                </mesh>
            ))}
        </group>
    );
};

const BedModel = ({ w, h, d, color }) => {
    return (
        <group>
            {/* Mattress */}
            <mesh position={[0, -h * 0.15, 0]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.95, h * 0.3, d * 0.95]} />
                <meshStandardMaterial color={color} roughness={0.9} />
            </mesh>

            {/* Bed Frame */}
            <mesh position={[0, -h * 0.4, 0]} receiveShadow>
                <boxGeometry args={[w, h * 0.2, d]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>

            {/* Headboard */}
            <mesh position={[0, h * 0.1, -d * 0.45]} castShadow receiveShadow>
                <boxGeometry args={[w * 0.95, h * 0.8, d * 0.1]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>

            {/* Pillows */}
            <mesh position={[-w * 0.25, 0, -d * 0.25]} castShadow>
                <boxGeometry args={[w * 0.3, h * 0.2, d * 0.4]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
            </mesh>
            <mesh position={[w * 0.25, 0, -d * 0.25]} castShadow>
                <boxGeometry args={[w * 0.3, h * 0.2, d * 0.4]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
            </mesh>
        </group>
    );
};

const StorageModel = ({ w, h, d, color }) => {
    return (
        <group>
            {/* Main Cabinet Body */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>

            {/* Doors/Drawer Details */}
            <mesh position={[0, h * 0.2, d * 0.51]} castShadow>
                <boxGeometry args={[w * 0.45, h * 0.3, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
            <mesh position={[0, -h * 0.2, d * 0.51]} castShadow>
                <boxGeometry args={[w * 0.45, h * 0.3, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>

            {/* Handles */}
            <mesh position={[w * 0.15, h * 0.2, d * 0.55]}>
                <cylinderGeometry args={[0.05, 0.05, 0.15]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
};

const LampModel = ({ w, h, d, color }) => {
    const isFloorLamp = h > 4; // Floor lamps are taller

    return (
        <group>
            {/* Base */}
            <mesh position={[0, -h * 0.45, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[w * 0.4, w * 0.5, h * 0.1]} />
                <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
            </mesh>

            {/* Stand/Pole */}
            <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.12, h * 0.7]} />
                <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
            </mesh>

            {/* Lampshade (cone shape) */}
            <mesh position={[0, h * 0.4, 0]} castShadow receiveShadow>
                <coneGeometry args={[w * 0.6, h * 0.3, 16]} />
                <meshStandardMaterial
                    color={isFloorLamp ? "#f5f5dc" : "#fff8e7"}
                    roughness={0.9}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Light bulb (glowing sphere) */}
            <mesh position={[0, h * 0.3, 0]}>
                <sphereGeometry args={[0.15]} />
                <meshStandardMaterial
                    color="#fff8dc"
                    emissive="#ffeb3b"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Decorative lampshade rim */}
            <mesh position={[0, h * 0.25, 0]}>
                <torusGeometry args={[w * 0.6, 0.05, 8, 16]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
        </group>
    );
};

const DefaultModel = ({ w, h, d, color }) => {
    return (
        <mesh castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
        </mesh>
    );
};

const FurnitureItem = ({ item, isSelected, onSelect, onTransform, activeTool }) => {
    const meshRef = useRef();
    const transformRef = useRef();

    const pixelsPerFoot = 20;
    const x = item.position.x / pixelsPerFoot;
    const z = item.position.y / pixelsPerFoot;
    const rotation = (item.rotation || 0) * (Math.PI / 180);

    const w = (item.width || 36) / 12;
    const h = (item.height || 30) / 12;
    const d = (item.depth || 18) / 12;

    const handleTransformEnd = () => {
        if (!meshRef.current) return;

        const position = meshRef.current.position;
        const rotation = meshRef.current.rotation;

        const newX = position.x * pixelsPerFoot;
        const newY = position.z * pixelsPerFoot;
        const newRotation = (rotation.y * 180) / Math.PI;

        onTransform(item.id, {
            position: { x: newX, y: newY },
            rotation: newRotation % 360
        });
    };

    // Determine furniture type and color
    const subcategory = item.subcategory?.toLowerCase() || '';
    const category = item.category?.toLowerCase() || '';
    const baseColor = item.color || '#8b7355';
    const displayColor = isSelected ? '#0ea5e9' : baseColor;

    // Select appropriate model based on furniture type
    let FurnitureModel;
    if (subcategory.includes('sofa') || subcategory.includes('couch')) {
        FurnitureModel = SofaModel;
    } else if (subcategory.includes('chair') || subcategory.includes('stool')) {
        FurnitureModel = ChairModel;
    } else if (subcategory.includes('table') || subcategory.includes('desk')) {
        FurnitureModel = TableModel;
    } else if (subcategory.includes('bed')) {
        FurnitureModel = BedModel;
    } else if (subcategory.includes('storage') || subcategory.includes('cabinet') ||
        subcategory.includes('dresser') || subcategory.includes('wardrobe')) {
        FurnitureModel = StorageModel;
    } else if (subcategory.includes('lighting') || subcategory.includes('lamp') ||
        category.includes('lighting')) {
        FurnitureModel = LampModel;
    } else {
        FurnitureModel = DefaultModel;
    }

    return (
        <group>
            <group
                ref={meshRef}
                position={[x, h / 2, z]}
                rotation={[0, rotation, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.id);
                }}
            >
                {/* Render appropriate furniture model */}
                <FurnitureModel w={w} h={h} d={d} color={displayColor} subcategory={subcategory} />

                {/* Outline when selected */}
                {isSelected && (
                    <mesh>
                        <boxGeometry args={[w + 0.2, h + 0.2, d + 0.2]} />
                        <meshBasicMaterial
                            color="#0ea5e9"
                            wireframe
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                )}

                {/* Selection indicator */}
                {isSelected && (
                    <mesh position={[0, h / 2 + 0.5, 0]}>
                        <sphereGeometry args={[0.3]} />
                        <meshStandardMaterial
                            color="#10b981"
                            emissive="#10b981"
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                )}

                {/* Label */}
                {isSelected && (
                    <Html distanceFactor={10} position={[0, h / 2 + 1.5, 0]}>
                        <div className="bg-slate-900/90 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl border border-primary-500/30 whitespace-nowrap">
                            {item.name}
                            <div className="text-xs text-primary-400 mt-1">
                                {activeTool === 'rotate'
                                    ? `Drag green ring to rotate • ${item.subcategory}`
                                    : 'Red/Blue = Axis • Yellow = Free Move • ' + item.subcategory}
                            </div>
                        </div>
                    </Html>
                )}
            </group>

            {/* Transform Controls for selected item */}
            {isSelected && (
                <TransformControls
                    ref={transformRef}
                    object={meshRef.current}
                    mode={activeTool === 'rotate' ? 'rotate' : 'translate'}
                    onObjectChange={handleTransformEnd}
                    translationSnap={0.5}
                    rotationSnap={Math.PI / 12}
                    showX={true}
                    showY={false}
                    showZ={true}
                    // Enable plane helpers for free 360° movement
                    space="world"
                />
            )}
        </group>
    );
};

const Furniture = ({ activeTool }) => {
    const { selectedId, setSelectedId } = useFurnitureStore();
    const { getActiveFloor, updateFurniture } = useFloorPlanStore();

    const floor = getActiveFloor();
    const placedFurniture = floor?.furniture || [];

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleTransform = (id, updates) => {
        updateFurniture(id, updates);
    };

    if (placedFurniture.length === 0) return null;

    return (
        <group>
            {placedFurniture.map((item) => (
                <FurnitureItem
                    key={item.id}
                    item={item}
                    isSelected={selectedId === item.id}
                    onSelect={handleSelect}
                    onTransform={handleTransform}
                    activeTool={activeTool}
                />
            ))}
        </group>
    );
};

export default Furniture;
