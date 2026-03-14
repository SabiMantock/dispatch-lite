import type { JobPriority } from "./jobPriority"
import type { JobStatus } from "./jobStatus"

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
  customerName: string
  customerPhone: string
  pickupAddress: string
  dropoffAddress: string
  pickupLat: number
  pickupLng: number
  dropoffLat: number
  dropoffLng: number
  parcelType: string
  priority: JobPriority
  status: JobStatus
  scheduledPickupAt: string | null
  driverId: string | null
  lifecycle: JobLifecycle
  createdAt: string
  updatedAt: string
}
