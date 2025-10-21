# Application Navigation Flow

## Customer Shopping Flow

### 1. Landing Page (`/`)
**Component:** `LandingPageComponent`

**Actions:**
- Click "Apple" category → Navigate to `/brands/APPLE`
- Click "Android" category → Navigate to `/brands/ANDROID`

**Features:**
- Hero section with search bar
- Category cards (Apple/Android)
- Features section (Genuine Parts, Fast Shipping, etc.)
- Popular parts showcase

---

### 2. Brand List (`/brands/:category`)
**Component:** `BrandListComponent`

**URL Examples:**
- `/brands/APPLE` - Shows Apple brand (auto-redirects to models)
- `/brands/ANDROID` - Shows Android brands (Samsung, Google, OnePlus, Xiaomi)

**Actions:**
- Click "Back" button → Navigate to `/` (landing page)
- Click brand card → Navigate to `/models/:brandId`
  - Samsung (id: 1) → `/models/1`
  - Google (id: 2) → `/models/2`
  - OnePlus (id: 3) → `/models/3`
  - Xiaomi (id: 4) → `/models/4`
  - Apple (id: 5) → `/models/5`

**Special Behavior:**
- Apple category auto-navigates to model selection (only 1 brand)
- Android category shows brand selection grid

---

### 3. Model List (`/models/:brandId`)
**Component:** `ModelListComponent`

**URL Examples:**
- `/models/1` - Samsung models (Galaxy S24 Ultra, Galaxy S23 Ultra)
- `/models/2` - Google models (Pixel 8 Pro)
- `/models/3` - OnePlus models (OnePlus 12)
- `/models/4` - Xiaomi models (Xiaomi 14 Ultra)
- `/models/5` - Apple models (iPhone 15 Pro Max, iPhone 15 Pro, iPhone 14 Pro Max)

**Actions:**
- Click "Back" button → Navigate to `/brands/:category`
- Click model card → Navigate to `/components/:modelId`
  - iPhone 15 Pro Max (id: 1) → `/components/1`
  - Galaxy S24 Ultra (id: 4) → `/components/4`
  - etc.

**Displayed Info:**
- Device name
- Release year
- Storage capacity
- Color variant
- Device image

---

### 4. Component/Parts List (`/components/:modelId`)
**Component:** `ComponentListComponent`

**URL Examples:**
- `/components/1` - Parts for iPhone 15 Pro Max
- `/components/4` - Parts for Galaxy S24 Ultra

**Actions:**
- Click "Back" button → Navigate to `/models/:brandId`
- Click category filter → Filter parts by category
  - All Parts
  - Display
  - Battery
  - Camera
  - Charging Port
  - Speaker
  - Button
- Click "Add to Cart" → Add item to localStorage cart
- Click floating cart button → Navigate to `/cart`

**Available Parts (Example for modelId: 1):**
1. OLED Display Screen - $299.99 (15 in stock)
2. High Capacity Battery - $79.99 (25 in stock)
3. Rear Camera Module - $149.99 (10 in stock)
4. USB-C Charging Port - $39.99 (30 in stock)
5. LCD Display - $199.99 (8 in stock)

**Features:**
- Real-time stock display
- Feature tags (Original Quality, Easy Install, Warranty)
- Category filters
- Floating cart button with item count

---

### 5. Shopping Cart (`/cart`)
**Component:** `ShoppingCartComponent`

**Actions:**
- Update quantity (+/-)
- Remove items
- Click "Proceed to Checkout" → Navigate to `/checkout`
- Click "Continue Shopping" → Navigate back

**Data Source:**
- localStorage key: `cart`
- Format: `[{ ...component, quantity: number }]`

---

### 6. Checkout (`/checkout`)
**Component:** `CheckoutComponent`

**Actions:**
- Fill shipping information
- Fill payment details
- Click "Place Order" → Navigate to `/order-confirmation/:orderId`

---

### 7. Order Confirmation (`/order-confirmation/:orderId`)
**Component:** `OrderConfirmationComponent`

**Actions:**
- View order summary
- Click "Continue Shopping" → Navigate to `/`

---

## Current Implementation Status

### ✅ Completed Components (Apple Design)
1. **LandingPageComponent** - Full Apple aesthetic with animations
2. **BrandListComponent** - Image cards with gradient overlays
3. **ModelListComponent** - Device cards with specs
4. **ComponentListComponent** - Parts list with filters and cart

### ⏳ Pending Components (Need Apple Design)
5. **ShoppingCartComponent** - Basic structure only
6. **CheckoutComponent** - Basic structure only
7. **OrderConfirmationComponent** - Basic structure only

---

## Key Navigation Routes

```typescript
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'brands/:category', component: BrandListComponent },
  { path: 'models/:brandId', component: ModelListComponent },
  { path: 'components/:modelId', component: ComponentListComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation/:orderId', component: OrderConfirmationComponent }
];
```

---

## Mock Data IDs Reference

### Brands
- 1: Samsung (ANDROID)
- 2: Google (ANDROID)
- 3: OnePlus (ANDROID)
- 4: Xiaomi (ANDROID)
- 5: Apple (APPLE)

### Models
- 1: iPhone 15 Pro Max (brandId: 5)
- 2: iPhone 15 Pro (brandId: 5)
- 3: iPhone 14 Pro Max (brandId: 5)
- 4: Galaxy S24 Ultra (brandId: 1)
- 5: Galaxy S23 Ultra (brandId: 1)
- 6: Pixel 8 Pro (brandId: 2)
- 7: OnePlus 12 (brandId: 3)
- 8: Xiaomi 14 Ultra (brandId: 4)

### Components (Parts for modelId: 1)
- 1: OLED Display Screen
- 2: High Capacity Battery
- 3: Rear Camera Module
- 4: USB-C Charging Port
- 5: LCD Display

---

## Testing the Flow

### Test Case 1: Apple Device Flow
1. Open `/` → See landing page
2. Click "Apple" category → Navigate to `/brands/APPLE`
3. Auto-redirect to `/models/5` → See iPhone models
4. Click "iPhone 15 Pro Max" → Navigate to `/components/1`
5. Click "OLED Display Screen" Add to Cart → Item added to localStorage
6. Click floating cart button → Navigate to `/cart`

### Test Case 2: Android Device Flow
1. Open `/` → See landing page
2. Click "Android" category → Navigate to `/brands/ANDROID`
3. See brands: Samsung, Google, OnePlus, Xiaomi
4. Click "Samsung" → Navigate to `/models/1`
5. Click "Galaxy S24 Ultra" → Navigate to `/components/4`
6. Filter by "Camera" → See camera parts only
7. Add items to cart → Navigate to checkout

---

## Common Issues & Solutions

### Issue: Navigation not working
**Solution:** Check that Router is imported and injected in constructor

### Issue: Images not loading
**Solution:** Verify Unsplash URLs are correct and accessible

### Issue: Cart count not updating
**Solution:** Check localStorage is working, sync cartItemsCount with cartItemCount

### Issue: Back button goes to wrong page
**Solution:** Verify brandId and category are passed correctly in navigation

---

## Browser Console Commands for Testing

```javascript
// Check localStorage cart
localStorage.getItem('cart')

// Clear cart
localStorage.removeItem('cart')

// Add test item to cart
localStorage.setItem('cart', JSON.stringify([
  { id: 1, name: 'OLED Display', price: 299.99, quantity: 2 }
]))

// Check current route
window.location.pathname
```
