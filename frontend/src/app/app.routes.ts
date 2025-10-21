import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/customer/landing-page/landing-page.component';
import { CategorySelectionComponent } from './components/customer/category-selection/category-selection.component';
import { BrandListComponent } from './components/customer/brand-list/brand-list.component';
import { ModelListComponent } from './components/customer/model-list/model-list.component';
import { ComponentListComponent } from './components/customer/component-list/component-list.component';
import { ComponentDetailsComponent } from './components/customer/component-details/component-details.component';
import { ShoppingCartComponent } from './components/customer/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/customer/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/customer/order-confirmation/order-confirmation.component';
import { LoginComponent as VendorLoginComponent } from './components/vendor/login/login.component';
import { DashboardComponent as VendorDashboardComponent } from './components/vendor/dashboard/dashboard.component';
import { InventoryComponent } from './components/vendor/inventory/inventory.component';
import { OrdersComponent as VendorOrdersComponent } from './components/vendor/orders/orders.component';
import { LoginComponent as AdminLoginComponent } from './components/admin/login/login.component';
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ApprovalsComponent } from './components/admin/approvals/approvals.component';
import { AnalyticsComponent } from './components/admin/analytics/analytics.component';
import { UsersComponent } from './components/admin/users/users.component';
import { OrdersComponent as AdminOrdersComponent } from './components/admin/orders/orders.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Login Portal (Default Landing)
  { path: '', component: AdminLoginComponent },
  
  // Customer Routes
  { path: 'shop', component: LandingPageComponent },
  { path: 'category/:category', component: CategorySelectionComponent },
  { path: 'brands/:category', component: BrandListComponent },
  { path: 'models/:brandId', component: ModelListComponent },
  { path: 'components/:modelId', component: ComponentListComponent },
  { path: 'component/:componentId', component: ComponentDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation/:orderId', component: OrderConfirmationComponent },
  
  // Vendor Routes
  { path: 'vendor/login', component: VendorLoginComponent },
  {
    path: 'vendor',
    canActivate: [authGuard, roleGuard],
    data: { role: 'VENDOR' },
    children: [
      { path: 'dashboard', component: VendorDashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'orders', component: VendorOrdersComponent },
    ]
  },
  
  // Admin Routes
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'approvals', component: ApprovalsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: AdminOrdersComponent },
    ]
  },
  
  // Fallback
  { path: '**', redirectTo: '' }
];
