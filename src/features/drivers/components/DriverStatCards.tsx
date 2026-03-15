import { Users, UserCheck, UserX } from "lucide-react"
import { StatCard } from "@/shared/components/StatCard"
import type { Driver } from "@/types/driver"

interface DriverStatCardsProps {
  drivers: Driver[]
}

export function DriverStatCards({ drivers }: DriverStatCardsProps) {
  const total = drivers.length
  const available = drivers.filter((d) => d.status === "available").length
  const busy = drivers.filter((d) => d.status === "busy").length

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Users} value={total} label="Total Drivers" />
      <StatCard icon={UserCheck} value={available} label="Available" />
      <StatCard icon={UserX} value={busy} label="Busy" />
    </div>
  )
}
