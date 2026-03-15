import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/shared/components/StatusBadge"
import type { Vehicle } from "@/types/vehicle"
import type { VehicleStatus } from "@/types/vehicleStatus"

interface VehicleDetailDialogProps {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateStatus: (vehicleId: string, status: VehicleStatus) => void
  isLoading?: boolean
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value ?? "—"}</dd>
    </div>
  )
}

export function VehicleDetailDialog({
  vehicle,
  open,
  onOpenChange,
  onUpdateStatus,
  isLoading,
}: VehicleDetailDialogProps) {
  if (!vehicle) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>Vehicle Details</DialogTitle>
            <StatusBadge status={vehicle.status} />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Plate Number" value={vehicle.plateNumber} />
          <Field label="Type" value={vehicle.type} />
          <Field label="Capacity" value={`${vehicle.capacity} kg`} />
          <Field label="Created" value={new Date(vehicle.createdAt).toLocaleString()} />
        </div>

        <DialogFooter>
          <div className="flex items-center gap-2">
            {(["available", "assigned", "maintenance", "offline"] as const).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={vehicle.status === status ? "default" : "outline"}
                onClick={() => onUpdateStatus(vehicle.id, status)}
                disabled={vehicle.status === status || isLoading}
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
