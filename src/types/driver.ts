import type { DriverStatus } from "./driverStatus"

export interface GeoPoint {
  lat: number
  lng: number
}

export interface Driver {
  id: string
  name: string
  phone: string
  status: DriverStatus
  vehicleId: string
  location: GeoPoint | null
  createdAt: string
}
