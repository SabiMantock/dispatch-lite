import { StatusFilter } from "@/shared/components/StatusFilter"
import { useUIStore } from "@/stores/uiStore"
import { VehicleStatus } from "@/types/vehicleStatus"

const STATUS_OPTIONS = Object.entries(VehicleStatus).map(([key, value]) => ({
  value,
  label: key,
}))

export function VehicleFilters() {
  const filters = useUIStore((s) => s.filters)
  const setFilter = useUIStore((s) => s.setFilter)

  return (
    <StatusFilter
      label="Status"
      value={filters.status}
      onChange={(v) => setFilter("status", v)}
      options={STATUS_OPTIONS}
    />
  )
}
