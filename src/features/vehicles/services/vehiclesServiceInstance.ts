import type { Vehicle } from "../../../../types/vehicle"
import type { VehicleStatus } from "../../../../types/vehicleStatus"
import { getSupabaseClient } from "../../../services/supabaseClient"
import { createVehiclesService } from "./vehiclesService"

type VehicleRow = {
  id: string
  plate_number: string
  type: string
  capacity: number
  status: VehicleStatus
}

function mapVehicleRow(row: VehicleRow, driverId?: string): Vehicle {
  return {
    id: row.id,
    plateNumber: row.plate_number,
    type: row.type,
    capacity: row.capacity,
    status: row.status,
    driverId: driverId ?? "",
  }
}

function toVehicleRow(vehicle: Vehicle | Partial<Vehicle>) {
  return {
    plate_number: vehicle.plateNumber,
    type: vehicle.type,
    capacity: vehicle.capacity,
    status: vehicle.status,
  }
}

const vehiclesApi = {
  async list() {
    const supabase = getSupabaseClient()
    const [{ data: vehicleRows, error: vehicleError }, { data: driverRows, error: driverError }] =
      await Promise.all([
        supabase.from("vehicles").select("*"),
        supabase.from("drivers").select("id, vehicle_id"),
      ])

    if (vehicleError) {
      throw vehicleError
    }

    if (driverError) {
      throw driverError
    }

    const driverByVehicleId = new Map(
      (driverRows ?? [])
        .filter((row) => row.vehicle_id)
        .map((row) => [row.vehicle_id as string, row.id as string]),
    )

    return (vehicleRows ?? []).map((row) =>
      mapVehicleRow(row as VehicleRow, driverByVehicleId.get(row.id as string)),
    )
  },
  async getById(id: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!data) {
      return null
    }

    const { data: driverRow, error: driverError } = await supabase
      .from("drivers")
      .select("id")
      .eq("vehicle_id", id)
      .maybeSingle()

    if (driverError) {
      throw driverError
    }

    return mapVehicleRow(data as VehicleRow, driverRow?.id)
  },
  async create(vehicle: Vehicle) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("vehicles")
      .insert(toVehicleRow(vehicle))
      .select("*")
      .single()

    if (error) {
      throw error
    }

    if (vehicle.driverId) {
      const { error: driverError } = await supabase
        .from("drivers")
        .update({ vehicle_id: data.id })
        .eq("id", vehicle.driverId)

      if (driverError) {
        throw driverError
      }
    }

    return mapVehicleRow(data as VehicleRow, vehicle.driverId)
  },
  async update(id: string, updates: Partial<Vehicle>) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("vehicles")
      .update(toVehicleRow(updates))
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      throw error
    }

    if (updates.driverId) {
      const { error: driverError } = await supabase
        .from("drivers")
        .update({ vehicle_id: id })
        .eq("id", updates.driverId)

      if (driverError) {
        throw driverError
      }
    }

    return mapVehicleRow(data as VehicleRow, updates.driverId)
  },
}

export const vehiclesService = createVehiclesService(vehiclesApi)
