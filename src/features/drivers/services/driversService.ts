import type { Driver } from "@/types/driver"
import type { DriverStatus } from "@/types/driverStatus"

export type CreateDriverInput = Pick<Driver, "name" | "phone" | "vehicleId">

export interface DriversApi {
  list(): Promise<Driver[]>
  getById(id: string): Promise<Driver | null>
  create(driver: Omit<Driver, "id" | "createdAt">): Promise<Driver>
  update(id: string, updates: Partial<Driver>): Promise<Driver>
}

export interface DriversService {
  listDrivers(): Promise<Driver[]>
  getDriverById(id: string): Promise<Driver | null>
  createDriver(input: CreateDriverInput): Promise<Driver>
  updateDriverStatus(id: string, status: DriverStatus): Promise<Driver>
}

export function createDriversService(api: DriversApi): DriversService {
  return {
    listDrivers: () => api.list(),
    getDriverById: (id) => api.getById(id),

    async createDriver(input) {
      return api.create({
        ...input,
        status: "available",
        location: null,
      })
    },

    async updateDriverStatus(id, status) {
      return api.update(id, { status })
    },
  }
}
