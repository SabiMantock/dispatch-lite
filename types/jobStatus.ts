export const JobStatus = {
  Pending: "pending",
  Assigned: "assigned",
  PickedUp: "picked_up",
  InTransit: "in_transit",
  Delivered: "delivered",
  Failed: "failed",
  Cancelled: "cancelled",
} as const

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]
