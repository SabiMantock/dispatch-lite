import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/shared/components/StatusBadge"
import { PriorityBadge } from "@/shared/components/PriorityBadge"
import { JobActions } from "./JobActions"
import { AssignDriverSelect } from "./AssignDriverSelect"
import type { Job } from "@/types/job"
import type { JobStatus } from "@/types/jobStatus"

interface JobDetailDialogProps {
  job: Job | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssignDriver: (jobId: string, driverId: string) => void
  onUpdateStatus: (jobId: string, status: JobStatus) => void
  isLoading?: boolean
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value || "—"}</dd>
    </div>
  )
}

export function JobDetailDialog({
  job,
  open,
  onOpenChange,
  onAssignDriver,
  onUpdateStatus,
  isLoading,
}: JobDetailDialogProps) {
  const [showAssign, setShowAssign] = useState(false)

  if (!job) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>Job Details</DialogTitle>
            <StatusBadge status={job.status} />
            <PriorityBadge priority={job.priority} />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Customer" value={job.customerName} />
          <Field label="Phone" value={job.customerPhone} />
          <Field label="Pickup" value={job.pickupAddress} />
          <Field label="Dropoff" value={job.dropoffAddress} />
          <Field label="Parcel Type" value={job.parcelType} />
          <Field label="Scheduled Pickup" value={job.scheduledPickupAt} />
          <Field label="Driver ID" value={job.driverId} />
          <Field label="Created" value={new Date(job.createdAt).toLocaleString()} />
        </div>

        {/* Lifecycle timestamps */}
        {Object.entries(job.lifecycle).some(([, v]) => v) && (
          <div className="border-t border-border pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Timeline
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {job.lifecycle.assignedAt && (
                <Field label="Assigned" value={new Date(job.lifecycle.assignedAt).toLocaleString()} />
              )}
              {job.lifecycle.pickedUpAt && (
                <Field label="Picked Up" value={new Date(job.lifecycle.pickedUpAt).toLocaleString()} />
              )}
              {job.lifecycle.inTransitAt && (
                <Field label="In Transit" value={new Date(job.lifecycle.inTransitAt).toLocaleString()} />
              )}
              {job.lifecycle.deliveredAt && (
                <Field label="Delivered" value={new Date(job.lifecycle.deliveredAt).toLocaleString()} />
              )}
              {job.lifecycle.failedAt && (
                <Field label="Failed" value={new Date(job.lifecycle.failedAt).toLocaleString()} />
              )}
              {job.lifecycle.cancelledAt && (
                <Field label="Cancelled" value={new Date(job.lifecycle.cancelledAt).toLocaleString()} />
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          {showAssign ? (
            <AssignDriverSelect
              onAssign={(driverId) => {
                onAssignDriver(job.id, driverId)
                setShowAssign(false)
              }}
              onCancel={() => setShowAssign(false)}
              isLoading={isLoading}
            />
          ) : (
            <JobActions
              job={job}
              onUpdateStatus={(status) => onUpdateStatus(job.id, status)}
              onAssignDriver={() => setShowAssign(true)}
              isLoading={isLoading}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
