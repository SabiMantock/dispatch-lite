import type { Driver } from "../../../../types/driver"
import type { DriverStatus } from "../../../../types/driverStatus"
import { getSupabaseClient } from "../../../services/supabaseClient"
import { createDriversService } from "./driversService"

type DriverRow = {
  id: string
  name: string
  phone: string
  status: DriverStatus
  vehicle_id: string | null
}

function mapDriverRow(row: DriverRow): Driver {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    status: row.status,
    currentLocation: {
      line1: "Location unavailable",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      lat: 0,
      lng: 0,
    },
    vehicleId: row.vehicle_id ?? undefined,
  }
}

function toDriverRow(driver: Driver | Partial<Driver>) {
  return {
    name: driver.name,
    phone: driver.phone,
    status: driver.status,
    vehicle_id: driver.vehicleId ?? null,
  }
}

const driversApi = {
  async list() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("drivers").select("*")

    if (error) {
      throw error
    }

    return (data ?? []).map((row) => mapDriverRow(row as DriverRow))
  },
  async getById(id: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (error) {
      throw error
    }

    return data ? mapDriverRow(data as DriverRow) : null
  },
  async create(driver: Driver) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("drivers")
      .insert(toDriverRow(driver))
      .select("*")
      .single()

    if (error) {
      throw error
    }

    return mapDriverRow(data as DriverRow)
  },
  async update(id: string, updates: Partial<Driver>) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("drivers")
      .update(toDriverRow(updates))
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      throw error
    }

    return mapDriverRow(data as DriverRow)
  },
}

export const driversService = createDriversService(driversApi)
