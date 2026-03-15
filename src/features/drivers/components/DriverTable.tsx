import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal, Users } from "lucide-react"
import { DataTable } from "@/shared/components/DataTable"
import { StatusBadge } from "@/shared/components/StatusBadge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Driver } from "@/types/driver"

const col = createColumnHelper<Driver>()

interface DriverTableProps {
  drivers: Driver[]
  isLoading?: boolean
  onRowClick: (driver: Driver) => void
  onViewDetail: (driver: Driver) => void
}

export function DriverTable({ drivers, isLoading, onRowClick, onViewDetail }: DriverTableProps) {
  const columns = [
    col.accessor("name", {
      header: "Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    col.accessor("phone", {
      header: "Phone",
      cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
    }),
    col.accessor("status", {
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    col.accessor("vehicleId", {
      header: "Vehicle",
      cell: (info) => (
        <span className="text-xs text-muted-foreground font-mono">
          {info.getValue().slice(0, 8)}...
        </span>
      ),
    }),
    col.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-xs" onClick={(e) => e.stopPropagation()} />
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
      data={drivers}
      onRowClick={onRowClick}
      isLoading={isLoading}
      emptyIcon={Users}
      emptyTitle="No drivers found"
      emptyDescription="Try adjusting your filters"
    />
  )
}
