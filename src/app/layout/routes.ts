export type RouteDefinition = {
  path: string
  label: string
  description: string
  title: string
  subtitle: string
}

export const routes: RouteDefinition[] = [
  {
    path: '/jobs',
    label: 'Jobs',
    description: 'Track delivery tasks and dispatch priorities.',
    title: 'Jobs Workspace',
    subtitle: 'Review incoming jobs, queue status, and dispatch readiness.',
  },
  {
    path: '/drivers',
    label: 'Drivers',
    description: 'Monitor driver availability and assignments.',
    title: 'Drivers Workspace',
    subtitle: 'Inspect operational state, availability, and live coverage.',
  },
  {
    path: '/vehicles',
    label: 'Vehicles',
    description: 'Manage fleet visibility and readiness.',
    title: 'Vehicles Workspace',
    subtitle: 'Track assigned vehicles and maintenance-sensitive coverage.',
  },
]
