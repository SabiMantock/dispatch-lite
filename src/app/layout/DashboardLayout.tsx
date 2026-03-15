import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import { useUIStore } from "@/stores/uiStore"

export function DashboardLayout() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)

  return (
    <div
      className="grid h-screen transition-[grid-template-columns] duration-200"
      style={{
        gridTemplateColumns: `${collapsed ? "64px" : "220px"} 1fr`,
        gridTemplateRows: "56px 1fr",
        gridTemplateAreas: `"sidebar topbar" "sidebar main"`,
      }}
    >
      <Sidebar />
      <Topbar />
      <main
        className="overflow-y-auto bg-background p-6"
        style={{ gridArea: "main" }}
      >
        <Outlet />
      </main>
    </div>
  )
}
