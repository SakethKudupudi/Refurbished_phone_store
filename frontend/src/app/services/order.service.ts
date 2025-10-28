import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  shippingName: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  trackingNumber?: string;
  items: OrderItem[];
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  component: {
    id: number;
    name: string;
    imageUrl?: string;
  };
}

export interface CreateOrderRequest {
  shippingName: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) { }

  /**
   * Create order from current cart
   */
  createOrder(orderData: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  /**
   * Get all orders for current user
   */
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }

  /**
   * Get order by ID
   */
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  /**
   * Get order by order number
   */
  getOrderByNumber(orderNumber: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/number/${orderNumber}`);
  }

  /**
   * Get all orders (admin only)
   */
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  /**
   * Update order status (admin/vendor only)
   */
  updateOrderStatus(orderId: number, status: Order['orderStatus']): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/status`, { status });
  }

  /**
   * Update payment status (admin only)
   */
  updatePaymentStatus(orderId: number, status: Order['paymentStatus']): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/payment`, { status });
  }

  /**
   * Update tracking number (admin/vendor only)
   */
  updateTrackingNumber(orderId: number, trackingNumber: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/tracking`, { trackingNumber });
  }

  /**
   * Cancel order (customer can cancel if PENDING, admin can cancel any)
   */
  cancelOrder(orderId: number, reason?: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${orderId}/cancel`, { reason });
  }
}
