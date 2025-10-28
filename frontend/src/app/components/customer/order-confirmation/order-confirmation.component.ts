import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string = '';
  orderDate: string = '';
  estimatedDelivery: string = '';
  totalAmount: string = '0.00';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('orderId') || 'N/A';
    
    // Set order date to current date
    const today = new Date();
    this.orderDate = today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    // Calculate estimated delivery (7 days from now)
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    this.estimatedDelivery = deliveryDate.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });

    // Get total amount from localStorage (saved during checkout)
    const savedTotal = localStorage.getItem('lastOrderTotal');
    this.totalAmount = savedTotal || '99.99';
  }

  continueShopping() {
    this.router.navigate(['/']);
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }
}
