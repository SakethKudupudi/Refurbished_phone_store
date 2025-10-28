# Database Schema - Mobile Parts E-Commerce Application

## 📊 **Complete Database Schema**

### **After Redis Migration:**
- ❌ **cart_items table REMOVED** (now uses Redis)
- ✅ All other tables remain in PostgreSQL (Supabase)

---

## 🗃️ **PostgreSQL Tables (Supabase)**

### **1. users**
Main user table for customers, vendors, and admins (role-based)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | User ID |
| `azure_ad_object_id` | VARCHAR(255) | UNIQUE | Azure AD object ID |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email address |
| `first_name` | VARCHAR(100) | NOT NULL | First name |
| `last_name` | VARCHAR(100) | NOT NULL | Last name |
| `phone_number` | VARCHAR(20) | | Phone number |
| `address_line1` | VARCHAR(255) | | Address line 1 |
| `address_line2` | VARCHAR(255) | | Address line 2 |
| `city` | VARCHAR(100) | | City |
| `state` | VARCHAR(100) | | State |
| `postal_code` | VARCHAR(20) | | Postal code |
| `country` | VARCHAR(100) | | Country |
| `is_active` | BOOLEAN | DEFAULT TRUE | Account active status |
| `email_verified` | BOOLEAN | DEFAULT FALSE | Email verified |
| `created_at` | TIMESTAMP | | Created timestamp |
| `updated_at` | TIMESTAMP | | Updated timestamp |

**Indexes:**
- `idx_user_email` on `email`
- `idx_user_azure_id` on `azure_ad_object_id`

---

### **2. user_roles**
Maps users to their roles (many-to-many)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | BIGINT | FK → users.id | User ID |
| `role` | VARCHAR(20) | | CUSTOMER, VENDOR, ADMIN |

**Composite Key:** `(user_id, role)`

---

### **3. brands**
Mobile device manufacturers (Apple, Samsung, etc.)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Brand ID |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | Brand name |
| `description` | VARCHAR(500) | | Description |
| `logo_url` | VARCHAR(500) | | Logo image URL |
| `category` | VARCHAR(20) | NOT NULL | APPLE, ANDROID |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |
| `created_at` | TIMESTAMP | | Created timestamp |
| `updated_at` | TIMESTAMP | | Updated timestamp |

**Indexes:**
- `idx_brand_name` on `name`

**Sample Data:**
- Apple (APPLE)
- Samsung (ANDROID)
- Google (ANDROID)
- OnePlus (ANDROID)
- Xiaomi (ANDROID)

---

### **4. models**
Specific device models (iPhone 15, Galaxy S24, etc.)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Model ID |
| `name` | VARCHAR(150) | NOT NULL | Model name |
| `brand_id` | BIGINT | NOT NULL, FK → brands.id | Brand reference |
| `description` | VARCHAR(1000) | | Description |
| `image_url` | VARCHAR(500) | | Model image URL |
| `release_year` | INTEGER | | Release year |
| `model_number` | VARCHAR(100) | | Model number |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |
| `created_at` | TIMESTAMP | | Created timestamp |
| `updated_at` | TIMESTAMP | | Updated timestamp |

**Indexes:**
- `idx_model_name` on `name`
- `idx_model_brand` on `brand_id`

**Relationships:**
- `brand_id` → `brands.id` (Many-to-One)

**Sample Data:**
- iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15
- iPhone 16 Pro Max, iPhone 16 Pro, iPhone 16
- iPhone 17 Pro Max, iPhone 17 Pro, iPhone 17
- Galaxy S24 Ultra, Galaxy S24 Plus, Galaxy S24
- Pixel 8 Pro, Pixel 8
- OnePlus 12, OnePlus 11

---

### **5. components**
Mobile parts/components sold by vendors

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Component ID |
| `name` | VARCHAR(200) | NOT NULL | Component name |
| `model_id` | BIGINT | NOT NULL, FK → models.id | Model reference |
| `vendor_id` | BIGINT | NOT NULL, FK → users.id | Vendor reference |
| `component_type` | VARCHAR(50) | NOT NULL | Type (see enum below) |
| `description` | VARCHAR(2000) | | Description |
| `price` | DECIMAL(10,2) | NOT NULL | Price |
| `quantity_available` | INTEGER | NOT NULL | Stock quantity |
| `sku` | VARCHAR(100) | UNIQUE | SKU code |
| `approval_status` | VARCHAR(20) | NOT NULL | PENDING, APPROVED, REJECTED |
| `approved_by` | BIGINT | FK → users.id | Admin who approved |
| `image_url` | VARCHAR(500) | | Component image |
| `manufacturer` | VARCHAR(500) | | Manufacturer |
| `warranty_months` | INTEGER | | Warranty period |
| `condition` | VARCHAR(20) | | NEW, REFURBISHED, USED_LIKE_NEW, USED_GOOD |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |
| `created_at` | TIMESTAMP | | Created timestamp |
| `updated_at` | TIMESTAMP | | Updated timestamp |

**Indexes:**
- `idx_component_type` on `component_type`
- `idx_component_model` on `model_id`
- `idx_component_vendor` on `vendor_id`
- `idx_component_status` on `approval_status`

**Component Types:**
- SCREEN, BATTERY, CAMERA_FRONT, CAMERA_REAR
- CHARGING_PORT, SPEAKER, MICROPHONE, MOTHERBOARD
- POWER_BUTTON, VOLUME_BUTTON, HOME_BUTTON
- BACK_COVER, SIM_TRAY, FLEX_CABLE
- EARPIECE, VIBRATOR, ANTENNA
- WIFI_MODULE, BLUETOOTH_MODULE, OTHER

**Relationships:**
- `model_id` → `models.id` (Many-to-One)
- `vendor_id` → `users.id` (Many-to-One)
- `approved_by` → `users.id` (Many-to-One)

---

### **6. orders**
Customer orders

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Order ID |
| `order_number` | VARCHAR(50) | NOT NULL, UNIQUE | Order number |
| `customer_id` | BIGINT | NOT NULL, FK → users.id | Customer reference |
| `subtotal` | DECIMAL(12,2) | NOT NULL | Subtotal amount |
| `tax_amount` | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | Tax amount |
| `shipping_amount` | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | Shipping cost |
| `total_amount` | DECIMAL(12,2) | NOT NULL | Total amount |
| `status` | VARCHAR(20) | NOT NULL | Order status |
| `payment_status` | VARCHAR(20) | NOT NULL | Payment status |
| `payment_method` | VARCHAR(50) | | Payment method |
| `payment_transaction_id` | VARCHAR(255) | | Transaction ID |
| `shipping_name` | VARCHAR(200) | NOT NULL | Shipping name |
| `shipping_address_line1` | VARCHAR(255) | NOT NULL | Address line 1 |
| `shipping_address_line2` | VARCHAR(255) | | Address line 2 |
| `shipping_city` | VARCHAR(100) | NOT NULL | City |
| `shipping_state` | VARCHAR(100) | NOT NULL | State |
| `shipping_postal_code` | VARCHAR(20) | NOT NULL | Postal code |
| `shipping_country` | VARCHAR(100) | NOT NULL | Country |
| `shipping_phone` | VARCHAR(20) | | Phone |
| `shipping_email` | VARCHAR(255) | | Email |
| `tracking_number` | VARCHAR(100) | | Tracking number |
| `notes` | VARCHAR(1000) | | Order notes |
| `created_at` | TIMESTAMP | | Created timestamp |
| `updated_at` | TIMESTAMP | | Updated timestamp |

**Indexes:**
- `idx_order_customer` on `customer_id`
- `idx_order_status` on `status`
- `idx_order_number` on `order_number`

**Order Status:**
- PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED

**Payment Status:**
- PENDING, AUTHORIZED, CAPTURED, FAILED, REFUNDED

**Relationships:**
- `customer_id` → `users.id` (Many-to-One)

---

### **7. order_items**
Individual items within orders

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Order item ID |
| `order_id` | BIGINT | NOT NULL, FK → orders.id | Order reference |
| `component_id` | BIGINT | NOT NULL, FK → components.id | Component reference |
| `quantity` | INTEGER | NOT NULL | Quantity ordered |
| `unit_price` | DECIMAL(10,2) | NOT NULL | Price per unit |
| `total_price` | DECIMAL(12,2) | NOT NULL | Total price |
| `component_name` | VARCHAR(200) | NOT NULL | Component name snapshot |
| `component_sku` | VARCHAR(100) | | SKU snapshot |
| `created_at` | TIMESTAMP | | Created timestamp |
| `updated_at` | TIMESTAMP | | Updated timestamp |

**Indexes:**
- `idx_order_item_order` on `order_id`
- `idx_order_item_component` on `component_id`

**Relationships:**
- `order_id` → `orders.id` (Many-to-One)
- `component_id` → `components.id` (Many-to-One)

---

## 🔴 **Redis Storage**

### **Shopping Cart (In-Memory)**

**Key Pattern:** `cart:{userId}`  
**Data Structure:** Hash  
**TTL:** 24 hours (auto-expiration)

**Hash Fields:**
```
Field: {componentId}
Value: {
  "id": 123,
  "componentId": 123,
  "componentName": "iPhone 15 Pro OLED Display",
  "price": 299.99,
  "imageUrl": "https://...",
  "quantity": 2
}
```

**Session Storage**

**Key Pattern:** `spring:session:sessions:{sessionId}`  
**TTL:** 30 minutes

---

## 📐 **Entity Relationships**

```
users (1) ←→ (M) user_roles
users (1) ←→ (M) components (as vendor)
users (1) ←→ (M) orders (as customer)

brands (1) ←→ (M) models
models (1) ←→ (M) components

orders (1) ←→ (M) order_items
components (1) ←→ (M) order_items

Redis Cart → users (temporary, session-based)
```

---

## 🔑 **Key Design Decisions**

### ✅ **Single User Table**
- One `users` table with `user_roles` junction table
- Supports multiple roles per user (e.g., vendor + customer)
- Eliminates data duplication

### ✅ **Redis for Cart**
- Fast in-memory storage (sub-millisecond)
- Auto-expiration after 24 hours
- No database overhead for temporary data
- Session-based for guests, user-based for logged-in

### ✅ **Order Item Snapshots**
- `order_items` stores component name/SKU at purchase time
- Prevents historical data loss if component is deleted/modified
- Maintains order integrity

### ✅ **Approval Workflow**
- Components require admin approval before going live
- `approval_status`: PENDING → APPROVED/REJECTED
- `approved_by` tracks which admin approved

### ✅ **Soft Deletes**
- `is_active` flags instead of hard deletes
- Maintains referential integrity
- Allows data recovery

---

## 📊 **Data Flow**

### **Customer Shopping Flow:**
1. Browse brands → models → components
2. Add to cart (**Redis**, 24hr TTL)
3. Checkout → Create order (**PostgreSQL**)
4. Order items snapshot component details
5. Cart cleared after order

### **Vendor Flow:**
1. Register as vendor (user with VENDOR role)
2. Create components → approval_status = PENDING
3. Admin approves → approval_status = APPROVED
4. Component appears in customer search

### **Admin Flow:**
1. View pending components
2. Approve/reject components
3. View all orders
4. Manage users

---

## 🔢 **Sample Counts**

Based on your seed data:
- **5 brands** (Apple, Samsung, Google, OnePlus, Xiaomi)
- **20+ models** (iPhone 15-17 series, Galaxy S24, Pixel 8, OnePlus)
- **20+ components** (screens, batteries, cameras)
- **Users**: Dynamic (customers, vendors, admins)
- **Orders**: Dynamic (customer purchases)
- **Cart items**: Redis (temporary, session-based)

---

## 🚀 **Technology Stack**

| Layer | Technology |
|-------|-----------|
| **Database** | PostgreSQL (Supabase) |
| **Cache/Session** | Redis (local or Azure Cache) |
| **ORM** | JPA/Hibernate |
| **Backend** | Spring Boot 3.4.0 |
| **Frontend** | Angular 17 |
| **API** | REST + GraphQL |

---

This is your **current, production-ready schema** after the Redis migration! 🎉
