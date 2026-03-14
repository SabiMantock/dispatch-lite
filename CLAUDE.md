# CLAUDE.md

## Project
DispatchLite — React 19/TypeScript logistics dashboard. **No test runner configured.**

## Commands
```
pnpm dev | pnpm build | pnpm lint | pnpm preview
```

## Architecture
```
src/app/        # Router, layout, global providers
src/features/   # Domain modules (jobs, drivers, vehicles)
src/shared/     # Cross-feature reusables — zero domain logic
src/services/   # Supabase singleton only
src/stores/     # Zustand stores only
src/types/      # Global domain entity types
```
Dependency rule: `app → features → shared/services/stores/types` (never reverse).

## Adding a Feature
```
features/[name]/
  components/   # Domain-prefixed PascalCase: JobCard, DriverPanel
  hooks/        # useJobs.ts — TanStack Query wrappers only; never call useQuery/Supabase directly in components
  services/     # [name]Service.ts (factory) + [name]ServiceInstance.ts (Supabase API)
  types/        # Feature-local types
```

## State Management
| Layer | Tool | Holds |
|---|---|---|
| Server data | TanStack Query (via feature hooks) | jobs, drivers, vehicles |
| UI state | Zustand `uiStore` | selectedEntityId, isInspectorOpen, activeWorkspace, filters |

Zustand must **never** duplicate TanStack Query data.

## UI Components
- **shadcn/ui** for all primitives (Button, Select, Badge, Input, Dialog, Table, DropdownMenu)
- `shared/components/` = domain-agnostic composed patterns
- `app/layout/` = structural layout only
- 150-line soft limit per component; split if exceeded

## Key Files
| File | Purpose |
|---|---|
| `src/app/router.tsx` | BrowserRouter + routes |
| `src/app/layout/routes.ts` | Route definitions |
| `src/app/layout/DashboardLayout.tsx` | Main layout orchestrator |
| `src/stores/uiStore.ts` | Zustand UI store |
| `src/services/supabaseClient.ts` | Supabase singleton |
| `supabase/migrations/` | DB migrations |
| `supabase/seed.sql` | Seed data |

## Domain Constraints (non-negotiable)
- One job = one delivery task; one active job per driver at a time
- Drivers permanently tied to one vehicle (and vice versa)
- Driver states (`available/busy/offline`) are **manual only**, never automatic
- Job lifecycle: `pending → assigned → picked_up → in_transit → delivered | failed | cancelled`
- Required job fields: `customer_name`, `customer_phone`, `pickup_address`, `dropoff_address`, `parcel_type`, `priority`
- Priority `high` must be visually highlighted; levels are `low/medium/high` only
- Cancelled jobs are **retained, never deleted**
- Status enums: use `const` objects with `as const` — **not** TypeScript `enum`
- Driver location stored as `{ lat: number; lng: number }` — not full Address

## Database Enums (source of truth)
```
job_status:    pending, assigned, picked_up, in_transit, delivered, failed, cancelled
job_priority:  low, medium, high
driver_status: available, busy, offline
vehicle_status: available, assigned, maintenance, offline
```
Frontend const objects must mirror these exactly.

## Environment
```
VITE_SUPABASE_URL=http://127.0.0.1:54321   # local dev
VITE_SUPABASE_ANON_KEY=<key>
```
