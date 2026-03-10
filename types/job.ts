import type { Address } from "./address"

export enum JobStatus {
  Pending = "pending",
  Assigned = "assigned",
  PickedUp = "picked_up",
  InTransit = "in_transit",
  Delivered = "delivered",
  Failed = "failed",
  Cancelled = "cancelled",
}

export type JobPriority = "low" | "medium" | "high"

export interface JobLifecycleTimestamps {
  created_at: string
  assigned_at?: string
  picked_up_at?: string
  in_transit_at?: string
  delivered_at?: string
  failed_at?: string
  cancelled_at?: string
}

export interface Job {
  customer_name: string
  customer_phone: string
  pickup_address: Address
  dropoff_address: Address
  parcel_type: string
  priority: JobPriority
  status: JobStatus
  scheduled_pickup_time: string
  lifecycle_timestamps: JobLifecycleTimestamps
  driver_id?: string
}
