import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  currentStock: number;
  minStock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

interface NewProduct {
  name: string;
  type: string;
  brand: string;
  model: string;
  description: string;
  quantity: number;
  price: number;
  warranty: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  showAddProductModal: boolean = false;
  showRestockModal: boolean = false;
  selectedProduct: Product | null = null;
  searchQuery: string = '';
  filterStatus: string = 'all';
  
  newProduct: NewProduct = {
    name: '',
    type: 'SCREEN',
    brand: '',
    model: '',
    description: '',
    quantity: 0,
    price: 0,
    warranty: '6 months'
  };

  restockQuantity: number = 0;
  restockPrice: number = 0;

  productTypes = [
    'SCREEN',
    'BATTERY',
    'CAMERA',
    'CHARGING_PORT',
    'SPEAKER',
    'MICROPHONE',
    'MOTHERBOARD',
    'BACK_COVER',
    'SIM_TRAY',
    'FLEX_CABLE'
  ];

  brands = [
    'Apple',
    'Samsung',
    'Google',
    'OnePlus',
    'Xiaomi',
    'Oppo',
    'Vivo',
    'Realme',
    'Motorola',
    'Nokia'
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max OLED Display',
      type: 'SCREEN',
      brand: 'Apple',
      model: 'iPhone 15 Pro Max',
      currentStock: 8,
      minStock: 20,
      price: 299.99,
      status: 'Low Stock',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Galaxy S24 Ultra Battery 5000mAh',
      type: 'BATTERY',
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      currentStock: 5,
      minStock: 15,
      price: 49.99,
      status: 'Low Stock',
      lastUpdated: '5 hours ago'
    },
    {
      id: 3,
      name: 'Pixel 8 Pro Rear Camera Module',
      type: 'CAMERA',
      brand: 'Google',
      model: 'Pixel 8 Pro',
      currentStock: 12,
      minStock: 25,
      price: 189.99,
      status: 'Low Stock',
      lastUpdated: '1 day ago'
    },
    {
      id: 4,
      name: 'OnePlus 12 USB-C Charging Port',
      type: 'CHARGING_PORT',
      brand: 'OnePlus',
      model: 'OnePlus 12',
      currentStock: 35,
      minStock: 30,
      price: 29.99,
      status: 'In Stock',
      lastUpdated: '2 days ago'
    },
    {
      id: 5,
      name: 'Xiaomi 14 Pro LCD Display',
      type: 'SCREEN',
      brand: 'Xiaomi',
      model: 'Xiaomi 14 Pro',
      currentStock: 0,
      minStock: 20,
      price: 119.99,
      status: 'Out of Stock',
      lastUpdated: '3 days ago'
    },
    {
      id: 6,
      name: 'iPhone 14 Pro Battery',
      type: 'BATTERY',
      brand: 'Apple',
      model: 'iPhone 14 Pro',
      currentStock: 42,
      minStock: 25,
      price: 79.99,
      status: 'In Stock',
      lastUpdated: '1 day ago'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateProductStatuses();
  }

  updateProductStatuses() {
    this.products.forEach(product => {
      if (product.currentStock === 0) {
        product.status = 'Out of Stock';
      } else if (product.currentStock < product.minStock) {
        product.status = 'Low Stock';
      } else {
        product.status = 'In Stock';
      }
    });
  }

  get filteredProducts(): Product[] {
    let filtered = this.products;

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.model.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === this.filterStatus);
    }

    return filtered;
  }

  get lowStockProducts(): Product[] {
    return this.products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');
  }

  openAddProductModal() {
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.resetNewProduct();
  }

  resetNewProduct() {
    this.newProduct = {
      name: '',
      type: 'SCREEN',
      brand: '',
      model: '',
      description: '',
      quantity: 0,
      price: 0,
      warranty: '6 months'
    };
  }

  addProduct() {
    if (this.validateNewProduct()) {
      const newProduct: Product = {
        id: this.products.length + 1,
        name: this.newProduct.name,
        type: this.newProduct.type,
        brand: this.newProduct.brand,
        model: this.newProduct.model,
        currentStock: this.newProduct.quantity,
        minStock: 20,
        price: this.newProduct.price,
        status: 'In Stock',
        lastUpdated: 'Just now'
      };

      this.products.unshift(newProduct);
      this.updateProductStatuses();
      this.closeAddProductModal();
      
      // TODO: Send to backend for admin approval
      alert('Product added successfully! Pending admin approval.');
    }
  }

  validateNewProduct(): boolean {
    if (!this.newProduct.name || !this.newProduct.brand || !this.newProduct.model) {
      alert('Please fill in all required fields');
      return false;
    }
    if (this.newProduct.quantity < 0 || this.newProduct.price <= 0) {
      alert('Please enter valid quantity and price');
      return false;
    }
    return true;
  }

  openRestockModal(product: Product) {
    this.selectedProduct = product;
    this.restockQuantity = 0;
    this.restockPrice = product.price;
    this.showRestockModal = true;
  }

  closeRestockModal() {
    this.showRestockModal = false;
    this.selectedProduct = null;
    this.restockQuantity = 0;
    this.restockPrice = 0;
  }

  restockProduct() {
    if (this.selectedProduct && this.restockQuantity > 0 && this.restockPrice > 0) {
      this.selectedProduct.currentStock += this.restockQuantity;
      this.selectedProduct.price = this.restockPrice;
      this.selectedProduct.lastUpdated = 'Just now';
      this.updateProductStatuses();
      this.closeRestockModal();
      
      // TODO: Send restock request to backend for admin approval
      alert('Restock request submitted! Pending admin approval.');
    } else {
      alert('Please enter valid quantity and price');
    }
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== productId);
      alert('Product deleted successfully');
    }
  }

  goBack() {
    this.router.navigate(['/vendor/dashboard']);
  }
}
