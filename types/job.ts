import type { Address } from "./address"
import type { Customer } from "./customer"
import type { JobLifecycle } from "./jobLifecycle"
import { JobPriority } from "./jobPriority"
import { JobStatus } from "./jobStatus"

export interface Job {
  id: string
  customer: Customer
  pickupAddress: Address
  dropoffAddress: Address
  parcelType: string
  priority: JobPriority
  status: JobStatus
  scheduledPickupAt: string
  lifecycle: JobLifecycle
  driverId?: string
}
