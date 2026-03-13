import type { Driver } from "../../../../types/driver"
import { DriverStatus } from "../../../../types/driverStatus"

export interface DriversApi {
  list(): Promise<Driver[]>
  getById(id: string): Promise<Driver | null>
  create(driver: Driver): Promise<Driver>
  update(id: string, updates: Partial<Driver>): Promise<Driver>
}

export type CreateDriverInput = Driver

export interface DriversService {
  listDrivers(): Promise<Driver[]>
  getDriverById(id: string): Promise<Driver | null>
  createDriver(input: CreateDriverInput): Promise<Driver>
  updateDriverStatus(id: string, status: DriverStatus): Promise<Driver>
  updateDriverLocation(id: string, currentLocation: Driver["currentLocation"]): Promise<Driver>
}

export function createDriversService(api: DriversApi): DriversService {
  return {
    listDrivers() {
      return api.list()
    },

    getDriverById(id) {
      return api.getById(id)
    },

    createDriver(input) {
      validateDriver(input)
      return api.create(input)
    },

    async updateDriverStatus(id, status) {
      await requireDriver(api, id)
      return api.update(id, { status })
    },

    async updateDriverLocation(id, currentLocation) {
      await requireDriver(api, id)
      validateCoordinates(currentLocation.lat, currentLocation.lng)
      return api.update(id, { currentLocation })
    },
  }
}

async function requireDriver(api: DriversApi, driverId: string): Promise<Driver> {
  const driver = await api.getById(driverId)

  if (!driver) {
    throw new Error(`Driver not found: ${driverId}`)
  }

  return driver
}

function validateDriver(driver: Driver) {
  if (!driver.name.trim()) {
    throw new Error("Driver name is required")
  }

  if (!driver.phone.trim()) {
    throw new Error("Driver phone is required")
  }

  if (!driver.currentLocation.line1.trim()) {
    throw new Error("Driver current location line1 is required")
  }

  validateCoordinates(driver.currentLocation.lat, driver.currentLocation.lng)
}

function validateCoordinates(lat: number, lng: number) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error("Driver coordinates are required")
  }
}
