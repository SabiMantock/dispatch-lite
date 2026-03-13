export const JobPriority = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const

export type JobPriority = (typeof JobPriority)[keyof typeof JobPriority]
