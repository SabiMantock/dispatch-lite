import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "./EmptyState"
import type { LucideIcon } from "lucide-react"
import { Package } from "lucide-react"

interface DataTableProps<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  isLoading?: boolean
  emptyIcon?: LucideIcon
  emptyTitle?: string
  emptyDescription?: string
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  isLoading,
  emptyIcon = Package,
  emptyTitle = "No data found",
  emptyDescription,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={onRowClick ? "cursor-pointer" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length}>
                <EmptyState
                  icon={emptyIcon}
                  title={emptyTitle}
                  description={emptyDescription}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
