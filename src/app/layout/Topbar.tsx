type TopbarProps = {
  title: string
  subtitle: string
  isInspectorOpen: boolean
  notificationCount: number
  onToggleInspector: () => void
}

export function Topbar({
  title,
  subtitle,
  isInspectorOpen,
  notificationCount,
  onToggleInspector,
}: TopbarProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/5 bg-[#050b16]/90 px-5 py-4 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Main</span>
          <span>/</span>
          <span className="text-slate-300">{title}</span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
          {title}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-1 text-xs text-slate-400">
          <button
            type="button"
            className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-2 text-slate-200"
          >
            Live
          </button>
          <button type="button" className="rounded-xl px-4 py-2">
            Shift
          </button>
        </div>
        <label className="flex min-w-[260px] items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
          <span aria-hidden="true">?</span>
          <input
            type="search"
            placeholder="Search jobs, drivers, vehicles"
            className="w-full border-0 bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
          />
        </label>
        <button
          type="button"
          className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/10"
        >
          <span className="text-slate-200">Notifications</span>
          <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-medium text-amber-200">
            {notificationCount}
          </span>
        </button>
        <button
          type="button"
          onClick={onToggleInspector}
          className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/15"
        >
          {isInspectorOpen ? 'Hide Inspector' : 'Show Inspector'}
        </button>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          Live Console
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2 text-right">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Operator
          </div>
          <div className="text-sm font-medium text-slate-200">Dispatcher</div>
        </div>
      </div>
    </header>
  )
}
