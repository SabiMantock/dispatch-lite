import { createDriversService } from "./driversService"
import { mockDriversApi } from "./mockDriversApi"

export const driversService = createDriversService(mockDriversApi)
