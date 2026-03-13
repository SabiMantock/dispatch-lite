import { createJobsService } from "./jobsService"
import { mockJobsApi } from "./mockJobsApi"

export const jobsService = createJobsService(mockJobsApi)
