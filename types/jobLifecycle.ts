export interface JobLifecycle {
  assignedAt?: string
  pickedUpAt?: string
  inTransitAt?: string
  deliveredAt?: string
  failedAt?: string
  cancelledAt?: string
}
