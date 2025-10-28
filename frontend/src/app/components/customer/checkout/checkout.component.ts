import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 9.99;
  tax: number = 0;
  total: number = 0;

  checkoutData = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCart();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  loadCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.tax = this.subtotal * 0.1;
    this.total = this.subtotal + this.shipping + this.tax;
  }

  placeOrder() {
    if (!this.validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate a mock order ID
    const orderId = Math.floor(Math.random() * 1000000);
    
    // Save total amount for confirmation page
    localStorage.setItem('lastOrderTotal', this.total.toFixed(2));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Navigate to confirmation
    this.router.navigate(['/order-confirmation', orderId]);
  }

  validateForm(): boolean {
    return !!(
      this.checkoutData.email &&
      this.checkoutData.firstName &&
      this.checkoutData.lastName &&
      this.checkoutData.address &&
      this.checkoutData.city &&
      this.checkoutData.state &&
      this.checkoutData.zipCode &&
      this.checkoutData.cardNumber &&
      this.checkoutData.expiryDate &&
      this.checkoutData.cvv
    );
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}
