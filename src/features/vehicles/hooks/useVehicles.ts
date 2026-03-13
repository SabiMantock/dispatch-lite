import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { Vehicle } from "../../../../types/vehicle"
import { VehicleStatus } from "../../../../types/vehicleStatus"
import type {
  CreateVehicleInput,
  VehiclesService,
} from "../services/vehiclesService"

const vehiclesQueryKey = ["vehicles"] as const

export function useVehicles(service: VehiclesService) {
  const queryClient = useQueryClient()

  const vehiclesQuery = useQuery({
    queryKey: vehiclesQueryKey,
    queryFn: () => service.listVehicles(),
  })

  const createVehicle = useMutation({
    mutationFn: (input: CreateVehicleInput) => service.createVehicle(input),
    onSuccess: (vehicle) => {
      updateVehiclesCache(queryClient, (vehicles) => [...vehicles, vehicle])
      queryClient.setQueryData([...vehiclesQueryKey, vehicle.id], vehicle)
    },
  })

  const updateVehicleStatus = useMutation({
    mutationFn: ({
      vehicleId,
      status,
    }: {
      vehicleId: string
      status: VehicleStatus
    }) => service.updateVehicleStatus(vehicleId, status),
    onSuccess: (vehicle) => {
      syncVehicleCache(queryClient, vehicle)
    },
  })

  const assignDriver = useMutation({
    mutationFn: ({ vehicleId, driverId }: { vehicleId: string; driverId: string }) =>
      service.assignDriver(vehicleId, driverId),
    onSuccess: (vehicle) => {
      syncVehicleCache(queryClient, vehicle)
    },
  })

  return {
    ...vehiclesQuery,
    vehicles: vehiclesQuery.data ?? [],
    createVehicle,
    updateVehicleStatus,
    assignDriver,
  }
}

function syncVehicleCache(
  queryClient: ReturnType<typeof useQueryClient>,
  vehicle: Vehicle,
) {
  updateVehiclesCache(queryClient, (vehicles) =>
    vehicles.map((existingVehicle) =>
      existingVehicle.id === vehicle.id ? vehicle : existingVehicle,
    ),
  )
  queryClient.setQueryData([...vehiclesQueryKey, vehicle.id], vehicle)
}

function updateVehiclesCache(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (vehicles: Vehicle[]) => Vehicle[],
) {
  queryClient.setQueryData<Vehicle[]>(
    vehiclesQueryKey,
    (currentVehicles = []) => updater(currentVehicles),
  )
}
