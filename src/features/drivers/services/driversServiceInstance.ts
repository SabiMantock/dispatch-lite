import { getSupabaseClient } from "@/services/supabaseClient"
import type { Driver, GeoPoint } from "@/types/driver"
import type { DriversApi } from "./driversService"
import { createDriversService } from "./driversService"

type DriverRow = {
  id: string
  name: string
  phone: string
  status: Driver["status"]
  vehicle_id: string
  location: string | null
  created_at: string
}

function parseLocation(raw: string | null): GeoPoint | null {
  if (!raw) return null
  try {
    const geo = JSON.parse(raw)
    if (geo?.coordinates) {
      return { lat: geo.coordinates[1], lng: geo.coordinates[0] }
    }
  } catch {
    // WKB or unparseable — return null
  }
  return null
}

function toDriver(row: DriverRow): Driver {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    status: row.status,
    vehicleId: row.vehicle_id,
    location: parseLocation(row.location),
    createdAt: row.created_at,
  }
}

const supabaseDriversApi: DriversApi = {
  async list() {
    const { data, error } = await getSupabaseClient()
      .from("drivers")
      .select("id, name, phone, status, vehicle_id, location::text, created_at")
    if (error) throw error
    return (data as DriverRow[]).map(toDriver)
  },

  async getById(id) {
    const { data, error } = await getSupabaseClient()
      .from("drivers")
      .select("id, name, phone, status, vehicle_id, location::text, created_at")
      .eq("id", id)
      .single()
    if (error) throw error
    return data ? toDriver(data as DriverRow) : null
  },

  async create(driver) {
    const row: Record<string, unknown> = {
      name: driver.name,
      phone: driver.phone,
      status: driver.status,
      vehicle_id: driver.vehicleId,
    }
    if (driver.location) {
      row.location = `POINT(${driver.location.lng} ${driver.location.lat})`
    }
    const { data, error } = await getSupabaseClient()
      .from("drivers")
      .insert(row)
      .select("id, name, phone, status, vehicle_id, location::text, created_at")
      .single()
    if (error) throw error
    return toDriver(data as DriverRow)
  },

  async update(id, updates) {
    const row: Record<string, unknown> = {}
    if (updates.name !== undefined) row.name = updates.name
    if (updates.phone !== undefined) row.phone = updates.phone
    if (updates.status !== undefined) row.status = updates.status
    if (updates.vehicleId !== undefined) row.vehicle_id = updates.vehicleId
    if (updates.location !== undefined) {
      row.location = updates.location
        ? `POINT(${updates.location.lng} ${updates.location.lat})`
        : null
    }
    const { data, error } = await getSupabaseClient()
      .from("drivers")
      .update(row)
      .eq("id", id)
      .select("id, name, phone, status, vehicle_id, location::text, created_at")
      .single()
    if (error) throw error
    return toDriver(data as DriverRow)
  },
}

export const driversService = createDriversService(supabaseDriversApi)
