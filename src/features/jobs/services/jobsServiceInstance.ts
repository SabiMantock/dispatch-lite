import type { Job } from "../../../../types/job"
import type { JobPriority } from "../../../../types/jobPriority"
import type { JobStatus } from "../../../../types/jobStatus"
import { getSupabaseClient } from "../../../services/supabaseClient"
import { createJobsService } from "./jobsService"

type JobRow = {
  id: string
  customer_name: string
  customer_phone: string
  pickup_address: string
  dropoff_address: string
  pickup_lat: number
  pickup_lng: number
  dropoff_lat: number
  dropoff_lng: number
  parcel_type: string
  priority: JobPriority
  status: JobStatus
  scheduled_pickup_at: string
  driver_id: string | null
}

function mapJobRow(row: JobRow): Job {
  return {
    id: row.id,
    customer: {
      name: row.customer_name,
      phone: row.customer_phone,
    },
    pickupAddress: {
      line1: row.pickup_address,
      city: "",
      state: "",
      postalCode: "",
      country: "",
      lat: Number(row.pickup_lat),
      lng: Number(row.pickup_lng),
    },
    dropoffAddress: {
      line1: row.dropoff_address,
      city: "",
      state: "",
      postalCode: "",
      country: "",
      lat: Number(row.dropoff_lat),
      lng: Number(row.dropoff_lng),
    },
    parcelType: row.parcel_type,
    priority: row.priority,
    status: row.status,
    scheduledPickupAt: row.scheduled_pickup_at,
    lifecycle: {},
    driverId: row.driver_id ?? undefined,
  }
}

function toJobRow(job: Job | Partial<Job>) {
  return {
    customer_name: job.customer?.name,
    customer_phone: job.customer?.phone,
    pickup_address: job.pickupAddress?.line1,
    dropoff_address: job.dropoffAddress?.line1,
    pickup_lat: job.pickupAddress?.lat,
    pickup_lng: job.pickupAddress?.lng,
    dropoff_lat: job.dropoffAddress?.lat,
    dropoff_lng: job.dropoffAddress?.lng,
    parcel_type: job.parcelType,
    priority: job.priority,
    status: job.status,
    scheduled_pickup_at: job.scheduledPickupAt,
    driver_id: job.driverId ?? null,
  }
}

const jobsApi = {
  async list() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("jobs").select("*")

    if (error) {
      throw error
    }

    return (data ?? []).map((row) => mapJobRow(row as JobRow))
  },
  async getById(id: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (error) {
      throw error
    }

    return data ? mapJobRow(data as JobRow) : null
  },
  async create(job: Job) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("jobs")
      .insert(toJobRow(job))
      .select("*")
      .single()

    if (error) {
      throw error
    }

    return mapJobRow(data as JobRow)
  },
  async update(id: string, updates: Partial<Job>) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("jobs")
      .update(toJobRow(updates))
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      throw error
    }

    return mapJobRow(data as JobRow)
  },
}

export const jobsService = createJobsService(jobsApi)
