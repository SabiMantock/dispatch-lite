import type { Vehicle } from "../../../../types/vehicle"
import { VehicleStatus } from "../../../../types/vehicleStatus"

const vehicles: Vehicle[] = [
  {
    id: "vehicle-01",
    plateNumber: "DL-101",
    type: "Van",
    capacity: 1200,
    driverId: "driver-01",
    status: VehicleStatus.Assigned,
  },
  {
    id: "vehicle-02",
    plateNumber: "DL-204",
    type: "Bike",
    capacity: 80,
    driverId: "driver-02",
    status: VehicleStatus.Assigned,
  },
  {
    id: "vehicle-03",
    plateNumber: "DL-309",
    type: "Truck",
    capacity: 3000,
    driverId: "driver-03",
    status: VehicleStatus.Available,
  },
]

export const mockVehiclesApi = {
  async list() {
    return structuredClone(vehicles)
  },
  async getById(id: string) {
    return structuredClone(vehicles.find((vehicle) => vehicle.id === id) ?? null)
  },
  async create(vehicle: Vehicle) {
    vehicles.push(structuredClone(vehicle))
    return structuredClone(vehicle)
  },
  async update(id: string, updates: Partial<Vehicle>) {
    const index = vehicles.findIndex((vehicle) => vehicle.id === id)

    if (index === -1) {
      throw new Error(`Vehicle not found: ${id}`)
    }

    vehicles[index] = { ...vehicles[index], ...updates }
    return structuredClone(vehicles[index])
  },
}
