import type { Address } from "./address"
import { DriverStatus } from "./driverStatus"

export interface Driver {
  id: string
  name: string
  phone: string
  status: DriverStatus
  currentLocation: Address
  vehicleId?: string
}
