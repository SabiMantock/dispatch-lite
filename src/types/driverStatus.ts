export const DriverStatus = {
  Available: "available",
  Busy: "busy",
  Offline: "offline",
} as const

export type DriverStatus = (typeof DriverStatus)[keyof typeof DriverStatus]
