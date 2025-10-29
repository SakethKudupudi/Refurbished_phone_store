-- Insert iPhone models from 2021-2025
-- First, get the Apple brand ID (assuming it's already in the database)

-- 2021 Models
INSERT INTO models (name, release_year, brand_id, created_at, updated_at) VALUES
('iPhone 13', 2021, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 13 Mini', 2021, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 13 Pro', 2021, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 13 Pro Max', 2021, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW());

-- 2022 Models
INSERT INTO models (name, release_year, brand_id, created_at, updated_at) VALUES
('iPhone SE (3rd Gen)', 2022, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 14', 2022, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 14 Plus', 2022, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 14 Pro', 2022, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 14 Pro Max', 2022, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW());

-- 2023 Models
INSERT INTO models (name, release_year, brand_id, created_at, updated_at) VALUES
('iPhone 15', 2023, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 15 Plus', 2023, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 15 Pro', 2023, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 15 Pro Max', 2023, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW());

-- 2024 Models
INSERT INTO models (name, release_year, brand_id, created_at, updated_at) VALUES
('iPhone 16', 2024, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 16 Plus', 2024, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 16 Pro', 2024, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 16 Pro Max', 2024, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 16e', 2024, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW());

-- 2025 Models
INSERT INTO models (name, release_year, brand_id, created_at, updated_at) VALUES
('iPhone 17', 2025, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 17 Plus', 2025, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 17 Air', 2025, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 17 Pro', 2025, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW()),
('iPhone 17 Pro Max', 2025, (SELECT id FROM brands WHERE name = 'Apple'), NOW(), NOW());

-- Insert components for each model
-- Component types: SCREEN, BATTERY, CAMERA_REAR, CAMERA_FRONT, MOTHERBOARD, CHARGING_PORT, SPEAKER, BACK_COVER, OTHER

-- iPhone 13 Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 13 OLED Display', 'SCREEN', '6.1" Super Retina XDR OLED Display', 89.99, 50, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 6, 'BOE Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Battery', 'BATTERY', '3227mAh Li-Ion Battery', 39.99, 75, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Dual Camera', 'CAMERA_REAR', '12MP Wide + Ultra Wide Camera System', 129.99, 30, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Motherboard', 'MOTHERBOARD', 'A15 Bionic Logic Board', 299.99, 15, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 6, 'Apple', 'REFURBISHED', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Charging Port', 'CHARGING_PORT', 'Lightning Charging Port Assembly', 24.99, 100, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Speaker', 'SPEAKER', 'Bottom Speaker Assembly', 19.99, 80, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 6, 'Goertek', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Back Glass', 'BACK_COVER', 'Back Glass Panel with Camera Frame', 49.99, 60, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 3, 'Lens Technology', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Front Camera', 'CAMERA_FRONT', '12MP TrueDepth Front Camera', 79.99, 40, (SELECT id FROM models WHERE name = 'iPhone 13'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 13 Pro Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 13 Pro ProMotion Display', 'SCREEN', '6.1" Super Retina XDR OLED 120Hz Display', 149.99, 35, (SELECT id FROM models WHERE name = 'iPhone 13 Pro'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Pro Battery', 'BATTERY', '3095mAh Li-Ion Battery', 44.99, 60, (SELECT id FROM models WHERE name = 'iPhone 13 Pro'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Pro Triple Camera', 'CAMERA_REAR', '12MP Telephoto + Wide + Ultra Wide Camera', 199.99, 25, (SELECT id FROM models WHERE name = 'iPhone 13 Pro'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Pro Motherboard', 'MOTHERBOARD', 'A15 Bionic Pro Logic Board', 349.99, 10, (SELECT id FROM models WHERE name = 'iPhone 13 Pro'), 5, 6, 'Apple', 'REFURBISHED', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Pro Charging Port', 'CHARGING_PORT', 'Lightning Charging Port Assembly', 29.99, 85, (SELECT id FROM models WHERE name = 'iPhone 13 Pro'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 14 Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 14 OLED Display', 'SCREEN', '6.1" Super Retina XDR OLED Display', 99.99, 70, (SELECT id FROM models WHERE name = 'iPhone 14'), 5, 6, 'BOE Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Battery', 'BATTERY', '3279mAh Li-Ion Battery', 42.99, 90, (SELECT id FROM models WHERE name = 'iPhone 14'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Dual Camera', 'CAMERA_REAR', '12MP Main + Ultra Wide Camera System', 139.99, 45, (SELECT id FROM models WHERE name = 'iPhone 14'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Motherboard', 'MOTHERBOARD', 'A15 Bionic Logic Board', 319.99, 20, (SELECT id FROM models WHERE name = 'iPhone 14'), 5, 6, 'Apple', 'REFURBISHED', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Back Glass', 'BACK_COVER', 'Back Glass Panel with Camera Frame', 54.99, 65, (SELECT id FROM models WHERE name = 'iPhone 14'), 5, 3, 'Lens Technology', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Front Camera', 'CAMERA_FRONT', '12MP TrueDepth Front Camera', 84.99, 50, (SELECT id FROM models WHERE name = 'iPhone 14'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 14 Pro Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 14 Pro Dynamic Island Display', 'SCREEN', '6.1" Super Retina XDR OLED 120Hz Display', 179.99, 40, (SELECT id FROM models WHERE name = 'iPhone 14 Pro'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Pro Battery', 'BATTERY', '3200mAh Li-Ion Battery', 49.99, 55, (SELECT id FROM models WHERE name = 'iPhone 14 Pro'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Pro Triple Camera', 'CAMERA_REAR', '48MP Main + 12MP Telephoto + 12MP Ultra Wide', 249.99, 30, (SELECT id FROM models WHERE name = 'iPhone 14 Pro'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Pro Motherboard', 'MOTHERBOARD', 'A16 Bionic Logic Board', 399.99, 12, (SELECT id FROM models WHERE name = 'iPhone 14 Pro'), 5, 6, 'Apple', 'REFURBISHED', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Pro Charging Port', 'CHARGING_PORT', 'Lightning Charging Port Assembly', 32.99, 75, (SELECT id FROM models WHERE name = 'iPhone 14 Pro'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 15 Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 15 OLED Display', 'SCREEN', '6.1" Super Retina XDR OLED Display', 109.99, 80, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 6, 'BOE Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Battery', 'BATTERY', '3349mAh Li-Ion Battery', 46.99, 95, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Dual Camera', 'CAMERA_REAR', '48MP Main + 12MP Ultra Wide Camera', 159.99, 50, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Motherboard', 'MOTHERBOARD', 'A16 Bionic Logic Board', 349.99, 18, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 6, 'Apple', 'REFURBISHED', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 USB-C Port', 'CHARGING_PORT', 'USB-C Charging Port Assembly', 34.99, 90, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Speaker', 'SPEAKER', 'Bottom Speaker Assembly', 22.99, 70, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 6, 'Goertek', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Back Glass', 'BACK_COVER', 'Color-Infused Back Glass Panel', 59.99, 60, (SELECT id FROM models WHERE name = 'iPhone 15'), 5, 3, 'Lens Technology', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 15 Pro Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 15 Pro Titanium Display', 'SCREEN', '6.1" Super Retina XDR OLED 120Hz Display', 199.99, 45, (SELECT id FROM models WHERE name = 'iPhone 15 Pro'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Pro Battery', 'BATTERY', '3274mAh Li-Ion Battery', 54.99, 65, (SELECT id FROM models WHERE name = 'iPhone 15 Pro'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Pro Triple Camera', 'CAMERA_REAR', '48MP Main + 12MP Telephoto + 12MP Ultra Wide', 279.99, 35, (SELECT id FROM models WHERE name = 'iPhone 15 Pro'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Pro Motherboard', 'MOTHERBOARD', 'A17 Pro Logic Board', 449.99, 15, (SELECT id FROM models WHERE name = 'iPhone 15 Pro'), 5, 6, 'Apple', 'REFURBISHED', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Pro USB-C Port', 'CHARGING_PORT', 'USB-C 3.0 Charging Port Assembly', 39.99, 80, (SELECT id FROM models WHERE name = 'iPhone 15 Pro'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Pro Action Button', 'OTHER', 'Customizable Action Button Assembly', 29.99, 55, (SELECT id FROM models WHERE name = 'iPhone 15 Pro'), 5, 6, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 16 Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 16 OLED Display', 'SCREEN', '6.1" Super Retina XDR OLED Display', 119.99, 100, (SELECT id FROM models WHERE name = 'iPhone 16'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Battery', 'BATTERY', '3561mAh Li-Ion Battery', 49.99, 120, (SELECT id FROM models WHERE name = 'iPhone 16'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Fusion Camera', 'CAMERA_REAR', '48MP Fusion + 12MP Ultra Wide Camera', 169.99, 70, (SELECT id FROM models WHERE name = 'iPhone 16'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Motherboard', 'MOTHERBOARD', 'A18 Bionic Logic Board', 379.99, 25, (SELECT id FROM models WHERE name = 'iPhone 16'), 5, 6, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 USB-C Port', 'CHARGING_PORT', 'USB-C Charging Port Assembly', 36.99, 95, (SELECT id FROM models WHERE name = 'iPhone 16'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Camera Control Button', 'OTHER', 'Haptic Camera Control Button', 34.99, 60, (SELECT id FROM models WHERE name = 'iPhone 16'), 5, 6, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 16 Pro Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 16 Pro Display', 'SCREEN', '6.3" Super Retina XDR OLED 120Hz Display', 229.99, 50, (SELECT id FROM models WHERE name = 'iPhone 16 Pro'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Pro Battery', 'BATTERY', '3582mAh Li-Ion Battery', 59.99, 70, (SELECT id FROM models WHERE name = 'iPhone 16 Pro'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Pro Triple Camera', 'CAMERA_REAR', '48MP Fusion + 48MP Ultra Wide + 12MP Telephoto 5x', 319.99, 40, (SELECT id FROM models WHERE name = 'iPhone 16 Pro'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Pro Motherboard', 'MOTHERBOARD', 'A18 Pro Logic Board', 499.99, 18, (SELECT id FROM models WHERE name = 'iPhone 16 Pro'), 5, 6, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Pro USB-C Port', 'CHARGING_PORT', 'USB-C 3.0 Charging Port Assembly', 42.99, 85, (SELECT id FROM models WHERE name = 'iPhone 16 Pro'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 17 Components (2025 - Latest)
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 17 OLED Display', 'SCREEN', '6.1" Super Retina XDR OLED Display', 129.99, 85, (SELECT id FROM models WHERE name = 'iPhone 17'), 5, 12, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Battery', 'BATTERY', '3650mAh Li-Ion Battery', 54.99, 100, (SELECT id FROM models WHERE name = 'iPhone 17'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Advanced Camera', 'CAMERA_REAR', '48MP Main + 48MP Ultra Wide Camera System', 189.99, 60, (SELECT id FROM models WHERE name = 'iPhone 17'), 5, 12, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Motherboard', 'MOTHERBOARD', 'A19 Bionic Logic Board', 429.99, 20, (SELECT id FROM models WHERE name = 'iPhone 17'), 5, 12, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 USB-C Port', 'CHARGING_PORT', 'USB-C 3.1 Charging Port Assembly', 39.99, 90, (SELECT id FROM models WHERE name = 'iPhone 17'), 5, 12, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 17 Pro Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 17 Pro Display', 'SCREEN', '6.3" Super Retina XDR OLED 120Hz Display', 249.99, 45, (SELECT id FROM models WHERE name = 'iPhone 17 Pro'), 5, 12, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Pro Battery', 'BATTERY', '3700mAh Li-Ion Battery', 64.99, 65, (SELECT id FROM models WHERE name = 'iPhone 17 Pro'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Pro Quad Camera', 'CAMERA_REAR', '48MP Main + 48MP Ultra Wide + 12MP Telephoto 5x + Periscope', 349.99, 35, (SELECT id FROM models WHERE name = 'iPhone 17 Pro'), 5, 12, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Pro Motherboard', 'MOTHERBOARD', 'A19 Pro Logic Board', 549.99, 15, (SELECT id FROM models WHERE name = 'iPhone 17 Pro'), 5, 12, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Pro USB-C Port', 'CHARGING_PORT', 'USB-C 3.1 Thunderbolt Port Assembly', 49.99, 75, (SELECT id FROM models WHERE name = 'iPhone 17 Pro'), 5, 12, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 17 Air Components (Ultra-slim model)
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 17 Air Slim Display', 'SCREEN', '6.6" Ultra-Thin Super Retina XDR OLED Display', 269.99, 30, (SELECT id FROM models WHERE name = 'iPhone 17 Air'), 5, 12, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Air Battery', 'BATTERY', '3200mAh Ultra-Slim Li-Ion Battery', 69.99, 40, (SELECT id FROM models WHERE name = 'iPhone 17 Air'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Air Camera', 'CAMERA_REAR', '48MP Single Camera System', 159.99, 35, (SELECT id FROM models WHERE name = 'iPhone 17 Air'), 5, 12, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Air Motherboard', 'MOTHERBOARD', 'A19 Compact Logic Board', 479.99, 12, (SELECT id FROM models WHERE name = 'iPhone 17 Air'), 5, 12, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW());

-- Add some components for other models (Mini, Plus, Pro Max, SE, 16e)
-- iPhone 13 Mini Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 13 Mini OLED Display', 'SCREEN', '5.4" Super Retina XDR OLED Display', 79.99, 40, (SELECT id FROM models WHERE name = 'iPhone 13 Mini'), 5, 6, 'BOE Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Mini Battery', 'BATTERY', '2406mAh Li-Ion Battery', 34.99, 60, (SELECT id FROM models WHERE name = 'iPhone 13 Mini'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 13 Mini Dual Camera', 'CAMERA_REAR', '12MP Wide + Ultra Wide Camera System', 119.99, 25, (SELECT id FROM models WHERE name = 'iPhone 13 Mini'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 14 Plus Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 14 Plus OLED Display', 'SCREEN', '6.7" Super Retina XDR OLED Display', 129.99, 50, (SELECT id FROM models WHERE name = 'iPhone 14 Plus'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Plus Battery', 'BATTERY', '4325mAh Li-Ion Battery', 54.99, 70, (SELECT id FROM models WHERE name = 'iPhone 14 Plus'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 14 Plus Camera', 'CAMERA_REAR', '12MP Main + Ultra Wide Camera System', 149.99, 40, (SELECT id FROM models WHERE name = 'iPhone 14 Plus'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 15 Plus Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 15 Plus OLED Display', 'SCREEN', '6.7" Super Retina XDR OLED Display', 139.99, 55, (SELECT id FROM models WHERE name = 'iPhone 15 Plus'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Plus Battery', 'BATTERY', '4383mAh Li-Ion Battery', 59.99, 75, (SELECT id FROM models WHERE name = 'iPhone 15 Plus'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 15 Plus Camera', 'CAMERA_REAR', '48MP Main + 12MP Ultra Wide Camera', 169.99, 45, (SELECT id FROM models WHERE name = 'iPhone 15 Plus'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone SE 3rd Gen Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone SE 3 LCD Display', 'SCREEN', '4.7" Retina HD LCD Display', 49.99, 80, (SELECT id FROM models WHERE name = 'iPhone SE (3rd Gen)'), 5, 6, 'JDI Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone SE 3 Battery', 'BATTERY', '2018mAh Li-Ion Battery', 29.99, 100, (SELECT id FROM models WHERE name = 'iPhone SE (3rd Gen)'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone SE 3 Camera', 'CAMERA_REAR', '12MP Single Camera', 69.99, 50, (SELECT id FROM models WHERE name = 'iPhone SE (3rd Gen)'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone SE 3 Home Button', 'OTHER', 'Touch ID Home Button Assembly', 39.99, 60, (SELECT id FROM models WHERE name = 'iPhone SE (3rd Gen)'), 5, 6, 'Apple', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 16e Components (Budget model)
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 16e OLED Display', 'SCREEN', '6.1" Super Retina OLED Display', 99.99, 75, (SELECT id FROM models WHERE name = 'iPhone 16e'), 5, 6, 'BOE Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16e Battery', 'BATTERY', '3279mAh Li-Ion Battery', 44.99, 90, (SELECT id FROM models WHERE name = 'iPhone 16e'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16e Camera', 'CAMERA_REAR', '48MP Single Camera System', 129.99, 55, (SELECT id FROM models WHERE name = 'iPhone 16e'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16e USB-C Port', 'CHARGING_PORT', 'USB-C Charging Port Assembly', 34.99, 80, (SELECT id FROM models WHERE name = 'iPhone 16e'), 5, 6, 'Foxconn', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 16 Plus Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 16 Plus OLED Display', 'SCREEN', '6.7" Super Retina XDR OLED Display', 149.99, 60, (SELECT id FROM models WHERE name = 'iPhone 16 Plus'), 5, 6, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Plus Battery', 'BATTERY', '4674mAh Li-Ion Battery', 64.99, 80, (SELECT id FROM models WHERE name = 'iPhone 16 Plus'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 16 Plus Camera', 'CAMERA_REAR', '48MP Fusion + 12MP Ultra Wide Camera', 179.99, 50, (SELECT id FROM models WHERE name = 'iPhone 16 Plus'), 5, 6, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());

-- iPhone 17 Plus Components
INSERT INTO components (name, component_type, description, price, quantity_available, model_id, vendor_id, warranty_months, manufacturer, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 17 Plus OLED Display', 'SCREEN', '6.7" Super Retina XDR OLED Display', 159.99, 55, (SELECT id FROM models WHERE name = 'iPhone 17 Plus'), 5, 12, 'Samsung Display', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Plus Battery', 'BATTERY', '4800mAh Li-Ion Battery', 69.99, 75, (SELECT id FROM models WHERE name = 'iPhone 17 Plus'), 5, 12, 'ATL Battery', 'NEW', 'APPROVED', true, NOW(), NOW()),
('iPhone 17 Plus Camera', 'CAMERA_REAR', '48MP Main + 48MP Ultra Wide Camera System', 199.99, 45, (SELECT id FROM models WHERE name = 'iPhone 17 Plus'), 5, 12, 'Sony Camera', 'NEW', 'APPROVED', true, NOW(), NOW());
