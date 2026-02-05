import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { RotateCcw, MousePointer, Move, RotateCw, Info } from 'lucide-react';
import Scene from './Scene';
import useFloorPlanStore from '../../stores/floorPlanStore';

const ThreeDViewer = () => {
    const [activeTool, setActiveTool] = useState('select');
    const { getActiveFloor } = useFloorPlanStore();
    const floor = getActiveFloor();

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 'r':
                    setActiveTool('rotate');
                    break;
                case 'm':
                    setActiveTool('move');
                    break;
                case 's':
                    setActiveTool('select');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Calculate the bounding box and center of the design
    const { center, size, cameraDistance } = useMemo(() => {
        if (!floor || !floor.walls || floor.walls.length === 0) {
            return {
                center: [0, 0, 0],
                size: 10,
                cameraDistance: 20
            };
        }

        const pixelsPerFoot = 20;
        let minX = Infinity, maxX = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        // Get bounds from all walls
        floor.walls.forEach(wall => {
            const x1 = wall.start.x / pixelsPerFoot;
            const z1 = wall.start.y / pixelsPerFoot;
            const x2 = wall.end.x / pixelsPerFoot;
            const z2 = wall.end.y / pixelsPerFoot;

            minX = Math.min(minX, x1, x2);
            maxX = Math.max(maxX, x1, x2);
            minZ = Math.min(minZ, z1, z2);
            maxZ = Math.max(maxZ, z1, z2);
        });

        // Calculate center and size
        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;
        const sizeX = maxX - minX;
        const sizeZ = maxZ - minZ;
        const maxSize = Math.max(sizeX, sizeZ, 10); // Minimum size of 10

        // Calculate appropriate camera distance
        const distance = maxSize * 1.5 + 10;

        return {
            center: [centerX, 0, centerZ],
            size: maxSize,
            cameraDistance: distance
        };
    }, [floor]);

    return (
        <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-6 left-6 z-10">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    <h2 className="text-white font-black text-sm tracking-widest uppercase">
                        3D View <span className="text-slate-500 ml-1">Your Floor Plan</span>
                    </h2>
                </div>
            </div>

            {/* Tools */}
            <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button
                    onClick={() => setActiveTool('select')}
                    className={`p-4 rounded-2xl transition-all ${activeTool === 'select' ? 'bg-primary-500 text-white' : 'bg-slate-900/80 text-slate-400 hover:text-white'} backdrop-blur-xl border border-white/10`}
                    title="Select Objects (S)"
                >
                    <MousePointer size={20} />
                </button>
                <button
                    onClick={() => setActiveTool('move')}
                    className={`p-4 rounded-2xl transition-all ${activeTool === 'move' ? 'bg-primary-500 text-white' : 'bg-slate-900/80 text-slate-400 hover:text-white'} backdrop-blur-xl border border-white/10`}
                    title="Move Objects (M)"
                >
                    <Move size={20} />
                </button>
                <button
                    onClick={() => setActiveTool('rotate')}
                    className={`p-4 rounded-2xl transition-all ${activeTool === 'rotate' ? 'bg-primary-500 text-white' : 'bg-slate-900/80 text-slate-400 hover:text-white'} backdrop-blur-xl border border-white/10`}
                    title="Rotate Objects (R)"
                >
                    <RotateCw size={20} />
                </button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 bg-slate-950/80 backdrop-blur-2xl border border-primary-500/30 px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center shadow-lg">
                    <Info size={24} />
                </div>
                <div>
                    <p className="text-white font-black text-sm uppercase tracking-tighter">
                        {activeTool === 'select'
                            ? 'Selection Mode - Click Furniture'
                            : activeTool === 'move'
                                ? 'Move Mode - Drag Arrows'
                                : 'Rotate Mode - Drag Green Ring'}
                    </p>
                    <p className="text-slate-400 text-xs font-medium">
                        {activeTool === 'rotate'
                            ? 'Press M for Move • Press S for Select • Scroll to Zoom'
                            : 'Press R for Rotate • Scroll to Zoom • Right-Click to Pan'}
                    </p>
                </div>
            </div>

            <Canvas shadows>
                <Suspense fallback={null}>
                    <PerspectiveCamera
                        makeDefault
                        position={[center[0] + cameraDistance * 0.7, cameraDistance * 0.7, center[2] + cameraDistance * 0.7]}
                        fov={50}
                    />
                    <OrbitControls
                        makeDefault
                        target={center}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.1}
                        enableDamping
                        dampingFactor={0.05}
                    />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={1.2}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />
                    <hemisphereLight args={['#ffffff', '#082f49', 0.6]} />

                    {/* Your Floor Plan Scene */}
                    <Scene activeTool={activeTool} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ThreeDViewer;
