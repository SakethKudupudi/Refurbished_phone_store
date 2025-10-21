-- Insert sample data for initial database seeding

-- Insert sample brands
INSERT INTO brands (name, description, category, logo_url, is_active) VALUES
('Apple', 'Premium smartphones and tablets', 'APPLE', 'https://logo.clearbit.com/apple.com', TRUE),
('Samsung', 'Android smartphones and tablets', 'ANDROID', 'https://logo.clearbit.com/samsung.com', TRUE),
('Google', 'Pixel series smartphones', 'ANDROID', 'https://logo.clearbit.com/google.com', TRUE),
('OnePlus', 'High-performance Android devices', 'ANDROID', 'https://logo.clearbit.com/oneplus.com', TRUE),
('Xiaomi', 'Value Android smartphones', 'ANDROID', 'https://logo.clearbit.com/mi.com', TRUE);

-- Insert sample iPhone models
INSERT INTO models (name, brand_id, description, release_year, model_number, is_active) VALUES
('iPhone 15 Pro Max', (SELECT id FROM brands WHERE name = 'Apple'), 'Latest flagship iPhone with titanium design', 2023, 'A3108', TRUE),
('iPhone 15 Pro', (SELECT id FROM brands WHERE name = 'Apple'), 'Pro iPhone with A17 Pro chip', 2023, 'A3101', TRUE),
('iPhone 15', (SELECT id FROM brands WHERE name = 'Apple'), 'Standard iPhone 15', 2023, 'A3089', TRUE),
('iPhone 14 Pro Max', (SELECT id FROM brands WHERE name = 'Apple'), 'Previous gen Pro Max', 2022, 'A2894', TRUE),
('iPhone 14 Pro', (SELECT id FROM brands WHERE name = 'Apple'), 'Previous gen Pro', 2022, 'A2890', TRUE),
('iPhone 14', (SELECT id FROM brands WHERE name = 'Apple'), 'Standard iPhone 14', 2022, 'A2882', TRUE),
('iPhone 13 Pro Max', (SELECT id FROM brands WHERE name = 'Apple'), 'iPhone 13 Pro Max', 2021, 'A2484', TRUE),
('iPhone 13 Pro', (SELECT id FROM brands WHERE name = 'Apple'), 'iPhone 13 Pro', 2021, 'A2483', TRUE),
('iPhone 13', (SELECT id FROM brands WHERE name = 'Apple'), 'Standard iPhone 13', 2021, 'A2482', TRUE);

-- Insert sample Samsung models
INSERT INTO models (name, brand_id, description, release_year, model_number, is_active) VALUES
('Galaxy S24 Ultra', (SELECT id FROM brands WHERE name = 'Samsung'), 'Flagship Samsung with S Pen', 2024, 'SM-S928', TRUE),
('Galaxy S24+', (SELECT id FROM brands WHERE name = 'Samsung'), 'Large screen flagship', 2024, 'SM-S926', TRUE),
('Galaxy S24', (SELECT id FROM brands WHERE name = 'Samsung'), 'Standard flagship', 2024, 'SM-S921', TRUE),
('Galaxy S23 Ultra', (SELECT id FROM brands WHERE name = 'Samsung'), 'Previous gen Ultra', 2023, 'SM-S918', TRUE),
('Galaxy S23+', (SELECT id FROM brands WHERE name = 'Samsung'), 'Previous gen Plus', 2023, 'SM-S916', TRUE),
('Galaxy S23', (SELECT id FROM brands WHERE name = 'Samsung'), 'Previous gen standard', 2023, 'SM-S911', TRUE);

-- Insert sample Google Pixel models
INSERT INTO models (name, brand_id, description, release_year, model_number, is_active) VALUES
('Pixel 8 Pro', (SELECT id FROM brands WHERE name = 'Google'), 'Latest Pixel flagship', 2023, 'GE9DP', TRUE),
('Pixel 8', (SELECT id FROM brands WHERE name = 'Google'), 'Latest standard Pixel', 2023, 'G9BQD', TRUE),
('Pixel 7 Pro', (SELECT id FROM brands WHERE name = 'Google'), 'Previous Pixel Pro', 2022, 'GP4BC', TRUE),
('Pixel 7', (SELECT id FROM brands WHERE name = 'Google'), 'Previous standard Pixel', 2022, 'GVU6C', TRUE);

-- Insert admin user
INSERT INTO users (email, first_name, last_name, phone_number, is_active, email_verified) VALUES
('admin@mobileparts.com', 'Admin', 'User', '+1234567890', TRUE, TRUE);

INSERT INTO user_roles (user_id, role) VALUES
((SELECT id FROM users WHERE email = 'admin@mobileparts.com'), 'ADMIN'),
((SELECT id FROM users WHERE email = 'admin@mobileparts.com'), 'CUSTOMER'),
((SELECT id FROM users WHERE email = 'admin@mobileparts.com'), 'VENDOR');

-- Insert sample vendor user
INSERT INTO users (email, first_name, last_name, phone_number, is_active, email_verified) VALUES
('vendor@example.com', 'John', 'Vendor', '+1234567891', TRUE, TRUE);

INSERT INTO user_roles (user_id, role) VALUES
((SELECT id FROM users WHERE email = 'vendor@example.com'), 'VENDOR'),
((SELECT id FROM users WHERE email = 'vendor@example.com'), 'CUSTOMER');

-- Insert sample customer user
INSERT INTO users (email, first_name, last_name, phone_number, address_line1, city, state, postal_code, country, is_active, email_verified) VALUES
('customer@example.com', 'Jane', 'Customer', '+1234567892', '123 Main St', 'San Francisco', 'CA', '94102', 'USA', TRUE, TRUE);

INSERT INTO user_roles (user_id, role) VALUES
((SELECT id FROM users WHERE email = 'customer@example.com'), 'CUSTOMER');

-- Note: Sample components would be added by vendors through the application
-- This ensures proper approval workflow and vendor association
