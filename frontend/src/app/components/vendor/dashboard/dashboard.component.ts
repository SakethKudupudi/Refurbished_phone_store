import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface VendorStats {
  revenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  activeProducts: number;
  lowStockItems: number;
  rating: number;
  reviewCount: number;
}

interface Order {
  id: string;
  productName: string;
  quantity: number;
  amount: number;
  status: string;
  date: string;
}

interface LowStockProduct {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
}

interface TopProduct {
  rank: number;
  name: string;
  soldCount: number;
  revenue: number;
}

interface SalesData {
  label: string;
  value: number;
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  vendorName: string = 'Tech Parts Pro';
  selectedPeriod: string = 'month';

  stats: VendorStats = {
    revenue: 45280,
    revenueChange: 12.5,
    totalOrders: 342,
    ordersChange: 8.3,
    activeProducts: 156,
    lowStockItems: 8,
    rating: 4.8,
    reviewCount: 1243
  };

  recentOrders: Order[] = [
    {
      id: 'ORD-2045',
      productName: 'iPhone 15 Pro OLED Display',
      quantity: 2,
      amount: 599.98,
      status: 'Processing',
      date: '2 hours ago'
    },
    {
      id: 'ORD-2044',
      productName: 'Galaxy S24 Battery 5000mAh',
      quantity: 5,
      amount: 249.95,
      status: 'Shipped',
      date: '5 hours ago'
    },
    {
      id: 'ORD-2043',
      productName: 'Pixel 8 Pro Rear Camera',
      quantity: 1,
      amount: 189.99,
      status: 'Delivered',
      date: '1 day ago'
    },
    {
      id: 'ORD-2042',
      productName: 'OnePlus 12 USB-C Port',
      quantity: 3,
      amount: 89.97,
      status: 'Processing',
      date: '1 day ago'
    },
    {
      id: 'ORD-2041',
      productName: 'Xiaomi 14 LCD Display',
      quantity: 4,
      amount: 479.96,
      status: 'Shipped',
      date: '2 days ago'
    }
  ];

  lowStockProducts: LowStockProduct[] = [
    { id: 1, name: 'iPhone 15 Pro Max OLED Screen', currentStock: 8, minStock: 20 },
    { id: 2, name: 'Galaxy S24 Ultra Battery', currentStock: 5, minStock: 15 },
    { id: 3, name: 'Pixel 8 Pro Camera Module', currentStock: 12, minStock: 25 },
    { id: 4, name: 'OnePlus 12 Charging Port', currentStock: 15, minStock: 30 },
    { id: 5, name: 'Xiaomi 14 LCD Display', currentStock: 7, minStock: 20 }
  ];

  topProducts: TopProduct[] = [
    { rank: 1, name: 'iPhone 15 Pro OLED Display', soldCount: 156, revenue: 46800 },
    { rank: 2, name: 'Galaxy S24 Ultra Battery', soldCount: 142, revenue: 14200 },
    { rank: 3, name: 'Pixel 8 Pro Camera Module', soldCount: 98, revenue: 18620 },
    { rank: 4, name: 'OnePlus 12 Charging Port', soldCount: 87, revenue: 2610 },
    { rank: 5, name: 'Xiaomi 14 Pro Display', soldCount: 76, revenue: 9120 }
  ];

  salesChartData: SalesData[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadSalesData();
  }

  loadSalesData() {
    // Mock sales data based on selected period
    if (this.selectedPeriod === 'week') {
      const weekData = [
        { label: 'Mon', value: 5200 },
        { label: 'Tue', value: 6800 },
        { label: 'Wed', value: 4900 },
        { label: 'Thu', value: 7200 },
        { label: 'Fri', value: 8500 },
        { label: 'Sat', value: 9200 },
        { label: 'Sun', value: 6400 }
      ];
      const maxValue = Math.max(...weekData.map(d => d.value));
      this.salesChartData = weekData.map(d => ({
        ...d,
        percentage: (d.value / maxValue) * 100
      }));
    } else if (this.selectedPeriod === 'month') {
      const monthData = [
        { label: 'Week 1', value: 12500 },
        { label: 'Week 2', value: 18200 },
        { label: 'Week 3', value: 15800 },
        { label: 'Week 4', value: 22100 }
      ];
      const maxValue = Math.max(...monthData.map(d => d.value));
      this.salesChartData = monthData.map(d => ({
        ...d,
        percentage: (d.value / maxValue) * 100
      }));
    } else {
      const yearData = [
        { label: 'Jan', value: 32000 },
        { label: 'Feb', value: 28500 },
        { label: 'Mar', value: 35200 },
        { label: 'Apr', value: 38900 },
        { label: 'May', value: 42100 },
        { label: 'Jun', value: 45280 }
      ];
      const maxValue = Math.max(...yearData.map(d => d.value));
      this.salesChartData = yearData.map(d => ({
        ...d,
        percentage: (d.value / maxValue) * 100
      }));
    }
  }

  changePeriod(period: string) {
    this.selectedPeriod = period;
    this.loadSalesData();
  }

  navigateToInventory() {
    this.router.navigate(['/vendor/inventory']);
  }

  navigateToOrders() {
    this.router.navigate(['/vendor/orders']);
  }

  logout() {
    // Clear session and navigate to login
    this.router.navigate(['/']);
  }

  restockProduct(productId: number) {
    console.log('Restocking product:', productId);
    // TODO: Implement restock functionality
    alert('Restock functionality coming soon!');
  }

  addNewProduct() {
    console.log('Adding new product');
    // TODO: Navigate to add product page
    alert('Add product functionality coming soon!');
  }

  updatePrices() {
    console.log('Updating prices');
    // TODO: Navigate to price management
    alert('Price update functionality coming soon!');
  }

  viewReports() {
    console.log('Viewing reports');
    // TODO: Navigate to reports page
    alert('Reports functionality coming soon!');
  }

  manageShipping() {
    console.log('Managing shipping');
    // TODO: Navigate to shipping management
    alert('Shipping management coming soon!');
  }
}
