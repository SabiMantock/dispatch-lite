export const VehicleStatus = {
  Available: "available",
  Assigned: "assigned",
  Maintenance: "maintenance",
  Offline: "offline",
} as const

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus]
