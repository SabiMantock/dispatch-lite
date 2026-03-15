import { StatusFilter } from "@/shared/components/StatusFilter"
import { useUIStore } from "@/stores/uiStore"
import { JobStatus } from "@/types/jobStatus"
import { JobPriority } from "@/types/jobPriority"

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  ...Object.entries(JobStatus).map(([key, value]) => ({
    value,
    label: key.replace(/([A-Z])/g, " $1").trim(),
  })),
]

const PRIORITY_OPTIONS = Object.entries(JobPriority).map(([key, value]) => ({
  value,
  label: key,
}))

export function JobFilters() {
  const filters = useUIStore((s) => s.filters)
  const setFilter = useUIStore((s) => s.setFilter)

  return (
    <>
      <StatusFilter
        label="Status"
        value={filters.status}
        onChange={(v) => setFilter("status", v)}
        options={STATUS_OPTIONS}
      />
      <StatusFilter
        label="Priority"
        value={filters.priority}
        onChange={(v) => setFilter("priority", v)}
        options={PRIORITY_OPTIONS}
      />
    </>
  )
}
