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

export enum JobPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface JobLifecycle {
  assignedAt?: string
  pickedUpAt?: string
  inTransitAt?: string
  deliveredAt?: string
  failedAt?: string
  cancelledAt?: string
}

export interface Job {
  id: string
  customer_name: string
  customer_phone: string
  pickup_address: Address
  dropoff_address: Address
  parcel_type: string
  priority: JobPriority
  status: JobStatus
  scheduled_pickup_time: string
  lifecycle_timestamps: JobLifecycle
  driverId?: string
}
