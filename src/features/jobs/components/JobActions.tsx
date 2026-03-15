import { Button } from "@/components/ui/button"
import type { Job } from "@/types/job"
import type { JobStatus } from "@/types/jobStatus"

interface JobActionsProps {
  job: Job
  onUpdateStatus: (status: JobStatus) => void
  onAssignDriver: () => void
  isLoading?: boolean
}

const TERMINAL_STATUSES = new Set(["delivered", "failed", "cancelled"])

export function JobActions({ job, onUpdateStatus, onAssignDriver, isLoading }: JobActionsProps) {
  if (TERMINAL_STATUSES.has(job.status)) return null

  return (
    <div className="flex items-center gap-2">
      {job.status === "pending" && (
        <Button size="sm" onClick={onAssignDriver} disabled={isLoading}>
          Assign Driver
        </Button>
      )}
      {job.status === "assigned" && (
        <Button size="sm" onClick={() => onUpdateStatus("picked_up")} disabled={isLoading}>
          Start Pickup
        </Button>
      )}
      {job.status === "picked_up" && (
        <Button size="sm" onClick={() => onUpdateStatus("in_transit")} disabled={isLoading}>
          Start Transit
        </Button>
      )}
      {job.status === "in_transit" && (
        <>
          <Button size="sm" onClick={() => onUpdateStatus("delivered")} disabled={isLoading}>
            Mark Delivered
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onUpdateStatus("failed")}
            disabled={isLoading}
          >
            Mark Failed
          </Button>
        </>
      )}
      <Button
        size="sm"
        variant="outline"
        onClick={() => onUpdateStatus("cancelled")}
        disabled={isLoading}
      >
        Cancel
      </Button>
    </div>
  )
}
