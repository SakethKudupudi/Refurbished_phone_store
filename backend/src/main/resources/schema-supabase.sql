-- Supabase schema for Mobile Parts E-Commerce
-- Creates enums and tables used by the frontend/backend
-- Run this with psql against your Supabase Postgres connection.

-- ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE brand_category AS ENUM ('APPLE', 'ANDROID');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE component_type AS ENUM (
        'SCREEN','BATTERY','CAMERA_FRONT','CAMERA_REAR','CHARGING_PORT','SPEAKER',
        'MICROPHONE','MOTHERBOARD','POWER_BUTTON','VOLUME_BUTTON','HOME_BUTTON',
        'BACK_COVER','SIM_TRAY','FLEX_CABLE','EARPIECE','VIBRATOR','ANTENNA',
        'WIFI_MODULE','BLUETOOTH_MODULE','OTHER'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE approval_status AS ENUM ('PENDING','APPROVED','REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE component_condition AS ENUM ('NEW','REFURBISHED','USED_LIKE_NEW','USED_GOOD');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('PENDING','AUTHORIZED','CAPTURED','FAILED','REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    azure_ad_object_id TEXT,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    phone_number TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT,
    roles user_role[] NOT NULL DEFAULT ARRAY['CUSTOMER']::user_role[],
    is_active BOOLEAN NOT NULL DEFAULT true,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- BRANDS
CREATE TABLE IF NOT EXISTS brands (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    category brand_category NOT NULL DEFAULT 'ANDROID',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- MODELS
CREATE TABLE IF NOT EXISTS models (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand_id BIGINT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    description TEXT,
    image_url TEXT,
    release_year INT,
    model_number TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- COMPONENTS
CREATE TABLE IF NOT EXISTS components (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    model_id BIGINT REFERENCES models(id) ON DELETE SET NULL,
    brand_id BIGINT REFERENCES brands(id) ON DELETE SET NULL,
    component_type component_type NOT NULL DEFAULT 'OTHER',
    description TEXT,
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    quantity_available INT NOT NULL DEFAULT 0,
    sku TEXT,
    vendor_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    approval_status approval_status NOT NULL DEFAULT 'PENDING',
    approved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    image_url TEXT,
    manufacturer TEXT,
    warranty_months INT,
    condition component_condition NOT NULL DEFAULT 'NEW',
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- CART ITEMS
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    component_id BIGINT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    shipping_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    status order_status NOT NULL DEFAULT 'PENDING',
    payment_status payment_status NOT NULL DEFAULT 'PENDING',
    payment_method TEXT,
    payment_transaction_id TEXT,
    shipping_name TEXT,
    shipping_address_line1 TEXT,
    shipping_address_line2 TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_postal_code TEXT,
    shipping_country TEXT,
    shipping_phone TEXT,
    shipping_email TEXT,
    tracking_number TEXT,
    notes TEXT,
    total_items INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    component_id BIGINT REFERENCES components(id) ON DELETE SET NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_price NUMERIC(12,2) NOT NULL DEFAULT 0,
    component_name TEXT,
    component_sku TEXT
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_models_brand_id ON models(brand_id);
CREATE INDEX IF NOT EXISTS idx_components_model_id ON components(model_id);
CREATE INDEX IF NOT EXISTS idx_components_brand_id ON components(brand_id);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_order_customer_id ON orders(customer_id);

-- Optional: grant usage to anon (Supabase) if you want public read access
-- WARNING: adjust these grants to your security model. Typically Supabase RLS is used.
-- GRANT USAGE ON SCHEMA public TO anon;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- End of schema

