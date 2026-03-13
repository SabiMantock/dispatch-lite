import { LayoutPanel } from './LayoutPanel'

export function FilterPanel() {
  return (
    <LayoutPanel>
      <div className="border-b border-white/8 pb-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Filter Panel
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-50">
          Dispatch Filters
        </h3>
      </div>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Priority
          </span>
          <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
            <option>All priorities</option>
            <option>High priority</option>
            <option>Medium priority</option>
            <option>Low priority</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Operational State
          </span>
          <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
            <option>All states</option>
            <option>Ready</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Coverage Window
          </span>
          <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
            <option>Current shift</option>
            <option>Next 2 hours</option>
            <option>Today</option>
          </select>
        </label>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100/90">
          Filters are staged in the shell so route-specific data views can plug
          into a dedicated control surface.
        </div>
      </div>
    </LayoutPanel>
  )
}
