import { create } from 'zustand'

const useUIStore = create((set) => ({
    activeMode: 'floorplan', // 'floorplan' | '3d' | 'catalog' | 'ai' | 'vr'
    sidebarOpen: true,
    loading: false,
    error: null,

    setActiveMode: (mode) => set({ activeMode: mode }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}))

export default useUIStore
