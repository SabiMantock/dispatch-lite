import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { DailySummaryPanel } from './components/DailySummaryPanel'
import { FilterPanel } from './components/FilterPanel'
import { InspectorPanel } from './components/InspectorPanel'
import { WorkspaceOverview } from './components/WorkspaceOverview'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import type { RouteDefinition } from './routes'
import { routes } from './routes'
import { DriverInspector } from '../../features/drivers/components/DriverInspector'
import { DriverTable } from '../../features/drivers/components/DriverTable'
import { useDrivers } from '../../features/drivers/hooks/useDrivers'
import { driversService } from '../../features/drivers/services/driversServiceInstance'
import { JobFilters } from '../../features/jobs/components/JobFilters'
import { JobInspector } from '../../features/jobs/components/JobInspector'
import { JobTable } from '../../features/jobs/components/JobTable'
import { useJobs } from '../../features/jobs/hooks/useJobs'
import { jobsService } from '../../features/jobs/services/jobsServiceInstance'
import { VehicleInspector } from '../../features/vehicles/components/VehicleInspector'
import { VehicleTable } from '../../features/vehicles/components/VehicleTable'
import { useVehicles } from '../../features/vehicles/hooks/useVehicles'
import { vehiclesService } from '../../features/vehicles/services/vehiclesServiceInstance'
import { useUIStore } from '../../stores/uiStore'

type DashboardLayoutProps = {
  route: RouteDefinition
}

const donutSegments = [
  { label: 'Focus on work', value: '51%', color: '#fb923c' },
  { label: 'Meeting time', value: '29%', color: '#84cc16' },
  { label: 'Breaks', value: '20%', color: '#22d3ee' },
]

export function DashboardLayout({ route }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const activeWorkspace = useUIStore((state) => state.activeWorkspace)
  const isInspectorOpen = useUIStore((state) => state.isInspectorOpen)
  const openInspectorForEntity = useUIStore((state) => state.openInspectorForEntity)
  const selectedEntityId = useUIStore((state) => state.selectedEntityId)
  const setActiveWorkspace = useUIStore((state) => state.setActiveWorkspace)
  const setInspectorOpen = useUIStore((state) => state.setInspectorOpen)
  const setSelectedEntityId = useUIStore((state) => state.setSelectedEntityId)

  const jobsQuery = useJobs(jobsService)
  const driversQuery = useDrivers(driversService)
  const vehiclesQuery = useVehicles(vehiclesService)

  useEffect(() => {
    const workspace = route.path.replace("/", "") as "jobs" | "drivers" | "vehicles"
    setActiveWorkspace(workspace)
    setSelectedEntityId(null)
  }, [route.path, setActiveWorkspace, setSelectedEntityId])

  const selectedJob =
    jobsQuery.jobs.find((job) => job.id === selectedEntityId) ?? null
  const selectedDriver =
    driversQuery.drivers.find((driver) => driver.id === selectedEntityId) ?? null
  const selectedVehicle =
    vehiclesQuery.vehicles.find((vehicle) => vehicle.id === selectedEntityId) ?? null

  const workspaceCards = useMemo(() => {
    if (activeWorkspace === "drivers") {
      return [
        {
          label: "Active Drivers",
          value: String(driversQuery.drivers.length).padStart(2, "0"),
          detail: "Drivers available across the current operational shift.",
        },
        {
          label: "Busy Coverage",
          value: String(
            driversQuery.drivers.filter((driver) => driver.status === "busy").length,
          ).padStart(2, "0"),
          detail: "Drivers actively handling assignments right now.",
        },
        {
          label: "Offline",
          value: String(
            driversQuery.drivers.filter((driver) => driver.status === "offline").length,
          ).padStart(2, "0"),
          detail: "Drivers currently unavailable for dispatch handoff.",
        },
      ]
    }

    if (activeWorkspace === "vehicles") {
      return [
        {
          label: "Fleet Visible",
          value: String(vehiclesQuery.vehicles.length).padStart(2, "0"),
          detail: "Vehicles visible to the dispatch console.",
        },
        {
          label: "Assigned Fleet",
          value: String(
            vehiclesQuery.vehicles.filter((vehicle) => vehicle.status === "assigned").length,
          ).padStart(2, "0"),
          detail: "Fleet units currently covering active work.",
        },
        {
          label: "Maintenance",
          value: String(
            vehiclesQuery.vehicles.filter((vehicle) => vehicle.status === "maintenance").length,
          ).padStart(2, "0"),
          detail: "Vehicles blocked for maintenance-sensitive checks.",
        },
      ]
    }

    return [
      {
        label: 'Active Queue',
        value: String(jobsQuery.jobs.length).padStart(2, "0"),
        detail: 'Jobs awaiting assignment and dispatch review.',
      },
      {
        label: 'Assigned Jobs',
        value: String(
          jobsQuery.jobs.filter((job) => job.status === "assigned").length,
        ).padStart(2, "0"),
        detail: 'Jobs currently allocated to active drivers.',
      },
      {
        label: 'High Priority',
        value: String(
          jobsQuery.jobs.filter((job) => job.priority === "high").length,
        ).padStart(2, "0"),
        detail: 'Priority jobs requiring immediate dispatcher attention.',
      },
    ]
  }, [activeWorkspace, driversQuery.drivers, jobsQuery.jobs, vehiclesQuery.vehicles])

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
            onToggleInspector={() => setInspectorOpen(!isInspectorOpen)}
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
                {activeWorkspace === "jobs" ? (
                  <JobFilters />
                ) : (
                  <FilterPanel
                    eyebrow={`${route.label} Filters`}
                    title={route.label}
                    note={`Filter controls for the ${route.label.toLowerCase()} workspace are prepared for route-specific workflows.`}
                  >
                    <label className="block">
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Operational State
                      </span>
                      <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
                        <option>All states</option>
                        <option>Available</option>
                        <option>Assigned</option>
                        <option>Offline</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Coverage
                      </span>
                      <select className="dashboard-select mt-2 w-full rounded-2xl border border-white/8 px-4 py-3 pr-10 text-sm text-slate-100 outline-none">
                        <option>Current shift</option>
                        <option>Assigned only</option>
                        <option>Needs attention</option>
                      </select>
                    </label>
                  </FilterPanel>
                )}

                {activeWorkspace === "jobs" ? (
                  <JobTable
                    jobs={jobsQuery.jobs}
                    selectedJobId={selectedEntityId}
                    onSelectJob={openInspectorForEntity}
                  />
                ) : null}
                {activeWorkspace === "drivers" ? (
                  <DriverTable
                    drivers={driversQuery.drivers}
                    selectedDriverId={selectedEntityId}
                    onSelectDriver={openInspectorForEntity}
                  />
                ) : null}
                {activeWorkspace === "vehicles" ? (
                  <VehicleTable
                    vehicles={vehiclesQuery.vehicles}
                    selectedVehicleId={selectedEntityId}
                    onSelectVehicle={openInspectorForEntity}
                  />
                ) : null}
              </div>
            </section>

            <InspectorPanel
              title={`${route.label} Inspector`}
              isOpen={isInspectorOpen}
            >
              {activeWorkspace === "jobs" ? <JobInspector job={selectedJob} /> : null}
              {activeWorkspace === "drivers" ? (
                <DriverInspector driver={selectedDriver} />
              ) : null}
              {activeWorkspace === "vehicles" ? (
                <VehicleInspector vehicle={selectedVehicle} />
              ) : null}
            </InspectorPanel>
          </main>
        </div>
      </div>
    </div>
  )
}
