import type { Job } from "../../../../types/job"

type JobInspectorProps = {
  job: Job | null
}

export function JobInspector({ job }: JobInspectorProps) {
  if (!job) {
    return (
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-sm text-slate-400">
          Select a job row to inspect customer, route, and lifecycle details.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Job</p>
        <p className="mt-2 text-base font-medium text-slate-100">{job.id}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {job.customer.name} · {job.customer.phone}
        </p>
      </section>
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Route</p>
        <p className="mt-2 text-sm text-slate-200">{job.pickupAddress.line1}</p>
        <p className="mt-1 text-sm text-slate-200">{job.dropoffAddress.line1}</p>
        <p className="mt-3 text-sm text-slate-400">
          {job.status} · {job.priority} priority
        </p>
      </section>
    </>
  )
}
