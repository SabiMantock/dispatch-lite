import { useLocation } from "react-router-dom"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ROUTES } from "./routes"
import { useUIStore } from "@/stores/uiStore"

export function Topbar() {
  const { pathname } = useLocation()
  const currentRoute = ROUTES.find((r) => pathname.startsWith(r.path))
  const search = useUIStore((s) => s.filters.search)
  const setFilter = useUIStore((s) => s.setFilter)

  return (
    <header
      className="flex h-14 items-center justify-between border-b border-border bg-background px-6"
      style={{ gridArea: "topbar" }}
    >
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {currentRoute?.label ?? "Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentRoute?.subtitle ?? ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="h-8 w-60 pl-8"
          />
        </div>
        <div className="h-8 w-8 rounded-full bg-muted" />
      </div>
    </header>
  )
}
