import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { DriversService, CreateDriverInput } from "../services/driversService"
import type { DriverStatus } from "@/types/driverStatus"

const DRIVERS_KEY = ["drivers"] as const

export function useDrivers(service: DriversService) {
  const qc = useQueryClient()

  const driversQuery = useQuery({
    queryKey: DRIVERS_KEY,
    queryFn: () => service.listDrivers(),
  })

  const createDriver = useMutation({
    mutationFn: (input: CreateDriverInput) => service.createDriver(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: DRIVERS_KEY }),
  })

  const updateDriverStatus = useMutation({
    mutationFn: ({ driverId, status }: { driverId: string; status: DriverStatus }) =>
      service.updateDriverStatus(driverId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: DRIVERS_KEY }),
  })

  return {
    ...driversQuery,
    drivers: driversQuery.data ?? [],
    createDriver,
    updateDriverStatus,
  }
}
