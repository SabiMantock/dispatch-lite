import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useDrivers } from "@/features/drivers/hooks/useDrivers"
import { driversService } from "@/features/drivers/services/driversServiceInstance"
import { useState } from "react"

interface AssignDriverSelectProps {
  onAssign: (driverId: string) => void
  onCancel: () => void
  isLoading?: boolean
}

export function AssignDriverSelect({ onAssign, onCancel, isLoading }: AssignDriverSelectProps) {
  const { drivers } = useDrivers(driversService)
  const availableDrivers = drivers.filter((d) => d.status === "available")
  const [selectedDriverId, setSelectedDriverId] = useState<string>("")

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedDriverId} onValueChange={(v) => setSelectedDriverId(v ?? "")}>
        <SelectTrigger className="h-8 w-[200px]">
          <SelectValue placeholder="Select a driver" />
        </SelectTrigger>
        <SelectContent>
          {availableDrivers.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No available drivers
            </div>
          ) : (
            availableDrivers.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      <Button
        size="sm"
        onClick={() => onAssign(selectedDriverId)}
        disabled={!selectedDriverId || isLoading}
      >
        Assign
      </Button>
      <Button size="sm" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  )
}
