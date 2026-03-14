import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { JobsService, CreateJobInput } from "../services/jobsService"
import type { JobStatus } from "@/types/jobStatus"

const JOBS_KEY = ["jobs"] as const
const DRIVERS_KEY = ["drivers"] as const

export function useJobs(service: JobsService) {
  const qc = useQueryClient()

  const jobsQuery = useQuery({
    queryKey: JOBS_KEY,
    queryFn: () => service.listJobs(),
  })

  const createJob = useMutation({
    mutationFn: (input: CreateJobInput) => service.createJob(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })

  const assignDriver = useMutation({
    mutationFn: ({ jobId, driverId }: { jobId: string; driverId: string }) =>
      service.assignDriver(jobId, driverId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: JOBS_KEY })
      qc.invalidateQueries({ queryKey: DRIVERS_KEY })
    },
  })

  const updateJobStatus = useMutation({
    mutationFn: ({ jobId, status }: { jobId: string; status: JobStatus }) =>
      service.updateJobStatus(jobId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: JOBS_KEY })
      qc.invalidateQueries({ queryKey: DRIVERS_KEY })
    },
  })

  return {
    ...jobsQuery,
    jobs: jobsQuery.data ?? [],
    createJob,
    assignDriver,
    updateJobStatus,
  }
}
