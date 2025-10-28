import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface CartItem {
  id: number;
  component: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/cart`;
  private cartItemCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    // Initialize cart count on service creation
    this.refreshCartCount();
  }

  /**
   * Get observable for cart item count
   */
  getCartItemCount(): Observable<number> {
    return this.cartItemCount$.asObservable();
  }

  /**
   * Get all cart items for current user
   */
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  /**
   * Get cart summary (items + totals)
   */
  getCartSummary(): Observable<CartSummary> {
    return this.http.get<CartSummary>(`${this.apiUrl}/summary`);
  }

  /**
   * Add item to cart
   */
  addToCart(componentId: number, quantity: number = 1): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, { componentId, quantity })
      .pipe(tap(() => this.refreshCartCount()));
  }

  /**
   * Update cart item quantity
   */
  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${cartItemId}`, { quantity })
      .pipe(tap(() => this.refreshCartCount()));
  }

  /**
   * Remove item from cart
   */
  removeFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartItemId}`)
      .pipe(tap(() => this.refreshCartCount()));
  }

  /**
   * Clear entire cart
   */
  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`)
      .pipe(tap(() => this.cartItemCount$.next(0)));
  }

  /**
   * Get cart total amount
   */
  getCartTotal(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total`);
  }

  /**
   * Refresh cart item count
   */
  private refreshCartCount(): void {
    this.http.get<{ count: number }>(`${this.apiUrl}/count`)
      .subscribe({
        next: (response) => this.cartItemCount$.next(response.count),
        error: () => this.cartItemCount$.next(0)
      });
  }
}
