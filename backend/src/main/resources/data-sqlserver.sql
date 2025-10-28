-- Insert sample data for Mobile Parts E-Commerce application
-- This script is compatible with SQL Server syntax

-- Insert Brands
SET IDENTITY_INSERT brands ON;
INSERT INTO brands (id, name, category, created_at, updated_at) VALUES 
(1, 'Apple', 'APPLE', GETDATE(), GETDATE()),
(2, 'Samsung', 'ANDROID', GETDATE(), GETDATE()),
(3, 'Google', 'ANDROID', GETDATE(), GETDATE()),
(4, 'OnePlus', 'ANDROID', GETDATE(), GETDATE());
SET IDENTITY_INSERT brands OFF;

-- Insert Models
SET IDENTITY_INSERT models ON;
INSERT INTO models (id, name, brand_id, release_year, created_at, updated_at) VALUES
-- Apple iPhones
(1, 'iPhone 15 Pro Max', 1, 2023, GETDATE(), GETDATE()),
(2, 'iPhone 15 Pro', 1, 2023, GETDATE(), GETDATE()),
(3, 'iPhone 15', 1, 2023, GETDATE(), GETDATE()),
(4, 'iPhone 14 Pro Max', 1, 2022, GETDATE(), GETDATE()),
(5, 'iPhone 14 Pro', 1, 2022, GETDATE(), GETDATE()),
(6, 'iPhone 14', 1, 2022, GETDATE(), GETDATE()),
(7, 'iPhone 13 Pro', 1, 2021, GETDATE(), GETDATE()),
(8, 'iPhone 13', 1, 2021, GETDATE(), GETDATE()),
(9, 'iPhone 12 Pro', 1, 2020, GETDATE(), GETDATE()),
(10, 'iPhone 12', 1, 2020, GETDATE(), GETDATE()),
-- Samsung Galaxy
(11, 'Galaxy S24 Ultra', 2, 2024, GETDATE(), GETDATE()),
(12, 'Galaxy S24 Plus', 2, 2024, GETDATE(), GETDATE()),
(13, 'Galaxy S24', 2, 2024, GETDATE(), GETDATE()),
(14, 'Galaxy S23 Ultra', 2, 2023, GETDATE(), GETDATE()),
(15, 'Galaxy S23', 2, 2023, GETDATE(), GETDATE()),
(16, 'Galaxy S22 Ultra', 2, 2022, GETDATE(), GETDATE()),
(17, 'Galaxy S22', 2, 2022, GETDATE(), GETDATE()),
(18, 'Galaxy Z Fold 5', 2, 2023, GETDATE(), GETDATE()),
(19, 'Galaxy Z Flip 5', 2, 2023, GETDATE(), GETDATE()),
-- Google Pixel
(20, 'Pixel 8 Pro', 3, 2023, GETDATE(), GETDATE()),
(21, 'Pixel 8', 3, 2023, GETDATE(), GETDATE()),
(22, 'Pixel 7 Pro', 3, 2022, GETDATE(), GETDATE()),
(23, 'Pixel 7', 3, 2022, GETDATE(), GETDATE()),
(24, 'Pixel 6 Pro', 3, 2021, GETDATE(), GETDATE()),
(25, 'Pixel 6', 3, 2021, GETDATE(), GETDATE()),
-- OnePlus
(26, 'OnePlus 12', 4, 2024, GETDATE(), GETDATE()),
(27, 'OnePlus 11', 4, 2023, GETDATE(), GETDATE());
SET IDENTITY_INSERT models OFF;

-- Insert Users
SET IDENTITY_INSERT users ON;
INSERT INTO users (id, email, first_name, last_name, phone_number, address_line1, city, state, country, postal_code, created_at, updated_at) VALUES
(1, 'admin@mobileparts.com', 'Admin', 'User', '1234567890', '123 Admin St', 'Seattle', 'WA', 'USA', '98101', GETDATE(), GETDATE()),
(2, 'vendor@mobileparts.com', 'Vendor', 'User', '1234567891', '456 Vendor Ave', 'Portland', 'OR', 'USA', '97201', GETDATE(), GETDATE()),
(3, 'customer@mobileparts.com', 'Customer', 'User', '1234567892', '789 Customer Blvd', 'San Francisco', 'CA', 'USA', '94102', GETDATE(), GETDATE());
SET IDENTITY_INSERT users OFF;

-- Insert User Roles
INSERT INTO user_roles (user_id, role) VALUES
(1, 'ADMIN'),
(1, 'VENDOR'),
(1, 'CUSTOMER'),
(2, 'VENDOR'),
(3, 'VENDOR'),
(4, 'CUSTOMER'),
(5, 'CUSTOMER'),
(6, 'CUSTOMER');

-- Insert Components (Mobile Parts)
INSERT INTO components (id, name, description, component_type, model_id, vendor_id, price, stock_quantity, sku, image_url, warranty_period_days, approval_status, created_at, updated_at) VALUES
-- iPhone 15 Pro Max Components
(1, 'iPhone 15 Pro Max OLED Display', 'Original quality 6.7" Super Retina XDR display', 'SCREEN', 1, 2, 299.99, 50, 'IP15PM-SCR-001', 'https://via.placeholder.com/300x300.png?text=iPhone+15+Pro+Max+Screen', 90, 'APPROVED', GETDATE(), GETDATE()),
(2, 'iPhone 15 Pro Max Battery', 'High capacity 4422mAh replacement battery', 'BATTERY', 1, 2, 89.99, 100, 'IP15PM-BAT-001', 'https://via.placeholder.com/300x300.png?text=iPhone+15+Pro+Max+Battery', 180, 'APPROVED', GETDATE(), GETDATE()),
(3, 'iPhone 15 Pro Max Rear Camera', '48MP main + 12MP ultra-wide + 12MP telephoto', 'CAMERA', 1, 3, 249.99, 30, 'IP15PM-CAM-001', 'https://via.placeholder.com/300x300.png?text=iPhone+15+Pro+Max+Camera', 90, 'APPROVED', GETDATE(), GETDATE()),
(4, 'iPhone 15 Pro Max Charging Port', 'USB-C charging port assembly', 'CHARGING_PORT', 1, 2, 49.99, 75, 'IP15PM-CHG-001', 'https://via.placeholder.com/300x300.png?text=iPhone+15+Pro+Max+Port', 60, 'APPROVED', GETDATE(), GETDATE()),

-- iPhone 14 Components
(5, 'iPhone 14 OLED Display', '6.1" Super Retina XDR display assembly', 'SCREEN', 3, 2, 249.99, 60, 'IP14-SCR-001', 'https://via.placeholder.com/300x300.png?text=iPhone+14+Screen', 90, 'APPROVED', GETDATE(), GETDATE()),
(6, 'iPhone 14 Battery', '3279mAh lithium-ion battery', 'BATTERY', 3, 2, 69.99, 120, 'IP14-BAT-001', 'https://via.placeholder.com/300x300.png?text=iPhone+14+Battery', 180, 'APPROVED', GETDATE(), GETDATE()),
(7, 'iPhone 14 Back Glass', 'Replacement back glass panel with camera cutout', 'BACK_PANEL', 3, 3, 79.99, 40, 'IP14-BGL-001', 'https://via.placeholder.com/300x300.png?text=iPhone+14+Back+Glass', 30, 'APPROVED', GETDATE(), GETDATE()),

-- Samsung Galaxy S24 Ultra Components
(8, 'Galaxy S24 Ultra AMOLED Display', '6.8" Dynamic AMOLED 2X display', 'SCREEN', 5, 2, 329.99, 45, 'GS24U-SCR-001', 'https://via.placeholder.com/300x300.png?text=S24+Ultra+Screen', 90, 'APPROVED', GETDATE(), GETDATE()),
(9, 'Galaxy S24 Ultra Battery', '5000mAh high-capacity battery', 'BATTERY', 5, 3, 94.99, 80, 'GS24U-BAT-001', 'https://via.placeholder.com/300x300.png?text=S24+Ultra+Battery', 180, 'APPROVED', GETDATE(), GETDATE()),
(10, 'Galaxy S24 Ultra Camera Module', '200MP main camera module', 'CAMERA', 5, 2, 279.99, 25, 'GS24U-CAM-001', 'https://via.placeholder.com/300x300.png?text=S24+Ultra+Camera', 90, 'APPROVED', GETDATE(), GETDATE()),
(11, 'Galaxy S24 Ultra S-Pen', 'Bluetooth-enabled S-Pen stylus', 'OTHER', 5, 2, 59.99, 100, 'GS24U-PEN-001', 'https://via.placeholder.com/300x300.png?text=S+Pen', 30, 'APPROVED', GETDATE(), GETDATE()),

-- Google Pixel 8 Pro Components
(12, 'Pixel 8 Pro OLED Display', '6.7" LTPO OLED display with 120Hz', 'SCREEN', 8, 3, 269.99, 35, 'PIX8P-SCR-001', 'https://via.placeholder.com/300x300.png?text=Pixel+8+Pro+Screen', 90, 'APPROVED', GETDATE(), GETDATE()),
(13, 'Pixel 8 Pro Battery', '5050mAh battery with fast charging support', 'BATTERY', 8, 3, 84.99, 70, 'PIX8P-BAT-001', 'https://via.placeholder.com/300x300.png?text=Pixel+8+Pro+Battery', 180, 'APPROVED', GETDATE(), GETDATE()),
(14, 'Pixel 8 Pro Rear Camera', '50MP wide + 48MP ultra-wide + 48MP telephoto', 'CAMERA', 8, 2, 229.99, 20, 'PIX8P-CAM-001', 'https://via.placeholder.com/300x300.png?text=Pixel+8+Pro+Camera', 90, 'APPROVED', GETDATE(), GETDATE()),

-- OnePlus 12 Components
(15, 'OnePlus 12 AMOLED Display', '6.82" LTPO AMOLED display', 'SCREEN', 10, 3, 239.99, 40, 'OP12-SCR-001', 'https://via.placeholder.com/300x300.png?text=OnePlus+12+Screen', 90, 'APPROVED', GETDATE(), GETDATE()),
(16, 'OnePlus 12 Battery', '5400mAh battery with 100W fast charging', 'BATTERY', 10, 2, 79.99, 90, 'OP12-BAT-001', 'https://via.placeholder.com/300x300.png?text=OnePlus+12+Battery', 180, 'APPROVED', GETDATE(), GETDATE()),

-- Pending approval components
(17, 'iPhone 15 Pro Third-Party Screen', 'Aftermarket LCD display replacement', 'SCREEN', 2, 3, 149.99, 25, 'IP15P-SCR-002', 'https://via.placeholder.com/300x300.png?text=iPhone+15+Pro+LCD', 30, 'PENDING', GETDATE(), GETDATE()),
(18, 'Galaxy S23 Refurbished Battery', 'Certified refurbished battery', 'BATTERY', 6, 2, 44.99, 50, 'GS23-BAT-002', 'https://via.placeholder.com/300x300.png?text=S23+Battery', 90, 'PENDING', GETDATE(), GETDATE());

-- Insert sample orders
INSERT INTO orders (id, order_number, customer_id, total_amount, status, shipping_address, created_at, updated_at) VALUES
(1, 'ORD-2024-001', 4, 369.98, 'DELIVERED', '123 Main St, New York, NY 10001', DATEADD(day, -30, GETDATE()), DATEADD(day, -23, GETDATE())),
(2, 'ORD-2024-002', 5, 649.97, 'SHIPPED', '456 Oak Ave, Los Angeles, CA 90001', DATEADD(day, -15, GETDATE()), DATEADD(day, -14, GETDATE())),
(3, 'ORD-2024-003', 4, 249.99, 'PROCESSING', '123 Main St, New York, NY 10001', DATEADD(day, -5, GETDATE()), DATEADD(day, -5, GETDATE())),
(4, 'ORD-2024-004', 6, 159.98, 'PENDING', '789 Pine Rd, Chicago, IL 60601', DATEADD(day, -2, GETDATE()), DATEADD(day, -2, GETDATE()));

-- Insert order items
INSERT INTO order_items (id, order_id, component_id, quantity, price_at_purchase, created_at, updated_at) VALUES
-- Order 1 items
(1, 1, 6, 2, 69.99, DATEADD(day, -30, GETDATE()), DATEADD(day, -30, GETDATE())),
(2, 1, 7, 3, 79.99, DATEADD(day, -30, GETDATE()), DATEADD(day, -30, GETDATE())),

-- Order 2 items
(3, 2, 1, 1, 299.99, DATEADD(day, -15, GETDATE()), DATEADD(day, -15, GETDATE())),
(4, 2, 2, 2, 89.99, DATEADD(day, -15, GETDATE()), DATEADD(day, -15, GETDATE())),
(5, 2, 4, 3, 49.99, DATEADD(day, -15, GETDATE()), DATEADD(day, -15, GETDATE())),

-- Order 3 items
(6, 3, 8, 1, 329.99, DATEADD(day, -5, GETDATE()), DATEADD(day, -5, GETDATE())),

-- Order 4 items
(7, 4, 13, 1, 84.99, DATEADD(day, -2, GETDATE()), DATEADD(day, -2, GETDATE())),
(8, 4, 16, 1, 79.99, DATEADD(day, -2, GETDATE()), DATEADD(day, -2, GETDATE()));

-- Insert sample cart items
INSERT INTO cart_items (id, user_id, component_id, quantity, created_at, updated_at) VALUES
(1, 4, 12, 1, GETDATE(), GETDATE()),
(2, 4, 14, 1, GETDATE(), GETDATE()),
(3, 5, 9, 2, GETDATE(), GETDATE()),
(4, 5, 11, 1, GETDATE(), GETDATE()),
(5, 6, 15, 1, GETDATE(), GETDATE());

-- Reset identity seeds to continue from current max values
-- This ensures auto-increment works properly for future inserts
