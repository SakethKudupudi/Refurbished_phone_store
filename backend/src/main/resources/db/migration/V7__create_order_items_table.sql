-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    component_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 1),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0.01),
    total_price DECIMAL(12, 2) NOT NULL CHECK (total_price >= 0.01),
    component_name VARCHAR(200) NOT NULL,
    component_sku VARCHAR(100),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_component FOREIGN KEY (component_id) REFERENCES components(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_order_item_order ON order_items(order_id);
CREATE INDEX idx_order_item_component ON order_items(component_id);

-- Comments
COMMENT ON TABLE order_items IS 'Stores individual items within orders';
COMMENT ON COLUMN order_items.component_name IS 'Snapshot of component name at time of order';
COMMENT ON COLUMN order_items.component_sku IS 'Snapshot of component SKU at time of order';
