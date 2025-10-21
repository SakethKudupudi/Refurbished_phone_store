-- Create components table
CREATE TABLE IF NOT EXISTS components (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    model_id BIGINT NOT NULL,
    component_type VARCHAR(50) NOT NULL CHECK (component_type IN (
        'SCREEN', 'BATTERY', 'CAMERA_FRONT', 'CAMERA_REAR', 'CHARGING_PORT',
        'SPEAKER', 'MICROPHONE', 'MOTHERBOARD', 'POWER_BUTTON', 'VOLUME_BUTTON',
        'HOME_BUTTON', 'BACK_COVER', 'SIM_TRAY', 'FLEX_CABLE', 'EARPIECE',
        'VIBRATOR', 'ANTENNA', 'WIFI_MODULE', 'BLUETOOTH_MODULE', 'OTHER'
    )),
    description VARCHAR(2000),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0.01),
    quantity_available INTEGER NOT NULL CHECK (quantity_available >= 0),
    sku VARCHAR(100) UNIQUE,
    vendor_id BIGINT NOT NULL,
    approval_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approved_by BIGINT,
    image_url VARCHAR(500),
    manufacturer VARCHAR(500),
    warranty_months INTEGER,
    condition VARCHAR(20) DEFAULT 'NEW' CHECK (condition IN ('NEW', 'REFURBISHED', 'USED_LIKE_NEW', 'USED_GOOD')),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_components_model FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE,
    CONSTRAINT fk_components_vendor FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_components_approver FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_component_type ON components(component_type);
CREATE INDEX idx_component_model ON components(model_id);
CREATE INDEX idx_component_vendor ON components(vendor_id);
CREATE INDEX idx_component_status ON components(approval_status);
CREATE INDEX idx_component_sku ON components(sku);
CREATE INDEX idx_component_active ON components(is_active, is_deleted);
CREATE INDEX idx_component_price ON components(price);
CREATE INDEX idx_component_available ON components(quantity_available);

-- Comments
COMMENT ON TABLE components IS 'Stores mobile parts inventory (screens, batteries, etc.)';
COMMENT ON COLUMN components.approval_status IS 'Component approval status: PENDING, APPROVED, or REJECTED';
COMMENT ON COLUMN components.condition IS 'Component condition: NEW, REFURBISHED, USED_LIKE_NEW, or USED_GOOD';
