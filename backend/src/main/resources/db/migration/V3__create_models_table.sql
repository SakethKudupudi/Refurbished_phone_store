-- Create models table
CREATE TABLE IF NOT EXISTS models (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    brand_id BIGINT NOT NULL,
    description VARCHAR(1000),
    image_url VARCHAR(500),
    release_year INTEGER,
    model_number VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_models_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
    CONSTRAINT uk_model_brand_name UNIQUE (brand_id, name)
);

-- Create indexes
CREATE INDEX idx_model_name ON models(name);
CREATE INDEX idx_model_brand ON models(brand_id);
CREATE INDEX idx_model_active ON models(is_active, is_deleted);
CREATE INDEX idx_model_release_year ON models(release_year);

-- Comments
COMMENT ON TABLE models IS 'Stores specific device models (iPhone 15, Galaxy S24, etc.)';
COMMENT ON COLUMN models.model_number IS 'Manufacturer model number';
