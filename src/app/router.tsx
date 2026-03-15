import { createBrowserRouter, Navigate } from "react-router-dom"
import { DashboardLayout } from "./layout/DashboardLayout"
import { JobsWorkspace } from "@/features/jobs/components/JobsWorkspace"
import { DriversWorkspace } from "@/features/drivers/components/DriversWorkspace"
import { VehiclesWorkspace } from "@/features/vehicles/components/VehiclesWorkspace"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/jobs" replace /> },
      { path: "jobs", element: <JobsWorkspace /> },
      { path: "drivers", element: <DriversWorkspace /> },
      { path: "vehicles", element: <VehiclesWorkspace /> },
    ],
  },
])
