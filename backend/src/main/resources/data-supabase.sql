-- PostgreSQL-compatible seed data for Mobile Parts E-Commerce
-- Supabase uses PostgreSQL, so we can use standard PostgreSQL syntax

-- Insert Brands
INSERT INTO brands (id, name, category, created_at, updated_at) VALUES 
(1, 'Apple', 'APPLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Samsung', 'ANDROID', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Google', 'ANDROID', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'OnePlus', 'ANDROID', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Xiaomi', 'ANDROID', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for brands
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));

-- Insert Apple iPhone Models
INSERT INTO models (id, name, brand_id, release_year, created_at, updated_at) VALUES 
(1, 'iPhone 15 Pro Max', 1, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'iPhone 15 Pro', 1, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'iPhone 15', 1, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'iPhone 14 Pro Max', 1, 2022, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'iPhone 14 Pro', 1, 2022, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'iPhone 14', 1, 2022, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(28, 'iPhone 16 Pro Max', 1, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(29, 'iPhone 16 Pro', 1, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(30, 'iPhone 16', 1, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(31, 'iPhone 17 Pro Max', 1, 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(32, 'iPhone 17 Pro', 1, 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(33, 'iPhone 17', 1, 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert Samsung Models
INSERT INTO models (id, name, brand_id, release_year, created_at, updated_at) VALUES 
(11, 'Galaxy S24 Ultra', 2, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Galaxy S24 Plus', 2, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Galaxy S24', 2, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Galaxy S23 Ultra', 2, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert Google Models
INSERT INTO models (id, name, brand_id, release_year, created_at, updated_at) VALUES 
(21, 'Pixel 8 Pro', 3, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(22, 'Pixel 8', 3, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert OnePlus Models
INSERT INTO models (id, name, brand_id, release_year, created_at, updated_at) VALUES 
(41, 'OnePlus 12', 4, 2024, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(42, 'OnePlus 11', 4, 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for models
SELECT setval('models_id_seq', (SELECT MAX(id) FROM models));

-- Insert Components for iPhone 15 Pro Max (model_id: 1)
INSERT INTO components (id, name, type, price, stock_quantity, model_id, brand_id, created_at, updated_at) VALUES 
(1, 'iPhone 15 Pro Max OLED Display', 'SCREEN', 299.99, 50, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'iPhone 15 Pro Max Battery', 'BATTERY', 79.99, 100, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'iPhone 15 Pro Max Camera Module', 'CAMERA', 199.99, 75, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'iPhone 15 Pro Max Charging Port', 'CHARGING_PORT', 39.99, 150, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert Components for iPhone 15 Pro (model_id: 2)
INSERT INTO components (id, name, type, price, stock_quantity, model_id, brand_id, created_at, updated_at) VALUES 
(11, 'iPhone 15 Pro OLED Display', 'SCREEN', 279.99, 60, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'iPhone 15 Pro Battery', 'BATTERY', 69.99, 120, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'iPhone 15 Pro Camera Module', 'CAMERA', 179.99, 80, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'iPhone 15 Pro Charging Port', 'CHARGING_PORT', 39.99, 140, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert Components for iPhone 14 Pro Max (model_id: 4)
INSERT INTO components (id, name, type, price, stock_quantity, model_id, brand_id, created_at, updated_at) VALUES 
(21, 'iPhone 14 Pro Max OLED Display', 'SCREEN', 269.99, 55, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(22, 'iPhone 14 Pro Max Battery', 'BATTERY', 74.99, 110, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(23, 'iPhone 14 Pro Max Camera Module', 'CAMERA', 169.99, 70, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(24, 'iPhone 14 Pro Max Back Cover', 'BACK_COVER', 89.99, 90, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert Components for Galaxy S24 Ultra (model_id: 11)
INSERT INTO components (id, name, type, price, stock_quantity, model_id, brand_id, created_at, updated_at) VALUES 
(101, 'Galaxy S24 Ultra AMOLED Display', 'SCREEN', 289.99, 45, 11, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(102, 'Galaxy S24 Ultra Battery', 'BATTERY', 69.99, 95, 11, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(103, 'Galaxy S24 Ultra Camera Module', 'CAMERA', 189.99, 65, 11, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(104, 'Galaxy S24 Ultra S Pen', 'OTHER', 49.99, 120, 11, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Insert Components for Pixel 8 Pro (model_id: 21)
INSERT INTO components (id, name, type, price, stock_quantity, model_id, brand_id, created_at, updated_at) VALUES 
(201, 'Pixel 8 Pro OLED Display', 'SCREEN', 249.99, 40, 21, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(202, 'Pixel 8 Pro Battery', 'BATTERY', 64.99, 85, 21, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(203, 'Pixel 8 Pro Camera Module', 'CAMERA', 159.99, 60, 21, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for components
SELECT setval('components_id_seq', (SELECT MAX(id) FROM components));
