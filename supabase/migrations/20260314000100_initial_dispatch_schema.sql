-- Enable PostGIS for spatial data
create extension if not exists postgis;

-- ENUM TYPES

create type job_status as enum (
  'pending',
  'assigned',
  'in_transit',
  'delivered',
  'failed',
  'cancelled'
);

create type job_priority as enum (
  'low',
  'medium',
  'high'
);

create type driver_status as enum (
  'available',
  'assigned',
  'on_route',
  'offline'
);

create type vehicle_status as enum (
  'available',
  'assigned',
  'maintenance',
  'offline'
);

-- VEHICLES TABLE

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  plate_number text unique,
  type text,
  capacity integer,
  status vehicle_status,
  created_at timestamp default now()
);

-- DRIVERS TABLE

create table drivers (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  status driver_status,
  vehicle_id uuid references vehicles(id),
  location geography(Point,4326),
  created_at timestamp default now()
);

-- JOBS TABLE

create table jobs (
  id uuid primary key default gen_random_uuid(),

  customer_name text,
  customer_phone text,

  pickup_address text,
  dropoff_address text,

  pickup_lat numeric,
  pickup_lng numeric,

  dropoff_lat numeric,
  dropoff_lng numeric,

  parcel_type text,

  priority job_priority,
  status job_status,

  scheduled_pickup_at timestamp,

  driver_id uuid references drivers(id),

  assigned_at timestamp,
  started_at timestamp,
  completed_at timestamp,
  failed_at timestamp,

  created_at timestamp default now(),
  updated_at timestamp default now()
);