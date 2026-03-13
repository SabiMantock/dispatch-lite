import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"

import type { Driver } from "../../../../types/driver"
import { LayoutPanel } from "../../../app/layout/components/LayoutPanel"

type DriverTableProps = {
  drivers: Driver[]
  selectedDriverId: string | null
  onSelectDriver: (driverId: string) => void
}

export function DriverTable({
  drivers,
  selectedDriverId,
  onSelectDriver,
}: DriverTableProps) {
  const columnHelper = createColumnHelper<Driver>()
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", { header: "Driver", cell: (info) => info.getValue() }),
      columnHelper.accessor("phone", { header: "Phone", cell: (info) => info.getValue() }),
      columnHelper.accessor("status", { header: "Status", cell: (info) => info.getValue() }),
      columnHelper.accessor("vehicleId", { header: "Vehicle", cell: (info) => info.getValue() ?? "None" }),
    ],
    [columnHelper],
  )
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: drivers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <LayoutPanel>
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Drivers Table
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-50">
            Driver Coverage
          </h4>
        </div>
        <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
          {drivers.length} rows
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
              const isSelected = row.original.id === selectedDriverId

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectDriver(row.original.id)}
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
