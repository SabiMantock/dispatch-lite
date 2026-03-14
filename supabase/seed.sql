-- Seed data for DispatchLite

-- Vehicles
insert into vehicles (id, plate_number, type, capacity, status) values
  ('a1000000-0000-0000-0000-000000000001', 'VAN-001', 'van', 100, 'available'),
  ('a1000000-0000-0000-0000-000000000002', 'VAN-002', 'van', 120, 'available'),
  ('a1000000-0000-0000-0000-000000000003', 'BIKE-001', 'bike', 20, 'available'),
  ('a1000000-0000-0000-0000-000000000004', 'VAN-003', 'van', 150, 'maintenance');

-- Drivers (each tied to a vehicle, London coordinates)
insert into drivers (id, name, phone, status, vehicle_id, location) values
  ('b1000000-0000-0000-0000-000000000001', 'Michael Johnson', '555-1001', 'available',
   'a1000000-0000-0000-0000-000000000001', ST_Point(-0.1276, 51.5072, 4326)),
  ('b1000000-0000-0000-0000-000000000002', 'Sarah Williams', '555-1002', 'busy',
   'a1000000-0000-0000-0000-000000000002', ST_Point(-0.1200, 51.5050, 4326)),
  ('b1000000-0000-0000-0000-000000000003', 'David Brown', '555-1003', 'available',
   'a1000000-0000-0000-0000-000000000003', ST_Point(-0.1300, 51.5030, 4326)),
  ('b1000000-0000-0000-0000-000000000004', 'Emma Davis', '555-1004', 'offline',
   'a1000000-0000-0000-0000-000000000004', ST_Point(-0.1150, 51.5100, 4326));

-- Jobs (mix of statuses to test UI)
insert into jobs (id, customer_name, customer_phone, pickup_address, dropoff_address,
  pickup_lat, pickup_lng, dropoff_lat, dropoff_lng, parcel_type, priority, status,
  scheduled_pickup_at, driver_id, assigned_at, picked_up_at, in_transit_at) values
  -- Pending jobs (no driver)
  ('c1000000-0000-0000-0000-000000000001', 'Acme Corp', '555-2001',
   '221B Baker Street', '10 Oxford Street',
   51.5238, -0.1585, 51.5154, -0.1410, 'package', 'high', 'pending',
   now() + interval '2 hours', null, null, null, null),
  ('c1000000-0000-0000-0000-000000000002', 'John Doe', '555-2002',
   '15 Station Road', '42 Market Street',
   51.5300, -0.1230, 51.5180, -0.1350, 'document', 'medium', 'pending',
   now() + interval '4 hours', null, null, null, null),
  ('c1000000-0000-0000-0000-000000000003', 'QuickShip Ltd', '555-2003',
   '8 King Street', '55 Fleet Street',
   51.5115, -0.1270, 51.5139, -0.1087, 'parcel', 'low', 'pending',
   now() + interval '6 hours', null, null, null, null),
  -- Assigned job
  ('c1000000-0000-0000-0000-000000000004', 'Metro Logistics', '555-2004',
   '3 Victoria Lane', '28 Regent Street',
   51.4965, -0.1440, 51.5100, -0.1340, 'package', 'high', 'assigned',
   now() + interval '1 hour',
   'b1000000-0000-0000-0000-000000000002',
   now() - interval '30 minutes', null, null),
  -- In-transit job
  ('c1000000-0000-0000-0000-000000000005', 'Express Parcels', '555-2005',
   '12 Camden Road', '7 Piccadilly',
   51.5392, -0.1426, 51.5098, -0.1342, 'fragile', 'medium', 'in_transit',
   now() - interval '1 hour',
   'b1000000-0000-0000-0000-000000000002',
   now() - interval '2 hours', now() - interval '1.5 hours', now() - interval '1 hour');
