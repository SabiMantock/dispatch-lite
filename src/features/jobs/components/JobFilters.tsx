import { StatusFilter } from "@/shared/components/StatusFilter"
import { Input } from "@/components/ui/input"
import { useUIStore } from "@/stores/uiStore"
import { JobStatus } from "@/types/jobStatus"
import { JobPriority } from "@/types/jobPriority"

const STATUS_OPTIONS = Object.entries(JobStatus).map(([key, value]) => ({
  value,
  label: key.replace(/([A-Z])/g, " $1").trim(),
}))

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
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Search</span>
        <Input
          placeholder="Customer name..."
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          className="h-8 w-[180px]"
        />
      </div>
    </>
  )
}
