import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal, Truck } from "lucide-react"
import { DataTable } from "@/shared/components/DataTable"
import { StatusBadge } from "@/shared/components/StatusBadge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Vehicle } from "@/types/vehicle"

const col = createColumnHelper<Vehicle>()

interface VehicleTableProps {
  vehicles: Vehicle[]
  isLoading?: boolean
  onRowClick: (vehicle: Vehicle) => void
  onViewDetail: (vehicle: Vehicle) => void
}

export function VehicleTable({ vehicles, isLoading, onRowClick, onViewDetail }: VehicleTableProps) {
  const columns = [
    col.accessor("plateNumber", {
      header: "Plate Number",
      cell: (info) => <span className="font-medium font-mono">{info.getValue()}</span>,
    }),
    col.accessor("type", {
      header: "Type",
    }),
    col.accessor("capacity", {
      header: "Capacity",
      cell: (info) => <span className="text-muted-foreground">{info.getValue()} kg</span>,
    }),
    col.accessor("status", {
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue()} />,
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
      data={vehicles}
      onRowClick={onRowClick}
      isLoading={isLoading}
      emptyIcon={Truck}
      emptyTitle="No vehicles found"
      emptyDescription="Try adjusting your filters"
    />
  )
}
