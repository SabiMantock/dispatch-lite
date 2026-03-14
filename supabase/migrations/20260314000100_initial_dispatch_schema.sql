create extension if not exists pgcrypto;

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  plate_number text not null,
  type text not null,
  capacity integer not null,
  status text not null,
  created_at timestamp with time zone not null default now()
);

create table if not exists drivers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  status text not null,
  vehicle_id uuid references vehicles(id),
  created_at timestamp with time zone not null default now()
);

create table if not exists jobs (
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
  priority text not null,
  status text not null,
  scheduled_pickup_at timestamp with time zone not null,
  driver_id uuid references drivers(id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists idx_jobs_driver_id on jobs(driver_id);
create index if not exists idx_drivers_vehicle_id on drivers(vehicle_id);

create or replace function set_jobs_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists jobs_set_updated_at on jobs;

create trigger jobs_set_updated_at
before update on jobs
for each row
execute function set_jobs_updated_at();
