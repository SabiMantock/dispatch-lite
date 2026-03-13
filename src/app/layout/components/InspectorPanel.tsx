import type { RouteDefinition } from '../routes'
import { LayoutPanel } from './LayoutPanel'

type InspectorPanelProps = {
  route: RouteDefinition
  isOpen: boolean
}

export function InspectorPanel({ route, isOpen }: InspectorPanelProps) {
  return (
    <LayoutPanel className={isOpen ? 'block' : 'hidden'}>
      <div className="border-b border-white/8 pb-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Inspector Panel
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-50">
          Context Details
        </h3>
      </div>

      <div className="mt-5 space-y-4">
        <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Selected View
          </p>
          <p className="mt-2 text-base font-medium text-slate-100">
            {route.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Inspector space reserved for entity details and operational actions
            linked to the active workspace.
          </p>
        </section>

        <section className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
            <span aria-hidden="true">!</span>
            <span>Attention</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-amber-100/85">
            High-priority dispatch alerts and inspection metadata will surface
            here once feature workflows are connected.
          </p>
        </section>

        <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Quick Actions
          </p>
          <div className="mt-4 grid gap-2">
            <button
              type="button"
              className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/[0.06]"
            >
              Open dispatch review
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/[0.06]"
            >
              Inspect route exceptions
            </button>
          </div>
        </section>
      </div>
    </LayoutPanel>
  )
}
