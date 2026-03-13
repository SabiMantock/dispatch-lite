import { flexRender } from '@tanstack/react-table'
import type { Table } from '@tanstack/react-table'

import { LayoutPanel } from './LayoutPanel'

type WorkspaceRow = {
  item: string
  owner: string
  status: string
  priority: string
}

type WorkspaceQueueTableProps = {
  rowCount: number
  routeLabel: string
  table: Table<WorkspaceRow>
}

export function WorkspaceQueueTable({
  rowCount,
  routeLabel,
  table,
}: WorkspaceQueueTableProps) {
  return (
    <LayoutPanel>
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            TanStack Table
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-50">
            {routeLabel} Queue
          </h4>
        </div>
        <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
          {rowCount} rows
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-slate-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="mt-4 rounded-3xl border border-dashed border-white/8 bg-[#020617]/60 p-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Workspace Notes
        </p>
        <h4 className="mt-3 text-xl font-semibold text-slate-50">
          Shell prepared for {routeLabel.toLowerCase()} workflows
        </h4>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          This keeps the application shell reusable across the jobs, drivers,
          and vehicles pages while preserving the current operational layout.
        </p>
      </article>
    </LayoutPanel>
  )
}
