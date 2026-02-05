import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProjectStore = create(
    persist(
        (set, get) => ({
            projects: [
                {
                    id: 'default-project',
                    name: 'My Dream House',
                    lastModified: Date.now(),
                    floors: [
                        { id: 'f1', name: 'Ground Floor', level: 0, walls: [], openings: [], furniture: [] }
                    ]
                }
            ],
            activeProjectId: 'default-project',
            activeFloorId: 'f1',

            // Project Management
            createProject: (name) => {
                const id = Date.now().toString();
                const newProject = {
                    id,
                    name,
                    lastModified: Date.now(),
                    floors: [{ id: 'f1', name: 'Ground Floor', level: 0, walls: [], openings: [], furniture: [] }]
                };
                set((state) => ({
                    projects: [...state.projects, newProject],
                    activeProjectId: id,
                    activeFloorId: 'f1'
                }));
            },

            selectProject: (id) => {
                const project = get().projects.find(p => p.id === id);
                if (project) {
                    set({
                        activeProjectId: id,
                        activeFloorId: project.floors[0]?.id || null
                    });
                }
            },

            deleteProject: (id) => set((state) => ({
                projects: state.projects.filter(p => p.id !== id),
                activeProjectId: state.activeProjectId === id ? null : state.activeProjectId
            })),

            // Floor Management
            addFloor: (name) => {
                const pid = get().activeProjectId;
                if (!pid) return;
                const fid = `f${Date.now()}`;
                set((state) => ({
                    projects: state.projects.map(p => {
                        if (p.id === pid) {
                            const maxLevel = Math.max(...p.floors.map(f => f.level), -1);
                            return {
                                ...p,
                                floors: [...p.floors, { id: fid, name, level: maxLevel + 1, walls: [], openings: [], furniture: [] }]
                            };
                        }
                        return p;
                    }),
                    activeFloorId: fid
                }));
            },

            selectFloor: (fid) => set({ activeFloorId: fid }),

            // Data Access Helpers (Selectors)
            getActiveProject: () => {
                const state = get();
                return state.projects.find(p => p.id === state.activeProjectId);
            },

            getActiveFloor: () => {
                const project = get().getActiveProject();
                if (!project) return null;
                return project.floors.find(f => f.id === get().activeFloorId);
            },

            // Data Modification (Wall, Opening, Furniture)
            // These will proxy to the active floor of the active project
            updateActiveFloor: (updater) => {
                const pid = get().activeProjectId;
                const fid = get().activeFloorId;
                set((state) => ({
                    projects: state.projects.map(p => {
                        if (p.id === pid) {
                            return {
                                ...p,
                                lastModified: Date.now(),
                                floors: p.floors.map(f => {
                                    if (f.id === fid) {
                                        return updater(f);
                                    }
                                    return f;
                                })
                            };
                        }
                        return p;
                    })
                }));
            }
        }),
        {
            name: 'homevision-projects',
        }
    )
);

export default useProjectStore;
