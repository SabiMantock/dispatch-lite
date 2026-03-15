import { Package, Truck, CheckCircle } from "lucide-react"
import { StatCard } from "@/shared/components/StatCard"
import type { Job } from "@/types/job"

interface JobStatCardsProps {
  jobs: Job[]
}

export function JobStatCards({ jobs }: JobStatCardsProps) {
  const total = jobs.length
  const inTransit = jobs.filter((j) => j.status === "in_transit").length
  const delivered = jobs.filter((j) => j.status === "delivered").length

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Package} value={total} label="Total Jobs" />
      <StatCard icon={Truck} value={inTransit} label="In Transit" />
      <StatCard icon={CheckCircle} value={delivered} label="Delivered" />
    </div>
  )
}
