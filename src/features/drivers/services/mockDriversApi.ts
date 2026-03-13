import type { Driver } from "../../../../types/driver"
import { DriverStatus } from "../../../../types/driverStatus"

const drivers: Driver[] = [
  {
    id: "driver-01",
    name: "Priya Shah",
    phone: "+44 7700 100001",
    status: DriverStatus.Busy,
    currentLocation: {
      line1: "30 Finsbury Square",
      city: "London",
      state: "England",
      postalCode: "EC2A 1AG",
      country: "UK",
      lat: 51.5205,
      lng: -0.0877,
    },
    vehicleId: "vehicle-01",
  },
  {
    id: "driver-02",
    name: "Mason Reed",
    phone: "+44 7700 100002",
    status: DriverStatus.Busy,
    currentLocation: {
      line1: "18 South Bank",
      city: "London",
      state: "England",
      postalCode: "SE1 9PX",
      country: "UK",
      lat: 51.5079,
      lng: -0.0978,
    },
    vehicleId: "vehicle-02",
  },
  {
    id: "driver-03",
    name: "Ava Turner",
    phone: "+44 7700 100003",
    status: DriverStatus.Available,
    currentLocation: {
      line1: "7 Camden High Street",
      city: "London",
      state: "England",
      postalCode: "NW1 7JE",
      country: "UK",
      lat: 51.5416,
      lng: -0.1420,
    },
    vehicleId: "vehicle-03",
  },
]

export const mockDriversApi = {
  async list() {
    return structuredClone(drivers)
  },
  async getById(id: string) {
    return structuredClone(drivers.find((driver) => driver.id === id) ?? null)
  },
  async create(driver: Driver) {
    drivers.push(structuredClone(driver))
    return structuredClone(driver)
  },
  async update(id: string, updates: Partial<Driver>) {
    const index = drivers.findIndex((driver) => driver.id === id)

    if (index === -1) {
      throw new Error(`Driver not found: ${id}`)
    }

    drivers[index] = { ...drivers[index], ...updates }
    return structuredClone(drivers[index])
  },
}
