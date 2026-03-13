import type { Job } from "../../../../types/job"
import { JobStatus } from "../../../../types/jobStatus"

export interface JobsApi {
  list(): Promise<Job[]>
  getById(id: string): Promise<Job | null>
  create(job: Job): Promise<Job>
  update(id: string, updates: Partial<Job>): Promise<Job>
}

export type CreateJobInput = Omit<Job, "status" | "lifecycle" | "driverId">

export interface JobsService {
  listJobs(): Promise<Job[]>
  getJobById(id: string): Promise<Job | null>
  createJob(input: CreateJobInput): Promise<Job>
  assignDriver(jobId: string, driverId: string, assignedAt?: string): Promise<Job>
  updateJobStatus(jobId: string, status: JobStatus, occurredAt?: string): Promise<Job>
}

export function createJobsService(api: JobsApi): JobsService {
  return {
    listJobs() {
      return api.list()
    },

    getJobById(id) {
      return api.getById(id)
    },

    createJob(input) {
      validateJobInput(input)

      return api.create({
        ...input,
        status: JobStatus.Pending,
        lifecycle: {},
      })
    },

    async assignDriver(jobId, driverId, assignedAt = new Date().toISOString()) {
      const job = await requireJob(api, jobId)

      return api.update(jobId, {
        driverId,
        status: JobStatus.Assigned,
        lifecycle: {
          ...job.lifecycle,
          assignedAt,
        },
      })
    },

    async updateJobStatus(jobId, status, occurredAt = new Date().toISOString()) {
      const job = await requireJob(api, jobId)

      return api.update(jobId, {
        status,
        lifecycle: applyLifecycleTimestamp(job, status, occurredAt),
      })
    },
  }
}

async function requireJob(api: JobsApi, jobId: string): Promise<Job> {
  const job = await api.getById(jobId)

  if (!job) {
    throw new Error(`Job not found: ${jobId}`)
  }

  return job
}

function validateJobInput(input: CreateJobInput) {
  if (!input.customer.name.trim()) {
    throw new Error("Job customer name is required")
  }

  if (!input.customer.phone.trim()) {
    throw new Error("Job customer phone is required")
  }

  if (!input.parcelType.trim()) {
    throw new Error("Job parcel type is required")
  }

  validateAddress(input.pickupAddress, "pickup")
  validateAddress(input.dropoffAddress, "dropoff")
}

function validateAddress(jobAddress: Job["pickupAddress"], label: "pickup" | "dropoff") {
  if (!jobAddress.line1.trim()) {
    throw new Error(`Job ${label} address line1 is required`)
  }

  if (!Number.isFinite(jobAddress.lat) || !Number.isFinite(jobAddress.lng)) {
    throw new Error(`Job ${label} address coordinates are required`)
  }
}

function applyLifecycleTimestamp(job: Job, status: JobStatus, occurredAt: string) {
  const lifecycle = { ...job.lifecycle }

  switch (status) {
    case JobStatus.Assigned:
      lifecycle.assignedAt = occurredAt
      break
    case JobStatus.PickedUp:
      lifecycle.pickedUpAt = occurredAt
      break
    case JobStatus.InTransit:
      lifecycle.inTransitAt = occurredAt
      break
    case JobStatus.Delivered:
      lifecycle.deliveredAt = occurredAt
      break
    case JobStatus.Failed:
      lifecycle.failedAt = occurredAt
      break
    case JobStatus.Cancelled:
      lifecycle.cancelledAt = occurredAt
      break
    case JobStatus.Pending:
      break
  }

  return lifecycle
}
