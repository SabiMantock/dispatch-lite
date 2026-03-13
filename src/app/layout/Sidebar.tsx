import { NavLink } from 'react-router-dom'

type SidebarRoute = {
  path: string
  label: string
  description: string
}

type SidebarProps = {
  routes: SidebarRoute[]
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({
  routes,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside className="flex h-full flex-col border-r border-white/5 bg-[#050b16]">
      <div className="border-b border-white/5 px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
              DL
            </div>
            {!isCollapsed ? (
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  DispatchLite
                </p>
                <p className="mt-1 text-xs text-slate-500">Control Surface</p>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10"
          >
            {isCollapsed ? '>' : '<'}
          </button>
        </div>
        {!isCollapsed ? (
          <>
            <h1 className="mt-5 text-xl font-semibold text-slate-50">
              Operations Console
            </h1>
            <p className="mt-2 max-w-[15rem] text-sm leading-6 text-slate-400">
              Operational shell for routing jobs, drivers, and vehicles.
            </p>
          </>
        ) : null}
      </div>

      <nav className="flex-1 px-3 py-5">
        {!isCollapsed ? (
          <p className="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-600">
            Main
          </p>
        ) : null}
        <ul className="mt-3 space-y-2">
          {routes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `block rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? 'border-cyan-400/30 bg-[linear-gradient(90deg,rgba(34,211,238,0.18),rgba(34,211,238,0.05))] text-slate-50 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.14)]'
                      : 'border-transparent bg-transparent text-slate-400 hover:border-white/8 hover:bg-white/[0.03] hover:text-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-cyan-400/15 text-cyan-300'
                          : 'bg-white/[0.04] text-slate-500'
                      }`}
                    >
                      {route.label.slice(0, 1)}
                    </div>
                    <div className={isCollapsed ? 'hidden' : 'block'}>
                      <div className="text-sm font-medium">{route.label}</div>
                    {!isCollapsed ? (
                      <div className="mt-1 text-xs text-slate-400">
                        {route.description}
                      </div>
                    ) : null}
                    </div>
                    {isActive ? <span className="sr-only">(current)</span> : null}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/5 px-4 py-4">
        {!isCollapsed ? (
          <>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-600">
                Shift Status
              </p>
              <p className="mt-2 text-sm font-medium text-slate-200">
                Dispatch coverage active
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Queue stable, alerts monitored, inspector tools available.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center text-xs text-slate-500">Live</div>
        )}
      </div>
    </aside>
  )
}
