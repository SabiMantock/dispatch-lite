-- DispatchLite Schema
-- Enums aligned with frontend const objects (see CLAUDE.md "Database Enums")

create extension if not exists postgis;

-- Enums
create type job_status as enum (
  'pending', 'assigned', 'picked_up', 'in_transit',
  'delivered', 'failed', 'cancelled'
);

create type job_priority as enum ('low', 'medium', 'high');

create type driver_status as enum ('available', 'busy', 'offline');

create type vehicle_status as enum ('available', 'assigned', 'maintenance', 'offline');

-- Tables
create table vehicles (
  id uuid primary key default gen_random_uuid(),
  plate_number text unique not null,
  type text not null,
  capacity integer not null check (capacity > 0),
  status vehicle_status not null default 'available',
  created_at timestamptz not null default now()
);

create table drivers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  status driver_status not null default 'available',
  vehicle_id uuid not null references vehicles(id),
  location geography(Point, 4326),
  created_at timestamptz not null default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  pickup_address text not null,
  dropoff_address text not null,
  pickup_lat numeric not null,
  pickup_lng numeric not null,
  dropoff_lat numeric not null,
  dropoff_lng numeric not null,
  parcel_type text not null,
  priority job_priority not null default 'medium',
  status job_status not null default 'pending',
  scheduled_pickup_at timestamptz,
  driver_id uuid references drivers(id),
  -- Lifecycle timestamps (all 6, matching frontend JobLifecycle)
  assigned_at timestamptz,
  picked_up_at timestamptz,
  in_transit_at timestamptz,
  delivered_at timestamptz,
  failed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_jobs_driver_id on jobs(driver_id);
create index idx_jobs_status on jobs(status);
create index idx_jobs_priority on jobs(priority);
create index idx_drivers_vehicle_id on drivers(vehicle_id);
create index idx_drivers_status on drivers(status);

-- updated_at trigger
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger jobs_updated_at
  before update on jobs
  for each row execute function set_updated_at();
