import { useMemo, useState } from "react"
import { useDrivers } from "../hooks/useDrivers"
import { driversService } from "../services/driversServiceInstance"
import { useUIStore } from "@/stores/uiStore"
import { FilterBar } from "@/app/layout/FilterBar"
import { DriverStatCards } from "./DriverStatCards"
import { DriverFilters } from "./DriverFilters"
import { DriverTable } from "./DriverTable"
import { DriverDetailDialog } from "./DriverDetailDialog"
import type { Driver } from "@/types/driver"

export function DriversWorkspace() {
  const { drivers, isLoading, updateDriverStatus } = useDrivers(driversService)
  const filters = useUIStore((s) => s.filters)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredDrivers = useMemo(() => {
    let result = drivers
    if (filters.status) {
      result = result.filter((d) => d.status === filters.status)
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((d) => d.name.toLowerCase().includes(q))
    }
    return result
  }, [drivers, filters.status, filters.search])

  const openDetail = (driver: Driver) => {
    setSelectedDriver(driver)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <DriverStatCards drivers={drivers} />

      <FilterBar>
        <DriverFilters />
      </FilterBar>

      <DriverTable
        drivers={filteredDrivers}
        isLoading={isLoading}
        onRowClick={openDetail}
        onViewDetail={openDetail}
      />

      <DriverDetailDialog
        driver={selectedDriver}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setSelectedDriver(null)
        }}
        onUpdateStatus={(driverId, status) => {
          updateDriverStatus.mutate({ driverId, status }, {
            onSuccess: (updated) => setSelectedDriver(updated),
          })
        }}
        isLoading={updateDriverStatus.isPending}
      />
    </div>
  )
}
