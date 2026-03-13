import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { DailySummaryPanel } from './components/DailySummaryPanel'
import { FilterPanel } from './components/FilterPanel'
import { InspectorPanel } from './components/InspectorPanel'
import { WorkspaceOverview } from './components/WorkspaceOverview'
import { WorkspaceQueueTable } from './components/WorkspaceQueueTable'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import type { RouteDefinition } from './routes'
import { routes } from './routes'

type DashboardLayoutProps = {
  route: RouteDefinition
}

const workspaceCards = [
  {
    label: 'Active Queue',
    value: '24',
    detail: 'Jobs awaiting assignment and dispatch review.',
  },
  {
    label: 'Driver Readiness',
    value: '18',
    detail: 'Available drivers ready to receive work.',
  },
  {
    label: 'Fleet Visibility',
    value: '09',
    detail: 'Vehicles tracked in the live operations pool.',
  },
]

const donutSegments = [
  { label: 'Focus on work', value: '51%', color: '#fb923c' },
  { label: 'Meeting time', value: '29%', color: '#84cc16' },
  { label: 'Breaks', value: '20%', color: '#22d3ee' },
]

type WorkspaceRow = {
  item: string
  owner: string
  status: string
  priority: string
}

const routeRows: Record<string, WorkspaceRow[]> = {
  '/jobs': [
    { item: 'J-1042 pickup window', owner: 'Priya', status: 'Assigned', priority: 'High' },
    { item: 'J-1048 address check', owner: 'Mason', status: 'Pending', priority: 'Medium' },
    { item: 'J-1051 customer callback', owner: 'Ava', status: 'Escalated', priority: 'High' },
  ],
  '/drivers': [
    { item: 'Driver readiness sweep', owner: 'Dispatch', status: 'Live', priority: 'Medium' },
    { item: 'Offline status review', owner: 'Support', status: 'Pending', priority: 'Low' },
    { item: 'Coverage gap handoff', owner: 'Control', status: 'Action', priority: 'High' },
  ],
  '/vehicles': [
    { item: 'Van 12 availability', owner: 'Fleet Desk', status: 'Ready', priority: 'Medium' },
    { item: 'Truck 04 maintenance', owner: 'Workshop', status: 'Blocked', priority: 'High' },
    { item: 'Bike 07 battery swap', owner: 'Support', status: 'Queued', priority: 'Low' },
  ],
}

export function DashboardLayout({ route }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isInspectorOpen, setIsInspectorOpen] = useState(true)
  const columnHelper = createColumnHelper<WorkspaceRow>()
  const data = routeRows[route.path] ?? routeRows['/jobs']
  const columns = useMemo(
    () => [
      columnHelper.accessor('item', {
        header: 'Item',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('owner', {
        header: 'Owner',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('priority', {
        header: 'Priority',
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper],
  )
  // TanStack Table manages its own internal memoization model.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div
        className={`grid min-h-screen grid-cols-1 ${
          isSidebarCollapsed
            ? 'lg:grid-cols-[112px_minmax(0,1fr)]'
            : 'lg:grid-cols-[272px_minmax(0,1fr)]'
        }`}
      >
        <Sidebar
          routes={routes}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((value) => !value)}
        />

        <div className="grid min-h-screen grid-rows-[auto_1fr] bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.05),transparent_28%),linear-gradient(180deg,rgba(8,15,28,0.96),rgba(2,6,23,1))]">
          <Topbar
            title={route.title}
            subtitle={route.subtitle}
            isInspectorOpen={isInspectorOpen}
            notificationCount={3}
            onToggleInspector={() => setIsInspectorOpen((value) => !value)}
          />

          <main
            className={`grid gap-4 p-5 ${
              isInspectorOpen
                ? 'xl:grid-cols-[minmax(0,1fr)_320px]'
                : 'xl:grid-cols-[minmax(0,1fr)]'
            }`}
          >
            <section className="grid gap-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
                <WorkspaceOverview cards={workspaceCards} />
                <DailySummaryPanel segments={donutSegments} />
              </div>

              <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
                <FilterPanel />
                <WorkspaceQueueTable
                  rowCount={data.length}
                  routeLabel={route.label}
                  table={table}
                />
              </div>
            </section>

            <InspectorPanel route={route} isOpen={isInspectorOpen} />
          </main>
        </div>
      </div>
    </div>
  )
}
