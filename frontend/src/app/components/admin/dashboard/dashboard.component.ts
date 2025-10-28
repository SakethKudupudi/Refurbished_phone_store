import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface PendingApproval {
  id: number;
  type: 'product' | 'price' | 'vendor';
  vendorName: string;
  productName?: string;
  oldPrice?: number;
  newPrice?: number;
  quantity?: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PlatformStats {
  totalVendors: number;
  activeVendors: number;
  totalProducts: number;
  pendingApprovals: number;
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
}

interface RecentActivity {
  id: number;
  type: 'order' | 'vendor' | 'product' | 'approval';
  description: string;
  timestamp: string;
  status: string;
}

interface TopVendor {
  id: number;
  name: string;
  products: number;
  revenue: number;
  rating: number;
  orders: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  platformStats: PlatformStats = {
    totalVendors: 45,
    activeVendors: 38,
    totalProducts: 1247,
    pendingApprovals: 12,
    totalRevenue: 485920,
    revenueGrowth: 24.5,
    totalOrders: 3456,
    ordersGrowth: 18.2
  };

  pendingApprovals: PendingApproval[] = [
    {
      id: 1,
      type: 'product',
      vendorName: 'Tech Parts Pro',
      productName: 'iPhone 15 Pro Max OLED Display',
      quantity: 50,
      requestDate: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'price',
      vendorName: 'Mobile Solutions Inc',
      productName: 'Galaxy S24 Ultra Battery',
      oldPrice: 49.99,
      newPrice: 54.99,
      requestDate: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'vendor',
      vendorName: 'Quick Parts Supply',
      requestDate: '1 day ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'product',
      vendorName: 'Elite Mobile Parts',
      productName: 'Pixel 8 Pro Camera Module',
      quantity: 30,
      requestDate: '1 day ago',
      status: 'pending'
    },
    {
      id: 5,
      type: 'price',
      vendorName: 'Tech Parts Pro',
      productName: 'OnePlus 12 Charging Port',
      oldPrice: 29.99,
      newPrice: 34.99,
      requestDate: '2 days ago',
      status: 'pending'
    }
  ];

  recentActivity: RecentActivity[] = [
    {
      id: 1,
      type: 'order',
      description: 'New order #ORD-2045 placed by John Doe',
      timestamp: '5 min ago',
      status: 'new'
    },
    {
      id: 2,
      type: 'approval',
      description: 'Product approval request from Tech Parts Pro',
      timestamp: '15 min ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'vendor',
      description: 'New vendor registration: Quick Parts Supply',
      timestamp: '1 hour ago',
      status: 'new'
    },
    {
      id: 4,
      type: 'product',
      description: 'Product "Galaxy S24 Battery" out of stock',
      timestamp: '2 hours ago',
      status: 'warning'
    },
    {
      id: 5,
      type: 'order',
      description: 'Order #ORD-2044 shipped by Mobile Solutions Inc',
      timestamp: '3 hours ago',
      status: 'completed'
    }
  ];

  topVendors: TopVendor[] = [
    {
      id: 1,
      name: 'Tech Parts Pro',
      products: 156,
      revenue: 125000,
      rating: 4.8,
      orders: 842
    },
    {
      id: 2,
      name: 'Mobile Solutions Inc',
      products: 98,
      revenue: 98500,
      rating: 4.7,
      orders: 654
    },
    {
      id: 3,
      name: 'Elite Mobile Parts',
      products: 142,
      revenue: 87200,
      rating: 4.6,
      orders: 523
    },
    {
      id: 4,
      name: 'Parts Express',
      products: 76,
      revenue: 65400,
      rating: 4.5,
      orders: 412
    },
    {
      id: 5,
      name: 'Premium Components',
      products: 89,
      revenue: 54800,
      rating: 4.4,
      orders: 387
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  approveRequest(approval: PendingApproval) {
    approval.status = 'approved';
    this.platformStats.pendingApprovals--;
    
    let message = '';
    if (approval.type === 'product') {
      message = `Product "${approval.productName}" has been approved and is now live!`;
    } else if (approval.type === 'price') {
      message = `Price update for "${approval.productName}" has been approved!`;
    } else {
      message = `Vendor "${approval.vendorName}" has been approved!`;
    }
    
    alert(message);
    // TODO: Send approval to backend
  }

  rejectRequest(approval: PendingApproval) {
    if (confirm('Are you sure you want to reject this request?')) {
      approval.status = 'rejected';
      this.platformStats.pendingApprovals--;
      alert('Request has been rejected');
      // TODO: Send rejection to backend
    }
  }

  navigateToApprovals() {
    this.router.navigate(['/admin/approvals']);
  }

  navigateToAnalytics() {
    this.router.navigate(['/admin/analytics']);
  }

  navigateToUsers() {
    this.router.navigate(['/admin/users']);
  }

  navigateToOrders() {
    this.router.navigate(['/admin/orders']);
  }

  logout() {
    this.router.navigate(['/']);
  }
}
