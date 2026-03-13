import type { Vehicle } from "../../../../types/vehicle"

type VehicleInspectorProps = {
  vehicle: Vehicle | null
}

export function VehicleInspector({ vehicle }: VehicleInspectorProps) {
  if (!vehicle) {
    return (
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-sm text-slate-400">
          Select a vehicle row to inspect status, capacity, and assignment.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Vehicle</p>
        <p className="mt-2 text-base font-medium text-slate-100">
          {vehicle.plateNumber}
        </p>
        <p className="mt-2 text-sm text-slate-400">{vehicle.type}</p>
      </section>
      <section className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
        <p className="mt-2 text-sm text-slate-200">{vehicle.status}</p>
        <p className="mt-2 text-sm text-slate-400">
          Capacity: {vehicle.capacity} kg
        </p>
      </section>
    </>
  )
}
