import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"

import type { Vehicle } from "../../../../types/vehicle"
import { LayoutPanel } from "../../../app/layout/components/LayoutPanel"

type VehicleTableProps = {
  vehicles: Vehicle[]
  selectedVehicleId: string | null
  onSelectVehicle: (vehicleId: string) => void
}

export function VehicleTable({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}: VehicleTableProps) {
  const columnHelper = createColumnHelper<Vehicle>()
  const columns = useMemo(
    () => [
      columnHelper.accessor("plateNumber", { header: "Plate", cell: (info) => info.getValue() }),
      columnHelper.accessor("type", { header: "Type", cell: (info) => info.getValue() }),
      columnHelper.accessor("capacity", { header: "Capacity", cell: (info) => `${info.getValue()} kg` }),
      columnHelper.accessor("status", { header: "Status", cell: (info) => info.getValue() }),
    ],
    [columnHelper],
  )
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: vehicles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <LayoutPanel>
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Vehicles Table
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-50">
            Fleet Visibility
          </h4>
        </div>
        <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
          {vehicles.length} rows
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-3xl border border-white/8">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/[0.03] text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-white/8 bg-[#09111d]">
            {table.getRowModel().rows.map((row) => {
              const isSelected = row.original.id === selectedVehicleId

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectVehicle(row.original.id)}
                  className={`cursor-pointer text-slate-200 transition hover:bg-white/[0.03] ${
                    isSelected ? "bg-cyan-400/10" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </LayoutPanel>
  )
}
