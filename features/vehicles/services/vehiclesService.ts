import type { Vehicle } from "../../../types/vehicle"
import { VehicleStatus } from "../../../types/vehicleStatus"

export interface VehiclesApi {
  list(): Promise<Vehicle[]>
  getById(id: string): Promise<Vehicle | null>
  create(vehicle: Vehicle): Promise<Vehicle>
  update(id: string, updates: Partial<Vehicle>): Promise<Vehicle>
}

export type CreateVehicleInput = Vehicle

export interface VehiclesService {
  listVehicles(): Promise<Vehicle[]>
  getVehicleById(id: string): Promise<Vehicle | null>
  createVehicle(input: CreateVehicleInput): Promise<Vehicle>
  updateVehicleStatus(id: string, status: VehicleStatus): Promise<Vehicle>
  assignDriver(id: string, driverId: string): Promise<Vehicle>
}

export function createVehiclesService(api: VehiclesApi): VehiclesService {
  return {
    listVehicles() {
      return api.list()
    },

    getVehicleById(id) {
      return api.getById(id)
    },

    createVehicle(input) {
      validateVehicle(input)
      return api.create(input)
    },

    async updateVehicleStatus(id, status) {
      await requireVehicle(api, id)
      return api.update(id, { status })
    },

    async assignDriver(id, driverId) {
      const vehicle = await requireVehicle(api, id)

      return api.update(id, {
        driverId,
        status: vehicle.status === VehicleStatus.Offline ? vehicle.status : VehicleStatus.Assigned,
      })
    },
  }
}

async function requireVehicle(api: VehiclesApi, vehicleId: string): Promise<Vehicle> {
  const vehicle = await api.getById(vehicleId)

  if (!vehicle) {
    throw new Error(`Vehicle not found: ${vehicleId}`)
  }

  return vehicle
}

function validateVehicle(vehicle: Vehicle) {
  if (!vehicle.plateNumber.trim()) {
    throw new Error("Vehicle plate number is required")
  }

  if (!vehicle.type.trim()) {
    throw new Error("Vehicle type is required")
  }

  if (!vehicle.driverId.trim()) {
    throw new Error("Vehicle driverId is required")
  }

  if (vehicle.capacity <= 0) {
    throw new Error("Vehicle capacity must be greater than zero")
  }
}
