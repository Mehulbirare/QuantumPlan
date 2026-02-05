import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFloorPlanStore = create(
    persist(
        (set, get) => ({
            projects: [
                {
                    id: 'proj-1',
                    name: 'Project Alpha',
                    lastModified: Date.now(),
                    floors: [
                        { id: 'f1', name: 'Ground Floor', level: 0, walls: [], openings: [] }
                    ]
                }
            ],
            activeProjectId: 'proj-1',
            activeFloorId: 'f1',
            selectedId: null,
            selectedType: null,
            gridSize: 20,

            past: [],
            future: [],

            // History Actions
            undo: () => set(state => {
                if (state.past.length === 0) return state;
                const previous = state.past[state.past.length - 1];
                const newPast = state.past.slice(0, state.past.length - 1);
                return {
                    projects: previous,
                    past: newPast,
                    future: [state.projects, ...state.future]
                };
            }),

            redo: () => set(state => {
                if (state.future.length === 0) return state;
                const next = state.future[0];
                const newFuture = state.future.slice(1);
                return {
                    projects: next,
                    past: [...state.past, state.projects],
                    future: newFuture
                };
            }),

            saveToHistory: () => set(state => {
                const newPast = [...state.past, state.projects];
                if (newPast.length > 20) newPast.shift(); // Limit history to 20 steps
                return {
                    past: newPast,
                    future: [] // Clear future on new action
                };
            }),

            // Getters
            getActiveProject: () => get().projects.find(p => p.id === get().activeProjectId),
            getActiveFloor: () => {
                const proj = get().getActiveProject();
                return proj?.floors.find(f => f.id === get().activeFloorId);
            },

            // Project Actions
            loadProject: (projectTemplate) => {
                get().saveToHistory();
                const id = `proj-${Date.now()}`;
                const newProj = {
                    ...projectTemplate,
                    id,
                    name: `${projectTemplate.name} (Copy)`,
                    lastModified: Date.now(),
                    floors: projectTemplate.floors.map(f => ({
                        ...f,
                        id: `f${Date.now()}-${f.id}` // Ensure unique floor IDs
                    }))
                };
                set(state => ({
                    projects: [...state.projects, newProj],
                    activeProjectId: id,
                    activeFloorId: newProj.floors[0].id
                }));
            },

            // Project Actions
            createProject: (name) => {
                get().saveToHistory();
                const id = `proj-${Date.now()}`;
                const newProj = {
                    id,
                    name,
                    lastModified: Date.now(),
                    floors: [{ id: 'f1', name: 'Ground Floor', level: 0, walls: [], openings: [] }]
                };
                set(state => ({
                    projects: [...state.projects, newProj],
                    activeProjectId: id,
                    activeFloorId: 'f1'
                }));
            },

            // Floor Actions
            addFloor: () => {
                get().saveToHistory();
                const proj = get().getActiveProject();
                if (!proj) return;
                const newLevel = proj.floors.length;
                const newFloor = {
                    id: `f${Date.now()}`,
                    name: `Floor ${newLevel}`,
                    level: newLevel,
                    walls: [],
                    openings: []
                };
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? { ...p, floors: [...p.floors, newFloor] }
                            : p
                    ),
                    activeFloorId: newFloor.id
                }));
            },

            setActiveFloor: (id) => set({ activeFloorId: id, selectedId: null, selectedType: null }),

            // Multi-Floor aware data actions
            addWall: (wall) => {
                get().saveToHistory();
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? {
                                ...p,
                                floors: p.floors.map(f =>
                                    f.id === state.activeFloorId
                                        ? { ...f, walls: [...f.walls, { ...wall, color: '#f1f5f9', material: 'smooth' }] }
                                        : f
                                )
                            }
                            : p
                    )
                }));
            },

            updateWall: (id, updates) => {
                get().saveToHistory();
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? {
                                ...p,
                                floors: p.floors.map(f =>
                                    f.id === state.activeFloorId
                                        ? { ...f, walls: f.walls.map(w => w.id === id ? { ...w, ...updates } : w) }
                                        : f
                                )
                            }
                            : p
                    )
                }));
            },

            addOpening: (opening) => {
                get().saveToHistory();
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? {
                                ...p,
                                floors: p.floors.map(f =>
                                    f.id === state.activeFloorId
                                        ? { ...f, openings: [...f.openings, { ...opening, id: Date.now().toString() }] }
                                        : f
                                )
                            }
                            : p
                    )
                }));
            },

            setSelected: (id, type) => set({ selectedId: id, selectedType: type }),

            deleteSelected: () => {
                get().saveToHistory();
                set(state => {
                    const { selectedId, selectedType, activeProjectId, activeFloorId } = state;
                    if (!selectedId) return state;

                    return {
                        projects: state.projects.map(p => {
                            if (p.id !== activeProjectId) return p;
                            return {
                                ...p,
                                floors: p.floors.map(f => {
                                    if (f.id !== activeFloorId) return f;
                                    if (selectedType === 'wall') {
                                        return {
                                            ...f,
                                            walls: f.walls.filter(w => w.id !== selectedId),
                                            openings: f.openings.filter(o => o.wallId !== selectedId)
                                        };
                                    }
                                    if (selectedType === 'opening') {
                                        return {
                                            ...f,
                                            openings: f.openings.filter(o => o.id !== selectedId)
                                        };
                                    }
                                    return f;
                                })
                            };
                        }),
                        selectedId: null,
                        selectedType: null
                    };
                });
            },

            resetPlan: () => {
                get().saveToHistory();
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? { ...p, floors: p.floors.map(f => f.id === state.activeFloorId ? { ...f, walls: [], openings: [], furniture: [] } : f) }
                            : p
                    )
                }));
            },

            // Furniture Actions
            addFurniture: (furniture) => {
                get().saveToHistory();
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? {
                                ...p,
                                floors: p.floors.map(f =>
                                    f.id === state.activeFloorId
                                        ? { ...f, furniture: [...(f.furniture || []), furniture] }
                                        : f
                                )
                            }
                            : p
                    )
                }));
            },

            updateFurniture: (id, updates) => {
                get().saveToHistory();
                set(state => ({
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? {
                                ...p,
                                floors: p.floors.map(f =>
                                    f.id === state.activeFloorId
                                        ? { ...f, furniture: (f.furniture || []).map(item => item.id === id ? { ...item, ...updates } : item) }
                                        : f
                                )
                            }
                            : p
                    )
                }));
            },

            removeFurniture: (id) => set(state => ({
                projects: state.projects.map(p =>
                    p.id === state.activeProjectId
                        ? {
                            ...p,
                            floors: p.floors.map(f =>
                                f.id === state.activeFloorId
                                    ? { ...f, furniture: (f.furniture || []).filter(item => item.id !== id) }
                                    : f
                            )
                        }
                        : p
                )
            })),
        }),
        { name: 'homevision-floorplans' }
    )
);

export default useFloorPlanStore;
