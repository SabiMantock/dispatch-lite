import { useEffect, useMemo, useRef, useState } from "react"
import { useJobs } from "../hooks/useJobs"
import { jobsService } from "../services/jobsServiceInstance"
import { useUIStore } from "@/stores/uiStore"
import { FilterBar } from "@/app/layout/FilterBar"
import { JobStatCards } from "./JobStatCards"
import { JobFilters } from "./JobFilters"
import { JobTable } from "./JobTable"
import { JobDetailDialog } from "./JobDetailDialog"
import type { Job } from "@/types/job"

const ACTIVE_STATUSES = new Set(["pending", "assigned", "picked_up", "in_transit"])
const TERMINAL_STATUSES = new Set(["delivered", "failed", "cancelled"])

export function JobsWorkspace() {
  const { jobs, isLoading, assignDriver, updateJobStatus } = useJobs(jobsService)
  const filters = useUIStore((s) => s.filters)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const filteredJobs = useMemo(() => {
    let result = jobs
    if (filters.status === "active") {
      result = result.filter((j) => ACTIVE_STATUSES.has(j.status))
    } else if (filters.status) {
      result = result.filter((j) => j.status === filters.status)
    }
    if (filters.priority) {
      result = result.filter((j) => j.priority === filters.priority)
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((j) => j.customerName.toLowerCase().includes(q))
    }
    return result
  }, [jobs, filters])

  // Auto-close dialog after terminal status transition
  useEffect(() => {
    if (selectedJob && TERMINAL_STATUSES.has(selectedJob.status)) {
      autoCloseTimer.current = setTimeout(() => {
        setDialogOpen(false)
        setSelectedJob(null)
      }, 1000)
    }
    return () => clearTimeout(autoCloseTimer.current)
  }, [selectedJob?.status])

  const openDetail = (job: Job) => {
    setSelectedJob(job)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <JobStatCards jobs={jobs} />

      <FilterBar>
        <JobFilters />
      </FilterBar>

      <JobTable
        jobs={filteredJobs}
        isLoading={isLoading}
        onRowClick={openDetail}
        onViewDetail={openDetail}
      />

      <JobDetailDialog
        job={selectedJob}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setSelectedJob(null)
        }}
        onAssignDriver={(jobId, driverId) => {
          assignDriver.mutate({ jobId, driverId }, {
            onSuccess: (updated) => setSelectedJob(updated),
          })
        }}
        onUpdateStatus={(jobId, status) => {
          updateJobStatus.mutate({ jobId, status }, {
            onSuccess: (updated) => setSelectedJob(updated),
          })
        }}
        isLoading={assignDriver.isPending || updateJobStatus.isPending}
      />
    </div>
  )
}
