import { useMemo, useState } from "react"
import { useVehicles } from "../hooks/useVehicles"
import { vehiclesService } from "../services/vehiclesServiceInstance"
import { useUIStore } from "@/stores/uiStore"
import { FilterBar } from "@/app/layout/FilterBar"
import { VehicleStatCards } from "./VehicleStatCards"
import { VehicleFilters } from "./VehicleFilters"
import { VehicleTable } from "./VehicleTable"
import { VehicleDetailDialog } from "./VehicleDetailDialog"
import type { Vehicle } from "@/types/vehicle"

export function VehiclesWorkspace() {
  const { vehicles, isLoading, updateVehicleStatus } = useVehicles(vehiclesService)
  const filters = useUIStore((s) => s.filters)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredVehicles = useMemo(() => {
    if (!filters.status) return vehicles
    return vehicles.filter((v) => v.status === filters.status)
  }, [vehicles, filters.status])

  const openDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <VehicleStatCards vehicles={vehicles} />

      <FilterBar>
        <VehicleFilters />
      </FilterBar>

      <VehicleTable
        vehicles={filteredVehicles}
        isLoading={isLoading}
        onRowClick={openDetail}
        onViewDetail={openDetail}
      />

      <VehicleDetailDialog
        vehicle={selectedVehicle}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setSelectedVehicle(null)
        }}
        onUpdateStatus={(vehicleId, status) => {
          updateVehicleStatus.mutate({ vehicleId, status }, {
            onSuccess: (updated) => setSelectedVehicle(updated),
          })
        }}
        isLoading={updateVehicleStatus.isPending}
      />
    </div>
  )
}
