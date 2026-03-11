import type { Address } from "./address"
import { JobStatus } from "./jobStatus"

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

export interface Customer {
  name: string
  phone: string
}

export interface Job {
  id: string
  customer_name: Customer["name"]
  customer_phone: Customer["phone"]
  pickup_address: Address
  dropoff_address: Address
  parcelType: string
  priority: JobPriority
  status: JobStatus
  scheduledPickupAt: string
  lifecycle_timestamps: JobLifecycle
  driverId?: string
}
