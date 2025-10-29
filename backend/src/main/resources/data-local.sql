-- Sample data for local development
-- This script matches the actual database schema

-- Insert Brands
INSERT INTO brands (name, description, category, logo_url, is_active, created_at, updated_at) VALUES
('Apple', 'Premium smartphones and tablets', 'APPLE', '/application_images/apple_main.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Samsung', 'Leading Android smartphone manufacturer', 'ANDROID', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Google', 'Pixel smartphones with pure Android experience', 'ANDROID', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OnePlus', 'Flagship killer smartphones', 'ANDROID', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Insert Models for Apple
INSERT INTO models (name, model_number, brand_id, release_year, description, image_url, is_active, created_at, updated_at) VALUES
('iPhone 14 Pro', 'A2894', 1, 2022, '6.1" Super Retina XDR display with ProMotion', 'https://images.unsplash.com/photo-1663499482523-1c0f1c6b799e?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 13', 'A2482', 1, 2021, '6.1" Super Retina XDR display', 'https://images.unsplash.com/photo-1632633728024-e1fd4e3b7614?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 12', 'A2172', 1, 2020, '6.1" Super Retina XDR display', 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO models (name, model_number, brand_id, release_year, description, image_url, is_active, created_at, updated_at) VALUES
('iPhone 14 Pro', 'A2894', 1, 2022, '6.1" Super Retina XDR display with ProMotion', 'https://images.unsplash.com/photo-1663499482523-1c0f1c6b799e?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 13', 'A2482', 1, 2021, '6.1" Super Retina XDR display', 'https://images.unsplash.com/photo-1632633728024-e1fd4e3b7614?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 12', 'A2172', 1, 2020, '6.1" Super Retina XDR display', 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Insert Models for Samsung
INSERT INTO models (name, model_number, brand_id, release_year, description, image_url, is_active, created_at, updated_at) VALUES
('Galaxy S23 Ultra', 'SM-S918', 2, 2023, '6.8" Dynamic AMOLED 2X display with 120Hz', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Galaxy S22', 'SM-S901', 2, 2022, '6.1" Dynamic AMOLED 2X display', 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b9?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Models for Google
INSERT INTO models (name, model_number, brand_id, release_year, description, image_url, is_active, created_at, updated_at) VALUES
('Pixel 7 Pro', 'GP4BC', 3, 2022, '6.7" LTPO OLED display with 120Hz', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pixel 6', 'GB7N6', 3, 2021, '6.4" AMOLED display with 90Hz', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Components for iPhone 14 Pro (model_id = 1, vendor_id = 2)
INSERT INTO components (name, sku, model_id, vendor_id, component_type, description, price, quantity_available, image_url, manufacturer, warranty_months, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 14 Pro OLED Display', 'IP14P-DISP-001', 1, 2, 'DISPLAY', 'Original 6.1" Super Retina XDR OLED display with ProMotion', 299.99, 50, 'https://images.unsplash.com/photo-1592286927505-ed6d11384aa8?w=800&q=80', 'Apple', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 14 Pro Battery', 'IP14P-BATT-001', 1, 2, 'BATTERY', 'Original 3200mAh Li-Ion battery', 89.99, 100, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80', 'Apple', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 14 Pro Camera Module', 'IP14P-CAM-001', 1, 2, 'CAMERA', '48MP Main + 12MP Ultra Wide + 12MP Telephoto', 199.99, 30, 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&q=80', 'Apple', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 14 Pro Charging Port', 'IP14P-PORT-001', 1, 2, 'CHARGING_PORT', 'Lightning port assembly with flex cable', 49.99, 75, 'https://images.unsplash.com/photo-1591290619762-c588f7e4dce5?w=800&q=80', 'Apple', 6, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Components for iPhone 13 (model_id = 2, vendor_id = 2)
INSERT INTO components (name, sku, model_id, vendor_id, component_type, description, price, quantity_available, image_url, manufacturer, warranty_months, condition, approval_status, is_active, created_at, updated_at) VALUES
('iPhone 13 OLED Display', 'IP13-DISP-001', 2, 2, 'DISPLAY', 'Original 6.1" Super Retina XDR display', 249.99, 60, 'https://images.unsplash.com/photo-1592286927505-ed6d11384aa8?w=800&q=80', 'Apple', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 13 Battery', 'IP13-BATT-001', 2, 2, 'BATTERY', 'Original 3240mAh Li-Ion battery', 79.99, 120, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80', 'Apple', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 13 Rear Camera', 'IP13-CAM-001', 2, 2, 'CAMERA', '12MP Wide + 12MP Ultra Wide dual camera', 179.99, 40, 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&q=80', 'Apple', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Components for Galaxy S23 Ultra (model_id = 4, vendor_id = 2)
INSERT INTO components (name, sku, model_id, vendor_id, component_type, description, price, quantity_available, image_url, manufacturer, warranty_months, condition, approval_status, is_active, created_at, updated_at) VALUES
('Galaxy S23 Ultra AMOLED Display', 'GS23U-DISP-001', 4, 2, 'DISPLAY', '6.8" Dynamic AMOLED 2X display with 120Hz', 349.99, 40, 'https://images.unsplash.com/photo-1592286927505-ed6d11384aa8?w=800&q=80', 'Samsung', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Galaxy S23 Ultra Battery', 'GS23U-BATT-001', 4, 2, 'BATTERY', 'Original 5000mAh Li-Ion battery', 99.99, 80, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80', 'Samsung', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Galaxy S23 Ultra Camera System', 'GS23U-CAM-001', 4, 2, 'CAMERA', '200MP Main + 12MP Ultra Wide + 10MP Telephoto cameras', 249.99, 25, 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&q=80', 'Samsung', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Components for Pixel 7 Pro (model_id = 6, vendor_id = 2)
INSERT INTO components (name, sku, model_id, vendor_id, component_type, description, price, quantity_available, image_url, manufacturer, warranty_months, condition, approval_status, is_active, created_at, updated_at) VALUES
('Pixel 7 Pro OLED Display', 'PX7P-DISP-001', 6, 2, 'DISPLAY', '6.7" LTPO OLED display with 120Hz', 279.99, 35, 'https://images.unsplash.com/photo-1592286927505-ed6d11384aa8?w=800&q=80', 'Google', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pixel 7 Pro Battery', 'PX7P-BATT-001', 6, 2, 'BATTERY', 'Original 5000mAh Li-Po battery', 89.99, 90, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80', 'Google', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pixel 7 Pro Camera Bar', 'PX7P-CAM-001', 6, 2, 'CAMERA', '50MP Main + 48MP Telephoto + 12MP Ultra Wide', 229.99, 20, 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&q=80', 'Google', 12, 'NEW', 'APPROVED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert test users
INSERT INTO users (email, first_name, last_name, phone_number, firebase_uid, is_active, is_deleted, created_at, updated_at) VALUES
('customer@test.com', 'Test', 'Customer', '+1234567890', 'test-customer-uid', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('vendor@test.com', 'Test', 'Vendor', '+1234567891', 'test-vendor-uid', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin@test.com', 'Test', 'Admin', '+1234567892', 'test-admin-uid', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Link users with roles (using user IDs)
INSERT INTO user_roles (user_id, role) VALUES
(1, 'CUSTOMER'),
(2, 'VENDOR'),
(3, 'ADMIN')
ON CONFLICT DO NOTHING;

