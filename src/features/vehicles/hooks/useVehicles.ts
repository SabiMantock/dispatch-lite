import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { VehiclesService, CreateVehicleInput } from "../services/vehiclesService"
import type { VehicleStatus } from "@/types/vehicleStatus"

const VEHICLES_KEY = ["vehicles"] as const

export function useVehicles(service: VehiclesService) {
  const qc = useQueryClient()

  const vehiclesQuery = useQuery({
    queryKey: VEHICLES_KEY,
    queryFn: () => service.listVehicles(),
  })

  const createVehicle = useMutation({
    mutationFn: (input: CreateVehicleInput) => service.createVehicle(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: VEHICLES_KEY }),
  })

  const updateVehicleStatus = useMutation({
    mutationFn: ({ vehicleId, status }: { vehicleId: string; status: VehicleStatus }) =>
      service.updateVehicleStatus(vehicleId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: VEHICLES_KEY }),
  })

  return {
    ...vehiclesQuery,
    vehicles: vehiclesQuery.data ?? [],
    createVehicle,
    updateVehicleStatus,
  }
}
