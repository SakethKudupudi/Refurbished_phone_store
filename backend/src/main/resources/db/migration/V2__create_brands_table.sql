-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    logo_url VARCHAR(500),
    category VARCHAR(20) NOT NULL CHECK (category IN ('APPLE', 'ANDROID')),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_brand_name ON brands(name);
CREATE INDEX idx_brand_category ON brands(category);
CREATE INDEX idx_brand_active ON brands(is_active, is_deleted);

-- Comments
COMMENT ON TABLE brands IS 'Stores mobile device brand information (Apple, Samsung, etc.)';
COMMENT ON COLUMN brands.category IS 'Brand category: APPLE or ANDROID';
