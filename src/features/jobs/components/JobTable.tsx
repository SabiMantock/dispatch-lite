import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Package } from "lucide-react"
import { DataTable } from "@/shared/components/DataTable"
import { StatusBadge } from "@/shared/components/StatusBadge"
import { PriorityBadge } from "@/shared/components/PriorityBadge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Job } from "@/types/job"
import { cn } from "@/lib/utils"

const col = createColumnHelper<Job>()

const PRIORITY_ORDER: Record<string, number> = { high: 3, medium: 2, low: 1 }

const INITIAL_SORTING = [
  { id: "priority", desc: true },
]

function truncate(str: string, len = 30) {
  return str.length > len ? str.slice(0, len) + "..." : str
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

interface JobTableProps {
  jobs: Job[]
  isLoading?: boolean
  onRowClick: (job: Job) => void
  onViewDetail: (job: Job) => void
}

export function JobTable({ jobs, isLoading, onRowClick, onViewDetail }: JobTableProps) {
  const columns = [
    col.accessor("customerName", {
      header: "Customer",
      cell: (info) => (
        <div>
          <div className="font-medium">{info.getValue()}</div>
          <div className="text-xs text-muted-foreground">{info.row.original.customerPhone}</div>
        </div>
      ),
    }),
    col.accessor("pickupAddress", {
      header: "Pickup",
      cell: (info) => (
        <span className="text-muted-foreground">{truncate(info.getValue())}</span>
      ),
    }),
    col.accessor("dropoffAddress", {
      header: "Dropoff",
      cell: (info) => (
        <span className="text-muted-foreground">{truncate(info.getValue())}</span>
      ),
    }),
    col.accessor("parcelType", {
      header: "Parcel",
    }),
    col.accessor("priority", {
      header: "Priority",
      cell: (info) => <PriorityBadge priority={info.getValue()} />,
      sortingFn: (a, b) =>
        (PRIORITY_ORDER[a.original.priority] ?? 0) - (PRIORITY_ORDER[b.original.priority] ?? 0),
    }),
    col.accessor("status", {
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    col.accessor("createdAt", {
      header: "Created",
      cell: (info) => (
        <span className="text-muted-foreground">{timeAgo(info.getValue())}</span>
      ),
    }),
    col.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={(e) => e.stopPropagation()}
              />
            }
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetail(info.row.original)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ]

  return (
    <DataTable
      columns={columns}
      data={jobs}
      onRowClick={onRowClick}
      isLoading={isLoading}
      initialSorting={INITIAL_SORTING}
      emptyIcon={Package}
      emptyTitle="No jobs found"
      emptyDescription="Try adjusting your filters"
    />
  )
}

export function jobRowClassName(job: Job) {
  return cn(job.priority === "high" && "border-l-2 border-red-500/50")
}
