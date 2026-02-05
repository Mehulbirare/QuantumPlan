import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useFloorPlanStore from './floorPlanStore'

const useFurnitureStore = create(
    persist(
        (set, get) => ({
            placedFurniture: [],
            selectedId: null,

            setSelectedId: (id) => set({ selectedId: id }),

            addFurniture: (item) => {
                const floorPlan = useFloorPlanStore.getState();
                const newItem = {
                    ...item,
                    id: Date.now().toString(),
                    floorId: floorPlan.activeFloorId,
                    projectId: floorPlan.activeProjectId
                };
                set((state) => ({
                    placedFurniture: [...state.placedFurniture, newItem]
                }));
            },

            removeFurniture: (id) => set((state) => ({
                placedFurniture: state.placedFurniture.filter(item => item.id !== id)
            })),

            updateFurniture: (id, updates) => set((state) => ({
                placedFurniture: state.placedFurniture.map(item =>
                    item.id === id ? { ...item, ...updates } : item
                )
            })),

            clearFurniture: () => {
                const floorPlan = useFloorPlanStore.getState();
                set((state) => ({
                    placedFurniture: state.placedFurniture.filter(f => f.floorId !== floorPlan.activeFloorId)
                }));
            },

            // Filtered view helper
            getFurnitureForActiveFloor: () => {
                const floorPlan = useFloorPlanStore.getState();
                return get().placedFurniture.filter(f =>
                    f.floorId === floorPlan.activeFloorId && f.projectId === floorPlan.activeProjectId
                );
            }
        }),
        { name: 'homevision-furniture' }
    )
);

export default useFurnitureStore
