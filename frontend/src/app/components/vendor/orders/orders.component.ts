import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  orderDate: Date;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
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
  cancelled: number;
  todayRevenue: number;
  pendingRevenue: number;
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
  
  // Order stats
  stats: OrderStats = {
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    todayRevenue: 0,
    pendingRevenue: 0
  };

  // Modal states
  showUpdateStatusModal: boolean = false;
  showAddTrackingModal: boolean = false;
  showCancelOrderModal: boolean = false;
  
  // Form data
  newStatus: string = '';
  trackingNumber: string = '';
  estimatedDelivery: string = '';
  cancellationReason: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.calculateStats();
    
    // Handle query params from Quick Actions navigation
    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        // Apply filter based on query param
        if (params['filter'] === 'shipping') {
          this.filterStatus = 'shipped';
          this.applyFilters();
        }
      }
    });
  }

  loadOrders(): void {
    // Mock data - Replace with actual API call
    this.orders = [
      {
        id: '1',
        orderNumber: 'ORD-2045',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '+1 (555) 123-4567',
        items: [
          {
            id: 1,
            productName: 'iPhone 15 Pro OLED Display',
            type: 'SCREEN',
            quantity: 2,
            price: 299.99,
            subtotal: 599.98
          },
          {
            id: 2,
            productName: 'iPhone 15 Pro Battery',
            type: 'BATTERY',
            quantity: 1,
            price: 79.99,
            subtotal: 79.99
          }
        ],
        totalAmount: 679.97,
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
        customerPhone: '+1 (555) 234-5678',
        items: [
          {
            id: 3,
            productName: 'Galaxy S24 Ultra Battery 5000mAh',
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
        customerPhone: '+1 (555) 345-6789',
        items: [
          {
            id: 4,
            productName: 'Pixel 8 Pro Rear Camera',
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
        trackingNumber: 'TRK123456789',
        estimatedDelivery: new Date('2025-10-30')
      },
      {
        id: '4',
        orderNumber: 'ORD-2042',
        customerName: 'Emily Davis',
        customerEmail: 'emily.d@email.com',
        customerPhone: '+1 (555) 456-7890',
        items: [
          {
            id: 5,
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
        customerPhone: '+1 (555) 567-8901',
        items: [
          {
            id: 6,
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
        shippingAddress: '654 Maple Dr, Austin, TX 78701',
        notes: 'Customer requested cancellation - Item out of stock'
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
    this.stats.cancelled = this.orders.filter(o => o.status === 'cancelled').length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.stats.todayRevenue = this.orders
      .filter(o => {
        const orderDate = new Date(o.orderDate);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime() && o.paymentStatus === 'paid';
      })
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    this.stats.pendingRevenue = this.orders
      .filter(o => o.status === 'pending' || o.status === 'processing')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(this.searchQuery.toLowerCase());
      
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
        case 'status':
          return a.status.localeCompare(b.status);
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

  openUpdateStatusModal(order: Order): void {
    this.selectedOrder = order;
    this.newStatus = order.status;
    this.showUpdateStatusModal = true;
  }

  updateOrderStatus(): void {
    if (this.selectedOrder) {
      this.selectedOrder.status = this.newStatus as any;
      this.showUpdateStatusModal = false;
      this.calculateStats();
      this.applyFilters();
      // TODO: Call API to update status
    }
  }

  openAddTrackingModal(order: Order): void {
    this.selectedOrder = order;
    this.trackingNumber = order.trackingNumber || '';
    this.estimatedDelivery = order.estimatedDelivery ? 
      new Date(order.estimatedDelivery).toISOString().split('T')[0] : '';
    this.showAddTrackingModal = true;
  }

  addTrackingInfo(): void {
    if (this.selectedOrder) {
      this.selectedOrder.trackingNumber = this.trackingNumber;
      if (this.estimatedDelivery) {
        this.selectedOrder.estimatedDelivery = new Date(this.estimatedDelivery);
      }
      if (this.selectedOrder.status === 'processing' || this.selectedOrder.status === 'confirmed') {
        this.selectedOrder.status = 'shipped';
      }
      this.showAddTrackingModal = false;
      this.calculateStats();
      // TODO: Call API to update tracking info
    }
  }

  openCancelOrderModal(order: Order): void {
    this.selectedOrder = order;
    this.cancellationReason = '';
    this.showCancelOrderModal = true;
  }

  cancelOrder(): void {
    if (this.selectedOrder && this.cancellationReason) {
      this.selectedOrder.status = 'cancelled';
      this.selectedOrder.notes = this.cancellationReason;
      this.showCancelOrderModal = false;
      this.calculateStats();
      this.applyFilters();
      // TODO: Call API to cancel order
    }
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
    // TODO: Implement CSV export
    console.log('Exporting orders...');
  }

  printOrder(order: Order): void {
    // TODO: Implement print functionality
    console.log('Printing order:', order.orderNumber);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/vendor/dashboard']);
  }

  navigateToInventory(): void {
    this.router.navigate(['/vendor/inventory']);
  }

  logout(): void {
    // TODO: Implement logout
    this.router.navigate(['/vendor/login']);
  }
}
