import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentService, Component as ProductComponent } from '../../../services/component.service';
import { BrandService } from '../../../services/brand.service';
import { ModelService } from '../../../services/model.service';

interface Product {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  currentStock: number;
  minStock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pending Approval';
  lastUpdated: string;
  approvalStatus?: string;
}

interface NewProduct {
  name: string;
  type: string;
  brandId: number;
  modelId: number;
  description: string;
  quantity: number;
  price: number;
  warranty: number;
  manufacturer: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  showAddProductModal: boolean = false;
  showRestockModal: boolean = false;
  selectedProduct: Product | null = null;
  searchQuery: string = '';
  filterStatus: string = 'all';
  loading: boolean = false;
  
  newProduct: NewProduct = {
    name: '',
    type: 'SCREEN',
    brandId: 0,
    modelId: 0,
    description: '',
    quantity: 0,
    price: 0,
    warranty: 6,
    manufacturer: ''
  };

  restockQuantity: number = 0;
  restockPrice: number = 0;

  productTypes = [
    'SCREEN',
    'BATTERY',
    'CAMERA_REAR',
    'CAMERA_FRONT',
    'CHARGING_PORT',
    'SPEAKER',
    'MICROPHONE',
    'MOTHERBOARD',
    'BACK_COVER',
    'SIM_TRAY',
    'FLEX_CABLE'
  ];

  brands: any[] = [];
  models: any[] = [];
  filteredModels: any[] = [];

  products: Product[] = [];

  constructor(
    private router: Router,
    private componentService: ComponentService,
    private brandService: BrandService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.loadBrands();
    this.loadVendorComponents();
  }

  loadBrands() {
    this.brandService.getAllBrandsRest().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      }
    });
  }

  loadVendorComponents() {
    this.loading = true;
    // TODO: Get actual vendor ID from auth service
    const vendorId = 5; // Using the test vendor ID we created
    
    this.componentService.getComponentsByVendorRest(vendorId).subscribe({
      next: (components) => {
        this.products = components.map(c => this.mapComponentToProduct(c));
        this.updateProductStatuses();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading components:', error);
        this.loading = false;
      }
    });
  }

  mapComponentToProduct(component: ProductComponent): Product {
    return {
      id: component.id!,
      name: component.name,
      type: component.componentType,
      brand: component.model?.brand?.name || 'Unknown',
      model: component.model?.name || 'Unknown',
      currentStock: component.quantityAvailable,
      minStock: 20,
      price: component.price,
      status: this.getProductStatus(component),
      lastUpdated: this.getRelativeTime(component.updatedAt || component.createdAt || ''),
      approvalStatus: component.approvalStatus
    };
  }

  getProductStatus(component: ProductComponent): 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pending Approval' {
    if (component.approvalStatus === 'PENDING') {
      return 'Pending Approval';
    }
    if (component.quantityAvailable === 0) {
      return 'Out of Stock';
    }
    if (component.quantityAvailable < 20) {
      return 'Low Stock';
    }
    return 'In Stock';
  }

  getRelativeTime(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  onBrandChange() {
    if (this.newProduct.brandId) {
      this.modelService.getModelsByBrandRest(this.newProduct.brandId).subscribe({
        next: (models) => {
          this.filteredModels = models;
          this.newProduct.modelId = 0;
        },
        error: (error) => {
          console.error('Error loading models:', error);
        }
      });
    } else {
      this.filteredModels = [];
      this.newProduct.modelId = 0;
    }
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
      brandId: 0,
      modelId: 0,
      description: '',
      quantity: 0,
      price: 0,
      warranty: 6,
      manufacturer: ''
    };
    this.filteredModels = [];
  }

  addProduct() {
    if (this.validateNewProduct()) {
      this.loading = true;

      const componentData: Partial<ProductComponent> = {
        name: this.newProduct.name,
        componentType: this.newProduct.type,
        description: this.newProduct.description,
        price: this.newProduct.price,
        quantityAvailable: this.newProduct.quantity,
        warrantyMonths: this.newProduct.warranty,
        manufacturer: this.newProduct.manufacturer,
        model: {
          id: this.newProduct.modelId,
          name: '', // Will be fetched by backend
          brand: {
            id: 0,
            name: ''
          }
        },
        condition: 'NEW',
        isActive: true
      };

      this.componentService.createComponentRest(componentData).subscribe({
        next: (createdComponent) => {
          alert('Product added successfully! Pending admin approval.');
          this.loadVendorComponents(); // Reload the list
          this.closeAddProductModal();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creating component:', error);
          alert('Failed to add product. Please try again.');
          this.loading = false;
        }
      });
    }
  }

  validateNewProduct(): boolean {
    if (!this.newProduct.name || !this.newProduct.brandId || !this.newProduct.modelId) {
      alert('Please fill in all required fields (name, brand, model)');
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
