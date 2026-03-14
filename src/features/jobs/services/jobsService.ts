import type { Job, JobLifecycle } from "@/types/job"
import type { JobStatus } from "@/types/jobStatus"

export type CreateJobInput = Pick<
  Job,
  | "customerName"
  | "customerPhone"
  | "pickupAddress"
  | "dropoffAddress"
  | "pickupLat"
  | "pickupLng"
  | "dropoffLat"
  | "dropoffLng"
  | "parcelType"
  | "priority"
  | "scheduledPickupAt"
>

export interface JobsApi {
  list(): Promise<Job[]>
  getById(id: string): Promise<Job | null>
  create(job: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job>
  update(id: string, updates: Partial<Job>): Promise<Job>
}

export interface JobsService {
  listJobs(): Promise<Job[]>
  getJobById(id: string): Promise<Job | null>
  createJob(input: CreateJobInput): Promise<Job>
  assignDriver(jobId: string, driverId: string): Promise<Job>
  updateJobStatus(jobId: string, status: JobStatus): Promise<Job>
}

function applyLifecycle(
  current: JobLifecycle,
  status: JobStatus,
  at: string,
): JobLifecycle {
  const map: Record<string, keyof JobLifecycle> = {
    assigned: "assignedAt",
    picked_up: "pickedUpAt",
    in_transit: "inTransitAt",
    delivered: "deliveredAt",
    failed: "failedAt",
    cancelled: "cancelledAt",
  }
  const key = map[status]
  return key ? { ...current, [key]: at } : current
}

export function createJobsService(api: JobsApi): JobsService {
  return {
    listJobs: () => api.list(),
    getJobById: (id) => api.getById(id),

    async createJob(input) {
      return api.create({
        ...input,
        status: "pending",
        driverId: null,
        lifecycle: {},
      })
    },

    async assignDriver(jobId, driverId) {
      const job = await api.getById(jobId)
      if (!job) throw new Error(`Job ${jobId} not found`)
      const now = new Date().toISOString()
      return api.update(jobId, {
        driverId,
        status: "assigned",
        lifecycle: applyLifecycle(job.lifecycle, "assigned", now),
      })
    },

    async updateJobStatus(jobId, status) {
      const job = await api.getById(jobId)
      if (!job) throw new Error(`Job ${jobId} not found`)
      const now = new Date().toISOString()
      return api.update(jobId, {
        status,
        lifecycle: applyLifecycle(job.lifecycle, status, now),
      })
    },
  }
}
