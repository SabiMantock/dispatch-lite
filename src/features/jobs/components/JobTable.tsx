import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"

import type { Job } from "../../../../types/job"
import { LayoutPanel } from "../../../app/layout/components/LayoutPanel"

type JobTableProps = {
  jobs: Job[]
  selectedJobId: string | null
  onSelectJob: (jobId: string) => void
}

export function JobTable({
  jobs,
  selectedJobId,
  onSelectJob,
}: JobTableProps) {
  const columnHelper = createColumnHelper<Job>()
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: "Job", cell: (info) => info.getValue() }),
      columnHelper.accessor("customer.name", {
        header: "Customer",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper],
  )
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <LayoutPanel>
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Jobs Table
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-50">
            Dispatch Jobs
          </h4>
        </div>
        <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
          {jobs.length} rows
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
              const isSelected = row.original.id === selectedJobId

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectJob(row.original.id)}
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
