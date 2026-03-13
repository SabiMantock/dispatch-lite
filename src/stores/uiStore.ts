import { create } from "zustand"

type ActiveWorkspace = "jobs" | "drivers" | "vehicles"

type UIState = {
  activeWorkspace: ActiveWorkspace
  isInspectorOpen: boolean
  selectedEntityId: string | null
  setActiveWorkspace: (workspace: ActiveWorkspace) => void
  setInspectorOpen: (isOpen: boolean) => void
  setSelectedEntityId: (entityId: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeWorkspace: "jobs",
  isInspectorOpen: true,
  selectedEntityId: null,
  setActiveWorkspace: (activeWorkspace) => set({ activeWorkspace }),
  setInspectorOpen: (isInspectorOpen) => set({ isInspectorOpen }),
  setSelectedEntityId: (selectedEntityId) => set({ selectedEntityId }),
}))
