import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  vendorName: string;
  description?: string;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'translateX(-100px)' }))
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 9.99;
  tax: number = 0;
  total: number = 0;
  showToast: boolean = false;
  toastMessage: string = '';
  animationTrigger: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCart();
    localStorage.setItem('currentUser', 'John Doe'); // Set demo user
  }

  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotals();
    this.animationTrigger++;
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Free shipping over $100
    if (this.subtotal >= 100) {
      this.shipping = 0;
    } else if (this.subtotal > 0) {
      this.shipping = 9.99;
    } else {
      this.shipping = 0;
    }
    
    this.tax = this.subtotal * 0.1; // 10% tax
    this.total = this.subtotal + this.shipping + this.tax;
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.saveCart();
    this.calculateTotals();
    this.dispatchCartUpdate();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
      this.calculateTotals();
      this.dispatchCartUpdate();
    }
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.saveCart();
    this.calculateTotals();
    this.dispatchCartUpdate();
    this.showToastMessage(`${item.name} removed from cart`);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartItems = [];
      this.saveCart();
      this.calculateTotals();
      this.dispatchCartUpdate();
      this.showToastMessage('Cart cleared');
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  dispatchCartUpdate() {
    window.dispatchEvent(new Event('cartUpdated'));
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      this.showToastMessage('Your cart is empty');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  continueShopping() {
    this.router.navigate(['/shop']);
  }
}
