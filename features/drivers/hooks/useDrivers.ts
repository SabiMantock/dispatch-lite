import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { Driver } from "../../../types/driver"
import { DriverStatus } from "../../../types/driverStatus"
import type {
  CreateDriverInput,
  DriversService,
} from "../services/driversService"

const driversQueryKey = ["drivers"] as const

export function useDrivers(service: DriversService) {
  const queryClient = useQueryClient()

  const driversQuery = useQuery({
    queryKey: driversQueryKey,
    queryFn: () => service.listDrivers(),
  })

  const createDriver = useMutation({
    mutationFn: (input: CreateDriverInput) => service.createDriver(input),
    onSuccess: (driver) => {
      updateDriversCache(queryClient, (drivers) => [...drivers, driver])
      queryClient.setQueryData([...driversQueryKey, driver.id], driver)
    },
  })

  const updateDriverStatus = useMutation({
    mutationFn: ({ driverId, status }: { driverId: string; status: DriverStatus }) =>
      service.updateDriverStatus(driverId, status),
    onSuccess: (driver) => {
      syncDriverCache(queryClient, driver)
    },
  })

  const updateDriverLocation = useMutation({
    mutationFn: ({
      driverId,
      currentLocation,
    }: {
      driverId: string
      currentLocation: Driver["currentLocation"]
    }) => service.updateDriverLocation(driverId, currentLocation),
    onSuccess: (driver) => {
      syncDriverCache(queryClient, driver)
    },
  })

  return {
    ...driversQuery,
    drivers: driversQuery.data ?? [],
    createDriver,
    updateDriverStatus,
    updateDriverLocation,
  }
}

function syncDriverCache(
  queryClient: ReturnType<typeof useQueryClient>,
  driver: Driver,
) {
  updateDriversCache(queryClient, (drivers) =>
    drivers.map((existingDriver) =>
      existingDriver.id === driver.id ? driver : existingDriver,
    ),
  )
  queryClient.setQueryData([...driversQueryKey, driver.id], driver)
}

function updateDriversCache(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (drivers: Driver[]) => Driver[],
) {
  queryClient.setQueryData<Driver[]>(driversQueryKey, (currentDrivers = []) =>
    updater(currentDrivers),
  )
}
