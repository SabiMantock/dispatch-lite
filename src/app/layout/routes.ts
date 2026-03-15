import { Package, Users, Truck, type LucideIcon } from "lucide-react"

export interface RouteDefinition {
  path: string
  label: string
  subtitle: string
  icon: LucideIcon
}

export const ROUTES: RouteDefinition[] = [
  { path: "/jobs", label: "Jobs", subtitle: "Manage delivery tasks", icon: Package },
  { path: "/drivers", label: "Drivers", subtitle: "Monitor driver activity", icon: Users },
  { path: "/vehicles", label: "Vehicles", subtitle: "Track fleet status", icon: Truck },
]
