import type { Driver } from "../../../../types/driver"

type DriverInspectorProps = {
  driver: Driver | null
}

export function DriverInspector({ driver }: DriverInspectorProps) {
  if (!driver) {
    return (
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-sm text-slate-400">
          Select a driver row to inspect status, coverage, and vehicle assignment.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Driver</p>
        <p className="mt-2 text-base font-medium text-slate-100">{driver.name}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">{driver.phone}</p>
      </section>
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
        <p className="mt-2 text-sm text-slate-200">{driver.status}</p>
        <p className="mt-2 text-sm text-slate-400">
          Vehicle: {driver.vehicleId ?? "Unassigned"}
        </p>
      </section>
    </>
  )
}
