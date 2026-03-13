import { createVehiclesService } from "./vehiclesService"
import { mockVehiclesApi } from "./mockVehiclesApi"

export const vehiclesService = createVehiclesService(mockVehiclesApi)
