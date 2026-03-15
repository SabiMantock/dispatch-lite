import { useLocation } from "react-router-dom"
import { ROUTES } from "./routes"

export function Topbar() {
  const { pathname } = useLocation()
  const currentRoute = ROUTES.find((r) => pathname.startsWith(r.path))

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

      {/* Right side — user avatar placeholder */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted" />
      </div>
    </header>
  )
}
