-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL CHECK (subtotal >= 0),
    tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_amount >= 0),
    total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN (
        'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'
    )),
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN (
        'PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'
    )),
    payment_method VARCHAR(50),
    payment_transaction_id VARCHAR(255),
    shipping_name VARCHAR(200) NOT NULL,
    shipping_address_line1 VARCHAR(255) NOT NULL,
    shipping_address_line2 VARCHAR(255),
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    shipping_phone VARCHAR(20),
    shipping_email VARCHAR(255),
    tracking_number VARCHAR(100),
    notes VARCHAR(1000),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_payment_status ON orders(payment_status);
CREATE INDEX idx_order_number ON orders(order_number);
CREATE INDEX idx_order_created_at ON orders(created_at);
CREATE INDEX idx_order_tracking ON orders(tracking_number);

-- Comments
COMMENT ON TABLE orders IS 'Stores customer orders';
COMMENT ON COLUMN orders.status IS 'Order fulfillment status';
COMMENT ON COLUMN orders.payment_status IS 'Payment processing status';
