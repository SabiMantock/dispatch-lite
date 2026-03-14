-- VEHICLES

insert into vehicles (plate_number, type, capacity, status)
values
('VAN-001','van',100,'available'),
('VAN-002','van',120,'available'),
('BIKE-001','bike',20,'available');


-- DRIVERS

insert into drivers (name, phone, status, vehicle_id, location)
values
(
  'Michael Johnson',
  '555-1001',
  'available',
  (select id from vehicles where plate_number='VAN-001'),
  ST_SetSRID(ST_Point(-0.1276,51.5072),4326)
),
(
  'Sarah Williams',
  '555-1002',
  'available',
  (select id from vehicles where plate_number='VAN-002'),
  ST_SetSRID(ST_Point(-0.1200,51.5050),4326)
),
(
  'David Brown',
  '555-1003',
  'available',
  (select id from vehicles where plate_number='BIKE-001'),
  ST_SetSRID(ST_Point(-0.1300,51.5030),4326)
);


-- JOBS

insert into jobs (
  customer_name,
  customer_phone,
  pickup_address,
  dropoff_address,
  pickup_lat,
  pickup_lng,
  dropoff_lat,
  dropoff_lng,
  parcel_type,
  priority,
  status,
  scheduled_pickup_at
)
values
(
  'Acme Corp',
  '555-2001',
  '10 Baker Street',
  '22 Oxford Street',
  51.5200,
  -0.1550,
  51.5150,
  -0.1410,
  'package',
  'high',
  'pending',
  now()
),
(
  'John Doe',
  '555-2002',
  '5 Station Road',
  '12 Market Street',
  51.5080,
  -0.1280,
  51.5070,
  -0.1200,
  'document',
  'medium',
  'pending',
  now()
),
(
  'QuickShip Ltd',
  '555-2003',
  '18 King Street',
  '45 Fleet Street',
  51.5100,
  -0.1400,
  51.5130,
  -0.1050,
  'parcel',
  'low',
  'pending',
  now()
);