import { StatusFilter } from "@/shared/components/StatusFilter"
import { useUIStore } from "@/stores/uiStore"
import { DriverStatus } from "@/types/driverStatus"

const STATUS_OPTIONS = Object.entries(DriverStatus).map(([key, value]) => ({
  value,
  label: key,
}))

export function DriverFilters() {
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
