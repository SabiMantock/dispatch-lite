import { Truck, CircleCheck, Wrench } from "lucide-react"
import { StatCard } from "@/shared/components/StatCard"
import type { Vehicle } from "@/types/vehicle"

interface VehicleStatCardsProps {
  vehicles: Vehicle[]
}

export function VehicleStatCards({ vehicles }: VehicleStatCardsProps) {
  const total = vehicles.length
  const available = vehicles.filter((v) => v.status === "available").length
  const maintenance = vehicles.filter((v) => v.status === "maintenance").length

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Truck} value={total} label="Total Vehicles" />
      <StatCard icon={CircleCheck} value={available} label="Available" />
      <StatCard icon={Wrench} value={maintenance} label="In Maintenance" />
    </div>
  )
}
