import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/shared/components/StatusBadge"
import type { Driver } from "@/types/driver"
import type { DriverStatus } from "@/types/driverStatus"

interface DriverDetailDialogProps {
  driver: Driver | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateStatus: (driverId: string, status: DriverStatus) => void
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

export function DriverDetailDialog({
  driver,
  open,
  onOpenChange,
  onUpdateStatus,
  isLoading,
}: DriverDetailDialogProps) {
  if (!driver) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>Driver Details</DialogTitle>
            <StatusBadge status={driver.status} />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name" value={driver.name} />
          <Field label="Phone" value={driver.phone} />
          <Field label="Vehicle ID" value={driver.vehicleId} />
          <Field
            label="Location"
            value={
              driver.location
                ? `${driver.location.lat.toFixed(4)}, ${driver.location.lng.toFixed(4)}`
                : null
            }
          />
          <Field label="Created" value={new Date(driver.createdAt).toLocaleString()} />
        </div>

        <DialogFooter>
          <div className="flex items-center gap-2">
            {(["available", "busy", "offline"] as const).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={driver.status === status ? "default" : "outline"}
                onClick={() => onUpdateStatus(driver.id, status)}
                disabled={driver.status === status || isLoading}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
