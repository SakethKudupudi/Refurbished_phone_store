-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    component_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 1),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_items_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_component FOREIGN KEY (component_id) REFERENCES components(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_component UNIQUE (user_id, component_id)
);

-- Create indexes
CREATE INDEX idx_cart_user ON cart_items(user_id);
CREATE INDEX idx_cart_component ON cart_items(component_id);

-- Comments
COMMENT ON TABLE cart_items IS 'Stores items in user shopping carts';
COMMENT ON CONSTRAINT uk_user_component ON cart_items IS 'Ensures one cart item per component per user';
