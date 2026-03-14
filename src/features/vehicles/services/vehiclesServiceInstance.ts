import { getSupabaseClient } from "@/services/supabaseClient"
import type { Vehicle } from "@/types/vehicle"
import type { VehiclesApi } from "./vehiclesService"
import { createVehiclesService } from "./vehiclesService"

type VehicleRow = {
  id: string
  plate_number: string
  type: string
  capacity: number
  status: Vehicle["status"]
  created_at: string
}

function toVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    plateNumber: row.plate_number,
    type: row.type,
    capacity: row.capacity,
    status: row.status,
    createdAt: row.created_at,
  }
}

const supabaseVehiclesApi: VehiclesApi = {
  async list() {
    const { data, error } = await getSupabaseClient()
      .from("vehicles")
      .select("*")
    if (error) throw error
    return (data as VehicleRow[]).map(toVehicle)
  },

  async getById(id) {
    const { data, error } = await getSupabaseClient()
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single()
    if (error) throw error
    return data ? toVehicle(data as VehicleRow) : null
  },

  async create(vehicle) {
    const { data, error } = await getSupabaseClient()
      .from("vehicles")
      .insert({
        plate_number: vehicle.plateNumber,
        type: vehicle.type,
        capacity: vehicle.capacity,
        status: vehicle.status,
      })
      .select()
      .single()
    if (error) throw error
    return toVehicle(data as VehicleRow)
  },

  async update(id, updates) {
    const row: Record<string, unknown> = {}
    if (updates.plateNumber !== undefined) row.plate_number = updates.plateNumber
    if (updates.type !== undefined) row.type = updates.type
    if (updates.capacity !== undefined) row.capacity = updates.capacity
    if (updates.status !== undefined) row.status = updates.status
    const { data, error } = await getSupabaseClient()
      .from("vehicles")
      .update(row)
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return toVehicle(data as VehicleRow)
  },
}

export const vehiclesService = createVehiclesService(supabaseVehiclesApi)
