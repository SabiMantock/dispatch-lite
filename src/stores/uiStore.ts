import { create } from "zustand"

export type Workspace = "jobs" | "drivers" | "vehicles"

interface FilterState {
  status: string | null
  priority: string | null
  search: string
}

interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void

  activeWorkspace: Workspace
  setActiveWorkspace: (ws: Workspace) => void

  selectedEntityId: string | null
  setSelectedEntityId: (id: string | null) => void
  isDetailOpen: boolean
  setDetailOpen: (open: boolean) => void
  openDetail: (id: string) => void
  closeDetail: () => void

  filters: FilterState
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
}

const initialFilters: FilterState = {
  status: null,
  priority: null,
  search: "",
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  activeWorkspace: "jobs",
  setActiveWorkspace: (ws) => set({ activeWorkspace: ws, filters: initialFilters }),

  selectedEntityId: null,
  setSelectedEntityId: (id) => set({ selectedEntityId: id }),
  isDetailOpen: false,
  setDetailOpen: (open) => set({ isDetailOpen: open }),
  openDetail: (id) => set({ selectedEntityId: id, isDetailOpen: true }),
  closeDetail: () => set({ selectedEntityId: null, isDetailOpen: false }),

  filters: initialFilters,
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: () => set({ filters: initialFilters }),
}))
