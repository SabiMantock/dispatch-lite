import { getSupabaseClient } from "@/services/supabaseClient"
import type { Job } from "@/types/job"
import type { JobsApi } from "./jobsService"
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
  priority: Job["priority"]
  status: Job["status"]
  scheduled_pickup_at: string | null
  driver_id: string | null
  assigned_at: string | null
  picked_up_at: string | null
  in_transit_at: string | null
  delivered_at: string | null
  failed_at: string | null
  cancelled_at: string | null
  created_at: string
  updated_at: string
}

function toJob(row: JobRow): Job {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    pickupAddress: row.pickup_address,
    dropoffAddress: row.dropoff_address,
    pickupLat: Number(row.pickup_lat),
    pickupLng: Number(row.pickup_lng),
    dropoffLat: Number(row.dropoff_lat),
    dropoffLng: Number(row.dropoff_lng),
    parcelType: row.parcel_type,
    priority: row.priority,
    status: row.status,
    scheduledPickupAt: row.scheduled_pickup_at,
    driverId: row.driver_id,
    lifecycle: {
      assignedAt: row.assigned_at ?? undefined,
      pickedUpAt: row.picked_up_at ?? undefined,
      inTransitAt: row.in_transit_at ?? undefined,
      deliveredAt: row.delivered_at ?? undefined,
      failedAt: row.failed_at ?? undefined,
      cancelledAt: row.cancelled_at ?? undefined,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function toRow(job: Partial<Job>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  if (job.customerName !== undefined) row.customer_name = job.customerName
  if (job.customerPhone !== undefined) row.customer_phone = job.customerPhone
  if (job.pickupAddress !== undefined) row.pickup_address = job.pickupAddress
  if (job.dropoffAddress !== undefined) row.dropoff_address = job.dropoffAddress
  if (job.pickupLat !== undefined) row.pickup_lat = job.pickupLat
  if (job.pickupLng !== undefined) row.pickup_lng = job.pickupLng
  if (job.dropoffLat !== undefined) row.dropoff_lat = job.dropoffLat
  if (job.dropoffLng !== undefined) row.dropoff_lng = job.dropoffLng
  if (job.parcelType !== undefined) row.parcel_type = job.parcelType
  if (job.priority !== undefined) row.priority = job.priority
  if (job.status !== undefined) row.status = job.status
  if (job.scheduledPickupAt !== undefined) row.scheduled_pickup_at = job.scheduledPickupAt
  if (job.driverId !== undefined) row.driver_id = job.driverId
  if (job.lifecycle) {
    if (job.lifecycle.assignedAt !== undefined) row.assigned_at = job.lifecycle.assignedAt
    if (job.lifecycle.pickedUpAt !== undefined) row.picked_up_at = job.lifecycle.pickedUpAt
    if (job.lifecycle.inTransitAt !== undefined) row.in_transit_at = job.lifecycle.inTransitAt
    if (job.lifecycle.deliveredAt !== undefined) row.delivered_at = job.lifecycle.deliveredAt
    if (job.lifecycle.failedAt !== undefined) row.failed_at = job.lifecycle.failedAt
    if (job.lifecycle.cancelledAt !== undefined) row.cancelled_at = job.lifecycle.cancelledAt
  }
  return row
}

const supabaseJobsApi: JobsApi = {
  async list() {
    const { data, error } = await getSupabaseClient()
      .from("jobs")
      .select("*")
    if (error) throw error
    return (data as JobRow[]).map(toJob)
  },

  async getById(id) {
    const { data, error } = await getSupabaseClient()
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single()
    if (error) throw error
    return data ? toJob(data as JobRow) : null
  },

  async create(job) {
    const { data, error } = await getSupabaseClient()
      .from("jobs")
      .insert(toRow(job))
      .select()
      .single()
    if (error) throw error
    return toJob(data as JobRow)
  },

  async update(id, updates) {
    const { data, error } = await getSupabaseClient()
      .from("jobs")
      .update(toRow(updates))
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return toJob(data as JobRow)
  },
}

export const jobsService = createJobsService(supabaseJobsApi)
