import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Circle, Text, Group, Rect } from 'react-konva';
import {
    MousePointer2,
    PenTool,
    DoorOpen,
    Square,
    ZoomIn,
    ZoomOut,
    Maximize,
    Info,
    ChevronLeft,
    ChevronRight,
    PaintBucket,
    RotateCcw,
    Layers,
    Plus,
    FolderOpen,
    Box
} from 'lucide-react';
import useUIStore from '../../stores/uiStore';
import useFloorPlanStore from '../../stores/floorPlanStore';
import useFurnitureStore from '../../stores/furnitureStore';
import { snapToGrid, calculateDistance, findNearestPointOnWall, getAngle } from '../../utils/geometry';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const FloorPlanEditor = () => {
    const {
        projects, activeProjectId, activeFloorId,
        getActiveFloor, getActiveProject,
        createProject, addFloor, setActiveFloor,
        addWall, updateWall, addOpening, setSelected, deleteSelected, resetPlan
    } = useFloorPlanStore();

    const { setActiveMode } = useUIStore();
    const { setSelectedId } = useFurnitureStore();

    const floor = getActiveFloor();
    const project = getActiveProject();

    const gridSize = 20;
    const [selectedId, setSelectedIdLocal] = useState(null);
    const [selectedType, setSelectedTypeLocal] = useState(null);

    const setSelectedLocal = (id, type) => {
        setSelectedIdLocal(id);
        setSelectedTypeLocal(type);
        setSelected(id, type);
    };

    // Safety check if state isn't initialized
    if (!floor || !project) return <div className="p-20 text-white font-black text-3xl">INITIALIZING ENGINE...</div>;

    const walls = floor.walls || [];
    const openings = floor.openings || [];

    const selectedWall = selectedType === 'wall' ? walls.find(w => w.id === selectedId) : null;
    const selectedOpening = selectedType === 'opening' ? openings.find(o => o.id === selectedId) : null;

    const [tool, setTool] = useState('wall');
    const [isDrawing, setIsDrawing] = useState(false);
    const [newWall, setNewWall] = useState(null);
    const [stageScale, setStageScale] = useState(1);
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const [propPanelOpen, setPropPanelOpen] = useState(true);
    const stageRef = useRef(null);

    const handlePaint = (color) => {
        if (selectedType === 'wall' && selectedId) {
            updateWall(selectedId, { color });
        }
    };

    const handleReset = () => {
        if (window.confirm('Clear all structural elements on THIS floor?')) {
            resetPlan();
            clearFurniture();
            setSelected(null, null);
        }
    };

    const handleNewProject = () => {
        const name = window.prompt('Enter Project Name:');
        if (name) createProject(name);
    };

    const handleMouseDown = (e) => {
        const stage = e.target.getStage();
        const pos = stage.getRelativePointerPosition();
        const snapped = {
            x: snapToGrid(pos.x, gridSize),
            y: snapToGrid(pos.y, gridSize)
        };

        if (tool === 'wall') {
            setIsDrawing(true);
            setNewWall({ start: snapped, end: snapped, id: Date.now().toString() });
        } else if (tool === 'door' || tool === 'window') {
            let nearest = null;
            let minDocs = Infinity;

            walls.forEach(wall => {
                const point = findNearestPointOnWall(pos, wall);
                const dist = calculateDistance(pos, point);
                if (dist < 40 && dist < minDocs) {
                    minDocs = dist;
                    nearest = { wallId: wall.id, position: point.t };
                }
            });

            if (nearest) {
                addOpening({
                    wallId: nearest.wallId,
                    type: tool,
                    position: nearest.position,
                    width: tool === 'door' ? 36 : 48
                });
            }
        } else if (tool === 'select') {
            if (e.target === stage) {
                setSelected(null, null);
            }
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing || !newWall) return;
        const pos = e.target.getStage().getRelativePointerPosition();
        const snapped = {
            x: snapToGrid(pos.x, gridSize),
            y: snapToGrid(pos.y, gridSize)
        };
        setNewWall({ ...newWall, end: snapped });
    };

    const handleMouseUp = () => {
        if (!isDrawing || !newWall) return;
        if (calculateDistance(newWall.start, newWall.end) > gridSize / 2) {
            addWall(newWall);
        }
        setIsDrawing(false);
        setNewWall(null);
    };

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };
        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        const boundedScale = Math.max(0.1, Math.min(5, newScale));
        setStageScale(boundedScale);
        setStagePos({
            x: pointer.x - mousePointTo.x * boundedScale,
            y: pointer.y - mousePointTo.y * boundedScale,
        });
    };

    const tools = [
        { id: 'select', icon: <MousePointer2 size={18} />, label: 'Select' },
        { id: 'wall', icon: <PenTool size={18} />, label: 'Draw Wall' },
        { id: 'door', icon: <DoorOpen size={18} />, label: 'Place Door' },
        { id: 'window', icon: <Square size={18} />, label: 'Place Window' },
        { id: 'assets', icon: <Box size={18} />, label: '3D Objects' },
    ];

    const wallColors = ['#f1f5f9', '#94a3b8', '#334155', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    return (
        <div className="flex h-full bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.08),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />

            {/* Project & Floor Sidebar */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/20 p-6 rounded-[2.5rem] shadow-[0_0_60px_rgba(0,0,0,0.5)] space-y-6 min-w-[240px] animate-fade-in hover:border-amber-400/30 transition-all duration-500">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-[0.2em]">Active Project</p>
                        <button
                            onClick={handleNewProject}
                            className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-500/20"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-400/30 group-hover:scale-105 transition-transform duration-300">
                            <FolderOpen size={20} className="text-amber-400" />
                        </div>
                        <h2 className="text-white font-black text-xl tracking-tight truncate max-w-[140px] text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">{project.name}</h2>
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full" />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-[0.2em]">Floors</p>
                            <button
                                onClick={addFloor}
                                className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-500/20"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            {project.floors.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setActiveFloor(f.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                        activeFloorId === f.id
                                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                                            : "text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                                    )}
                                >
                                    {activeFloorId === f.id && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                    )}
                                    <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10">{f.name}</span>
                                    <Layers size={14} className={activeFloorId === f.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleReset}
                    className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-xl border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-slate-400 hover:text-red-400 px-7 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 group shadow-xl"
                >
                    <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    Reset Floor
                </button>
            </div>

            {/* Editor Toolbar */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center bg-gradient-to-r from-slate-900/60 via-slate-900/80 to-slate-900/60 backdrop-blur-2xl border border-white/20 p-2 rounded-[2rem] shadow-[0_0_60px_rgba(0,0,0,0.5)] animate-slide-down">
                {tools.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => {
                            if (t.id === 'assets') {
                                setActiveMode('catalog');
                            } else {
                                setTool(t.id);
                            }
                        }}
                        className={cn(
                            "px-5 py-4 rounded-[1.5rem] transition-all duration-300 flex flex-col items-center gap-2 group relative overflow-hidden min-w-[80px]",
                            tool === t.id
                                ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-[0_0_30px_rgba(251,191,36,0.4)] scale-105"
                                : "text-slate-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10"
                        )}
                        title={t.label}
                    >
                        {tool === t.id && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50" />
                        )}
                        <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">{t.icon}</div>
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] relative z-10">{t.label}</span>
                    </button>
                ))}
            </div>


            {/* Properties Panel */}
            <div className={cn(
                "absolute top-24 right-6 bottom-24 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-all duration-500 z-10 flex flex-col hover:border-amber-400/30",
                propPanelOpen ? "w-96 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-10 pointer-events-none"
            )}>
                <button
                    onClick={() => setPropPanelOpen(false)}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-14 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/20 rounded-2xl flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-110 shadow-xl"
                >
                    <ChevronRight size={18} />
                </button>

                <div className="p-9 flex-1 overflow-y-auto">
                    <h3 className="text-white font-black text-2xl mb-10 flex items-center gap-4 uppercase tracking-tight">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-400/30">
                            <PaintBucket size={24} className="text-amber-400" />
                        </div>
                        Customizer
                    </h3>

                    {selectedId ? (
                        <div className="space-y-8 animate-fade-in">
                            <div className="p-7 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-[2rem] border border-white/10 shadow-xl">
                                <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-2">Selected Element</p>
                                <p className="text-white font-black text-2xl capitalize tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">{selectedType}</p>
                            </div>

                            {selectedType === 'wall' && (
                                <div className="space-y-10">
                                    <div>
                                        <p className="text-[10px] font-black text-amber-400/80 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                                            Surface Paint
                                        </p>
                                        <div className="grid grid-cols-4 gap-3">
                                            {wallColors.map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => handlePaint(color)}
                                                    className={cn(
                                                        "w-full aspect-square rounded-2xl border-3 transition-all duration-300 relative group hover:scale-110",
                                                        selectedWall?.color === color
                                                            ? "border-amber-500 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                                                            : "border-white/20 hover:border-white/40"
                                                    )}
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {selectedWall?.color === color && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-2 h-2 rounded-full bg-white shadow-2xl ring-2 ring-amber-400" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <p className="text-[10px] font-black text-amber-400/80 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                                            Texture Profile
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['Smooth Finish', 'Matte Paint', 'Concrete', 'Brickwork'].map(mat => (
                                                <button
                                                    key={mat}
                                                    onClick={() => updateWall(selectedId, { material: mat.toLowerCase() })}
                                                    className={cn(
                                                        "w-full p-5 rounded-2xl border-2 font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.02]",
                                                        selectedWall?.material === mat.toLowerCase()
                                                            ? "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-white shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                                                            : "bg-slate-800/40 border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                                                    )}
                                                >
                                                    {mat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            onClick={deleteSelected}
                                            className="w-full bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border-2 border-red-500/40 hover:border-red-500/60 text-red-400 hover:text-red-300 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] shadow-lg"
                                        >
                                            Destroy Selected Wall
                                        </button>
                                    </div>
                                </div>
                            )}

                            {selectedType === 'opening' && (
                                <div className="space-y-7">
                                    <div className="p-7 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-[2rem] border border-white/10 space-y-5 shadow-xl">
                                        <p className="text-[10px] font-black text-amber-400/80 uppercase tracking-[0.2em]">Specifications</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-bold text-base">Clearance Width</span>
                                            <span className="text-amber-400 font-black text-lg">{Math.round((selectedOpening?.width || 36) / 12)}' 0"</span>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            onClick={deleteSelected}
                                            className="w-full bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border-2 border-red-500/40 hover:border-red-500/60 text-red-400 hover:text-red-300 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] shadow-lg"
                                        >
                                            Remove Opening
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-20">
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-500/20 blur-2xl animate-pulse" />
                                <div className="relative w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-slate-800/80 to-slate-900/80 flex items-center justify-center border border-white/10">
                                    <MousePointer2 size={40} className="text-amber-400/40" />
                                </div>
                            </div>
                            <div>
                                <p className="text-white font-black text-base uppercase tracking-[0.2em] mb-3">Blueprint Active</p>
                                <p className="text-slate-400 text-sm font-medium max-w-[200px] leading-relaxed">Select architectural components to adjust their finish and dimensions.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!propPanelOpen && (
                <button
                    onClick={() => setPropPanelOpen(true)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/20 rounded-2xl flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.6)] z-10 hover:scale-110 hover:border-amber-400/40"
                >
                    <ChevronLeft size={22} />
                </button>
            )}

            {/* Canvas Area */}
            <div className="flex-1 overflow-hidden cursor-crosshair relative">
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onWheel={handleWheel}
                    scaleX={stageScale}
                    scaleY={stageScale}
                    x={stagePos.x}
                    y={stagePos.y}
                    ref={stageRef}
                    draggable={tool === 'select'}
                >
                    <Layer>
                        <Grid width={5000} height={5000} gridSize={gridSize} />

                        {walls.map((wall) => {
                            const wallOpenings = openings.filter(o => o.wallId === wall.id);
                            return (
                                <Wall
                                    key={wall.id}
                                    wall={wall}
                                    openings={wallOpenings}
                                    isSelected={selectedId === wall.id}
                                    onSelect={() => tool === 'select' && setSelected(wall.id, 'wall')}
                                />
                            );
                        })}

                        {/* Draw Openings overlay for selection */}
                        {openings.map((opening) => (
                            <OpeningControl
                                key={opening.id}
                                opening={opening}
                                wall={walls.find(w => w.id === opening.wallId)}
                                isSelected={selectedId === opening.id}
                                onSelect={() => tool === 'select' && setSelected(opening.id, 'opening')}
                            />
                        ))}

                        {newWall && (
                            <Line
                                points={[newWall.start.x, newWall.start.y, newWall.end.x, newWall.end.y]}
                                stroke="#f59e0b"
                                strokeWidth={8}
                                lineCap="round"
                                opacity={0.7}
                            />
                        )}
                    </Layer>
                </Stage>
            </div>

            {/* Bottom Interface HUD */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none">
                <div className="bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/20 px-10 py-6 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] pointer-events-auto flex items-center gap-8 animate-slide-up group hover:border-amber-400/40 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/30 text-amber-400 flex items-center justify-center shadow-lg border border-amber-400/30 group-hover:scale-110 transition-transform duration-300">
                        <Info size={26} />
                    </div>
                    <div>
                        <p className="text-white font-black text-base uppercase tracking-tight mb-1">ARCHITECTURAL {tool.toUpperCase()} MODE</p>
                        <p className="text-slate-400 text-sm font-medium">
                            {tool === 'wall' ? 'Define spatial boundaries.' :
                                tool === 'door' ? 'Click wall to install portal.' :
                                    tool === 'window' ? 'Click wall to add illumination.' :
                                        'Refine selection properties.'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col bg-gradient-to-br from-slate-950/90 to-slate-900/90 backdrop-blur-2xl border border-white/20 p-3 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] pointer-events-auto gap-2">
                    <ControlBtn icon={<ZoomIn size={20} />} onClick={() => setStageScale(s => s * 1.2)} />
                    <ControlBtn icon={<ZoomOut size={20} />} onClick={() => setStageScale(s => s / 1.2)} />
                    <ControlBtn icon={<Maximize size={20} />} onClick={() => { setStageScale(1); setStagePos({ x: 0, y: 0 }); }} />
                </div>
            </div>
        </div>
    );
};

const ControlBtn = ({ icon, onClick }) => (
    <button onClick={onClick} className="w-14 h-14 flex items-center justify-center text-slate-400 hover:bg-amber-500/20 hover:text-amber-400 rounded-2xl transition-all duration-300 active:scale-90 hover:shadow-lg hover:shadow-amber-500/20">
        {icon}
    </button>
);

const Grid = ({ width, height, gridSize }) => {
    const lines = [];
    for (let i = 0; i <= width / gridSize; i++) {
        lines.push(<Line key={`v-${i}`} points={[i * gridSize, 0, i * gridSize, height]} stroke="#1e293b" strokeWidth={i % 5 === 0 ? 2 : 1} opacity={i % 5 === 0 ? 0.3 : 0.1} />);
    }
    for (let j = 0; j <= height / gridSize; j++) {
        lines.push(<Line key={`h-${j}`} points={[0, j * gridSize, width, j * gridSize]} stroke="#1e293b" strokeWidth={j % 5 === 0 ? 2 : 1} opacity={j % 5 === 0 ? 0.3 : 0.1} />);
    }
    return <Group>{lines}</Group>;
};

const Wall = ({ wall, openings, isSelected, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Group onClick={onSelect} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Line
                points={[wall.start.x, wall.start.y, wall.end.x, wall.end.y]}
                stroke={isSelected ? "#0ea5e9" : isHovered ? "#38bdf8" : wall.color || "#475569"}
                strokeWidth={14}
                lineCap="round"
            />

            <Line
                points={[wall.start.x, wall.start.y, wall.end.x, wall.end.y]}
                stroke="white"
                strokeWidth={2}
                opacity={0.1}
                lineCap="round"
            />

            {isSelected && (
                <Line
                    points={[wall.start.x, wall.start.y, wall.end.x, wall.end.y]}
                    stroke="#0ea5e9"
                    strokeWidth={24}
                    lineCap="round"
                    opacity={0.15}
                />
            )}

            {openings.map(op => {
                const angle = getAngle(wall.start, wall.end);
                const opWidth = op.width || 40;
                const opX = wall.start.x + (wall.end.x - wall.start.x) * op.position;
                const opY = wall.start.y + (wall.end.y - wall.start.y) * op.position;

                return (
                    <Group key={op.id} x={opX} y={opY} rotation={angle * (180 / Math.PI)}>
                        <Rect
                            x={-opWidth / 2}
                            y={-9}
                            width={opWidth}
                            height={18}
                            fill="#020617"
                            stroke={op.type === 'door' ? '#f59e0b' : '#38bdf8'}
                            strokeWidth={2}
                        />
                        {op.type === 'door' && (
                            <Line
                                points={[-opWidth / 2, -9, -opWidth / 2, -opWidth, opWidth / 2, -opWidth]}
                                stroke="#f59e0b"
                                strokeWidth={2}
                                opacity={0.5}
                                dash={[5, 5]}
                            />
                        )}
                    </Group>
                );
            })}

            <Text
                text={`${Math.round(calculateDistance(wall.start, wall.end) / 20)} ft`}
                x={(wall.start.x + wall.end.x) / 2 + 15}
                y={(wall.start.y + wall.end.y) / 2 - 25}
                fill={isSelected ? "#0ea5e9" : "#64748b"}
                fontSize={12}
                fontStyle="black"
                align="center"
            />
        </Group>
    );
};

const OpeningControl = ({ opening, wall, isSelected, onSelect }) => {
    if (!wall) return null;
    const opX = wall.start.x + (wall.end.x - wall.start.x) * opening.position;
    const opY = wall.start.y + (wall.end.y - wall.start.y) * opening.position;

    return (
        <Circle
            x={opX}
            y={opY}
            radius={18}
            fill={isSelected ? "#0ea5e9" : "transparent"}
            opacity={0.3}
            onClick={onSelect}
            cursor="pointer"
        />
    );
};

export default FloorPlanEditor;
