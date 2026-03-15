import { NavLink } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ROUTES } from "./routes"
import { useUIStore } from "@/stores/uiStore"
import type { Workspace } from "@/stores/uiStore"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const setActiveWorkspace = useUIStore((s) => s.setActiveWorkspace)

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
        collapsed ? "w-16" : "w-[220px]",
      )}
      style={{ gridArea: "sidebar" }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          DL
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-sidebar-foreground">
            DispatchLite
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {ROUTES.map((route) => {
          const Icon = route.icon
          const workspace = route.path.slice(1) as Workspace
          return (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={() => setActiveWorkspace(workspace)}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{route.label}</span>}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
