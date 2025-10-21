# 🔐 Admin Dashboard Access Guide

## Admin Dashboard URLs

### 1. Admin Login Page
**URL:** http://localhost:4200/admin/login

Start here to authenticate as an admin user.

### 2. Admin Dashboard (Protected)
**URL:** http://localhost:4200/admin/dashboard

**Note:** This route is protected by:
- `authGuard` - Requires authentication
- `roleGuard` - Requires ADMIN role

### 3. Other Admin Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | http://localhost:4200/admin/dashboard | Main admin overview |
| Approvals | http://localhost:4200/admin/approvals | Vendor approval management |
| Analytics | http://localhost:4200/admin/analytics | Business analytics & reports |
| Users | http://localhost:4200/admin/users | User management |
| Orders | http://localhost:4200/admin/orders | Order management |

---

## Quick Access (Development Mode)

### Option 1: Direct Navigation (If Guards Allow)

Simply navigate to:
```
http://localhost:4200/admin/dashboard
```

If the guards redirect you to login, proceed to Option 2.

### Option 2: Via Admin Login

1. Navigate to: http://localhost:4200/admin/login
2. Enter admin credentials (mock login)
3. Will redirect to admin dashboard

### Option 3: Bypass Guards (Development Only)

You can temporarily disable the guards for development:

**Edit:** `frontend/src/app/app.routes.ts`

Change:
```typescript
{
  path: 'admin',
  canActivate: [authGuard, roleGuard],  // Comment these out
  data: { role: 'ADMIN' },
  children: [
    { path: 'dashboard', component: AdminDashboardComponent },
    // ...
  ]
}
```

To:
```typescript
{
  path: 'admin',
  // canActivate: [authGuard, roleGuard],  // Commented out for dev
  // data: { role: 'ADMIN' },
  children: [
    { path: 'dashboard', component: AdminDashboardComponent },
    // ...
  ]
}
```

Then navigate directly to http://localhost:4200/admin/dashboard

---

## Navigation from Landing Page

You can also add a quick link to the admin dashboard from the landing page:

**Add to header or footer:**
```html
<a href="/admin/login">Admin Login</a>
```

---

## Current Status

✅ **Routes Configured:**
- Admin login page exists
- Admin dashboard exists  
- All admin sub-pages exist

⚠️ **Authentication:**
- Guards are active (requires auth + ADMIN role)
- Backend authentication not yet implemented
- Mock login may be in place

---

## Recommended Next Steps

### For Immediate Access:

**Best Option:** Navigate directly to:
```
http://localhost:4200/admin/login
```

Then check if the login component has a mock/bypass option for development.

### For Development:

Temporarily comment out the guards in `app.routes.ts` as shown in Option 3 above.

### For Production:

Implement the full authentication flow:
1. Spring Security backend
2. Azure AD B2C integration
3. JWT token handling
4. Role-based access control

---

## Quick Test

Open your browser console and run:
```javascript
// Navigate to admin login
window.location.href = '/admin/login'

// Or directly to dashboard (if guards allow)
window.location.href = '/admin/dashboard'
```

---

**Current Application:** http://localhost:4200/  
**Admin Login:** http://localhost:4200/admin/login  
**Admin Dashboard:** http://localhost:4200/admin/dashboard  

Try accessing the admin login page first! 🚀
