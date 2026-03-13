import type { Job } from "../../../../types/job"
import { JobPriority } from "../../../../types/jobPriority"
import { JobStatus } from "../../../../types/jobStatus"

const jobs: Job[] = [
  {
    id: "job-1042",
    customer: { name: "Nadia Morris", phone: "+44 7700 900001" },
    pickupAddress: {
      line1: "12 King Street",
      city: "London",
      state: "England",
      postalCode: "EC2V 8EA",
      country: "UK",
      lat: 51.5152,
      lng: -0.0922,
    },
    dropoffAddress: {
      line1: "88 Riverside Walk",
      city: "London",
      state: "England",
      postalCode: "SE1 7PB",
      country: "UK",
      lat: 51.5055,
      lng: -0.0754,
    },
    parcelType: "Medical package",
    priority: JobPriority.High,
    status: JobStatus.Assigned,
    scheduledPickupAt: "2026-03-13T09:15:00.000Z",
    lifecycle: { assignedAt: "2026-03-13T08:50:00.000Z" },
    driverId: "driver-01",
  },
  {
    id: "job-1048",
    customer: { name: "Leo Carter", phone: "+44 7700 900002" },
    pickupAddress: {
      line1: "4 Station Road",
      city: "London",
      state: "England",
      postalCode: "N1 9AL",
      country: "UK",
      lat: 51.5334,
      lng: -0.1043,
    },
    dropoffAddress: {
      line1: "215 Market Lane",
      city: "London",
      state: "England",
      postalCode: "E2 8AA",
      country: "UK",
      lat: 51.5275,
      lng: -0.0624,
    },
    parcelType: "Retail parcel",
    priority: JobPriority.Medium,
    status: JobStatus.Pending,
    scheduledPickupAt: "2026-03-13T10:30:00.000Z",
    lifecycle: {},
  },
  {
    id: "job-1051",
    customer: { name: "Aisha Green", phone: "+44 7700 900003" },
    pickupAddress: {
      line1: "9 Harbour Yard",
      city: "London",
      state: "England",
      postalCode: "E14 5AB",
      country: "UK",
      lat: 51.5078,
      lng: -0.0176,
    },
    dropoffAddress: {
      line1: "41 Museum Street",
      city: "London",
      state: "England",
      postalCode: "WC1A 1LX",
      country: "UK",
      lat: 51.5161,
      lng: -0.1267,
    },
    parcelType: "Legal documents",
    priority: JobPriority.High,
    status: JobStatus.InTransit,
    scheduledPickupAt: "2026-03-13T08:00:00.000Z",
    lifecycle: {
      assignedAt: "2026-03-13T07:30:00.000Z",
      pickedUpAt: "2026-03-13T08:10:00.000Z",
      inTransitAt: "2026-03-13T08:20:00.000Z",
    },
    driverId: "driver-02",
  },
]

export const mockJobsApi = {
  async list() {
    return structuredClone(jobs)
  },
  async getById(id: string) {
    return structuredClone(jobs.find((job) => job.id === id) ?? null)
  },
  async create(job: Job) {
    jobs.push(structuredClone(job))
    return structuredClone(job)
  },
  async update(id: string, updates: Partial<Job>) {
    const index = jobs.findIndex((job) => job.id === id)

    if (index === -1) {
      throw new Error(`Job not found: ${id}`)
    }

    jobs[index] = { ...jobs[index], ...updates }
    return structuredClone(jobs[index])
  },
}
