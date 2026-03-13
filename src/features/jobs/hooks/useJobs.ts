import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { Job } from "../../../../types/job"
import { JobStatus } from "../../../../types/jobStatus"
import type {
  CreateJobInput,
  JobsService,
} from "../services/jobsService"

const jobsQueryKey = ["jobs"] as const

export function useJobs(service: JobsService) {
  const queryClient = useQueryClient()

  const jobsQuery = useQuery({
    queryKey: jobsQueryKey,
    queryFn: () => service.listJobs(),
  })

  const createJob = useMutation({
    mutationFn: (input: CreateJobInput) => service.createJob(input),
    onSuccess: (job) => {
      updateJobsCache(queryClient, (jobs) => [...jobs, job])
      queryClient.setQueryData([...jobsQueryKey, job.id], job)
    },
  })

  const assignDriver = useMutation({
    mutationFn: ({ jobId, driverId }: { jobId: string; driverId: string }) =>
      service.assignDriver(jobId, driverId),
    onSuccess: (job) => {
      syncJobCache(queryClient, job)
    },
  })

  const updateJobStatus = useMutation({
    mutationFn: ({ jobId, status }: { jobId: string; status: JobStatus }) =>
      service.updateJobStatus(jobId, status),
    onSuccess: (job) => {
      syncJobCache(queryClient, job)
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

function syncJobCache(
  queryClient: ReturnType<typeof useQueryClient>,
  job: Job,
) {
  updateJobsCache(queryClient, (jobs) =>
    jobs.map((existingJob) => (existingJob.id === job.id ? job : existingJob)),
  )
  queryClient.setQueryData([...jobsQueryKey, job.id], job)
}

function updateJobsCache(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (jobs: Job[]) => Job[],
) {
  queryClient.setQueryData<Job[]>(jobsQueryKey, (currentJobs = []) =>
    updater(currentJobs),
  )
}
