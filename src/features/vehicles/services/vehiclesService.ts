import type { Vehicle } from "@/types/vehicle"
import type { VehicleStatus } from "@/types/vehicleStatus"

export type CreateVehicleInput = Pick<Vehicle, "plateNumber" | "type" | "capacity">

export interface VehiclesApi {
  list(): Promise<Vehicle[]>
  getById(id: string): Promise<Vehicle | null>
  create(vehicle: Omit<Vehicle, "id" | "createdAt">): Promise<Vehicle>
  update(id: string, updates: Partial<Vehicle>): Promise<Vehicle>
}

export interface VehiclesService {
  listVehicles(): Promise<Vehicle[]>
  getVehicleById(id: string): Promise<Vehicle | null>
  createVehicle(input: CreateVehicleInput): Promise<Vehicle>
  updateVehicleStatus(id: string, status: VehicleStatus): Promise<Vehicle>
}

export function createVehiclesService(api: VehiclesApi): VehiclesService {
  return {
    listVehicles: () => api.list(),
    getVehicleById: (id) => api.getById(id),

    async createVehicle(input) {
      return api.create({
        ...input,
        status: "available",
      })
    },

    async updateVehicleStatus(id, status) {
      return api.update(id, { status })
    },
  }
}
