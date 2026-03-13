import { FilterPanel } from "../../../app/layout/components/FilterPanel"

export function JobFilters() {
  return (
    <FilterPanel
      eyebrow="Job Filters"
      title="Dispatch Jobs"
      note="Use the job controls to focus the active queue by priority and lifecycle state."
    >
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
          Job Status
        </span>
        <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
          <option>All statuses</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>In transit</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Pickup Window
        </span>
        <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
          <option>Current shift</option>
          <option>Next 2 hours</option>
          <option>Today</option>
        </select>
      </label>
    </FilterPanel>
  )
}
