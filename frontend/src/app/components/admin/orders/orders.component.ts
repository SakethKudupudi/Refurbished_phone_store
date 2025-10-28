import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  orderDate: Date;
  shippingAddress: string;
  trackingNumber?: string;
}

interface OrderItem {
  id: number;
  productName: string;
  type: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  totalRevenue: number;
  todayOrders: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: Order | null = null;
  showOrderDetails: boolean = false;
  searchQuery: string = '';
  filterStatus: string = 'all';
  filterPayment: string = 'all';
  sortBy: string = 'date-desc';
  
  stats: OrderStats = {
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    totalRevenue: 0,
    todayOrders: 0
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
    this.calculateStats();
  }

  loadOrders(): void {
    // Mock data - Replace with actual API call
    this.orders = [
      {
        id: '1',
        orderNumber: 'ORD-2045',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        vendorName: 'Tech Parts Pro',
        items: [
          {
            id: 1,
            productName: 'iPhone 15 Pro OLED Display',
            type: 'SCREEN',
            quantity: 2,
            price: 299.99,
            subtotal: 599.98
          }
        ],
        totalAmount: 599.98,
        status: 'pending',
        paymentStatus: 'paid',
        orderDate: new Date('2025-10-28T10:30:00'),
        shippingAddress: '123 Main St, San Francisco, CA 94102'
      },
      {
        id: '2',
        orderNumber: 'ORD-2044',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        vendorName: 'Mobile Parts Express',
        items: [
          {
            id: 2,
            productName: 'Galaxy S24 Ultra Battery',
            type: 'BATTERY',
            quantity: 3,
            price: 69.99,
            subtotal: 209.97
          }
        ],
        totalAmount: 209.97,
        status: 'processing',
        paymentStatus: 'paid',
        orderDate: new Date('2025-10-28T08:15:00'),
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90001'
      },
      {
        id: '3',
        orderNumber: 'ORD-2043',
        customerName: 'Michael Brown',
        customerEmail: 'michael.b@email.com',
        vendorName: 'Tech Parts Pro',
        items: [
          {
            id: 3,
            productName: 'Pixel 8 Pro Camera',
            type: 'CAMERA',
            quantity: 1,
            price: 189.99,
            subtotal: 189.99
          }
        ],
        totalAmount: 189.99,
        status: 'shipped',
        paymentStatus: 'paid',
        orderDate: new Date('2025-10-27T14:20:00'),
        shippingAddress: '789 Pine Rd, New York, NY 10001',
        trackingNumber: 'TRK123456789'
      },
      {
        id: '4',
        orderNumber: 'ORD-2042',
        customerName: 'Emily Davis',
        customerEmail: 'emily.d@email.com',
        vendorName: 'Phone Repair Depot',
        items: [
          {
            id: 4,
            productName: 'OnePlus 12 USB-C Port',
            type: 'CHARGING_PORT',
            quantity: 5,
            price: 29.99,
            subtotal: 149.95
          }
        ],
        totalAmount: 149.95,
        status: 'delivered',
        paymentStatus: 'paid',
        orderDate: new Date('2025-10-25T09:00:00'),
        shippingAddress: '321 Elm St, Chicago, IL 60601',
        trackingNumber: 'TRK987654321'
      },
      {
        id: '5',
        orderNumber: 'ORD-2041',
        customerName: 'David Wilson',
        customerEmail: 'david.w@email.com',
        vendorName: 'Tech Parts Pro',
        items: [
          {
            id: 5,
            productName: 'Xiaomi 14 Pro Display',
            type: 'SCREEN',
            quantity: 1,
            price: 249.99,
            subtotal: 249.99
          }
        ],
        totalAmount: 249.99,
        status: 'cancelled',
        paymentStatus: 'refunded',
        orderDate: new Date('2025-10-24T16:45:00'),
        shippingAddress: '654 Maple Dr, Austin, TX 78701'
      }
    ];

    this.filteredOrders = [...this.orders];
    this.applyFilters();
  }

  calculateStats(): void {
    this.stats.total = this.orders.length;
    this.stats.pending = this.orders.filter(o => o.status === 'pending').length;
    this.stats.processing = this.orders.filter(o => o.status === 'processing').length;
    this.stats.shipped = this.orders.filter(o => o.status === 'shipped').length;
    this.stats.delivered = this.orders.filter(o => o.status === 'delivered').length;
    
    this.stats.totalRevenue = this.orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.stats.todayOrders = this.orders.filter(o => {
      const orderDate = new Date(o.orderDate);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    }).length;
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.vendorName.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.filterStatus === 'all' || order.status === this.filterStatus;
      const matchesPayment = this.filterPayment === 'all' || order.paymentStatus === this.filterPayment;
      
      return matchesSearch && matchesStatus && matchesPayment;
    });

    this.sortOrders();
  }

  sortOrders(): void {
    this.filteredOrders.sort((a, b) => {
      switch (this.sortBy) {
        case 'date-desc':
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        case 'date-asc':
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        case 'amount-desc':
          return b.totalAmount - a.totalAmount;
        case 'amount-asc':
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });
  }

  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
    this.showOrderDetails = true;
  }

  closeOrderDetails(): void {
    this.showOrderDetails = false;
    this.selectedOrder = null;
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || '';
  }

  getPaymentStatusClass(status: string): string {
    const classes: any = {
      'pending': 'payment-pending',
      'paid': 'payment-paid',
      'refunded': 'payment-refunded'
    };
    return classes[status] || '';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  exportOrders(): void {
    console.log('Exporting orders...');
    alert('Export functionality coming soon!');
  }

  navigateToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  navigateToAnalytics(): void {
    this.router.navigate(['/admin/analytics']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  logout(): void {
    this.router.navigate(['/admin/login']);
  }
}

