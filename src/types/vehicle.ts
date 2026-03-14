import type { VehicleStatus } from "./vehicleStatus"

export interface Vehicle {
  id: string
  plateNumber: string
  type: string
  capacity: number
  status: VehicleStatus
  createdAt: string
}
