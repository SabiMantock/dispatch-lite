import { VehicleStatus } from "./vehicleStatus"

export interface Vehicle {
  id: string
  plateNumber: string
  type: string
  capacity: number
  driverId: string
  status: VehicleStatus
}
