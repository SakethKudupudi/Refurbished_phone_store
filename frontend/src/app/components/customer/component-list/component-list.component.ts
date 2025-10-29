import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { ComponentService, Component as ComponentData } from '../../../services/component.service';
import { ModelService } from '../../../services/model.service';

interface ComponentPart {
  id: number;
  name: string;
  type: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  quantityInStock: number;
  image: string;
  imageUrl?: string;
  features: string[];
  vendorName: string;
  modelId: number;
}

@Component({
  selector: 'app-component-list',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ComponentListComponent implements OnInit {
  components: ComponentPart[] = [];
  filteredComponents: ComponentPart[] = [];
  modelId: number = 0;
  modelName: string = '';
  selectedType: string = 'ALL';
  selectedCategory: string = '';
  categories: string[] = ['Display', 'Battery', 'Camera', 'Charging Port', 'Speaker', 'Button'];
  loading: boolean = true;
  cartItemCount: number = 0;
  cartItemsCount: number = 0;
  showToast: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentService: ComponentService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelId = +params['modelId'];
      this.loadModelName();
      this.loadComponents();
    });
    this.loadCartCount();
  }

  loadModelName() {
    this.modelService.getModelById(this.modelId).subscribe({
      next: (model: any) => {
        this.modelName = `${model.brand.name} ${model.name}`;
      },
      error: (err: any) => {
        console.error('Error loading model:', err);
        this.modelName = 'Phone Model';
      }
    });
  }

  loadComponents() {
    this.loading = true;
    this.componentService.getComponentsByModel(this.modelId).subscribe({
      next: (data: ComponentData[]) => {
        this.components = (data || []).map(c => this.mapToComponentPart(c));
        this.filteredComponents = this.components;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading components:', err);
        this.loading = false;
        this.components = [];
        this.filteredComponents = [];
      }
    });
  }

  mapToComponentPart(component: any): ComponentPart {
    const typeMapping: { [key: string]: string } = {
      'SCREEN': 'Display',
      'BATTERY': 'Battery',
      'CAMERA': 'Camera',
      'CHARGING_PORT': 'Charging Port',
      'OTHER': 'Other'
    };

    const imageMapping: { [key: string]: string } = {
      'SCREEN': 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
      'BATTERY': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80',
      'CAMERA': 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80',
      'CHARGING_PORT': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80',
      'OTHER': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'
    };

    const features = [
      component.warrantyMonths ? `${component.warrantyMonths} Month Warranty` : 'Warranty',
      'Original Quality',
      component.approvalStatus === 'APPROVED' ? 'Certified' : 'Pending'
    ];

    return {
      id: component.id,
      name: component.name,
      type: component.componentType,
      category: typeMapping[component.componentType] || component.componentType,
      description: component.description,
      price: component.price,
      stock: component.quantityAvailable,
      quantityInStock: component.quantityAvailable,
      image: component.imageUrl || imageMapping[component.componentType] || imageMapping['OTHER'],
      imageUrl: component.imageUrl,
      features: features,
      vendorName: component.vendor ? `${component.vendor.firstName} ${component.vendor.lastName}` : 'Vendor',
      modelId: component.model?.id || this.modelId
    };
  }

  getModelName(id: number): string {
    const models: any = {
      1: 'iPhone 15 Pro Max',
      2: 'iPhone 15 Pro',
      3: 'iPhone 14 Pro Max',
      4: 'Galaxy S24 Ultra',
      5: 'Galaxy S23 Ultra',
      6: 'Pixel 8 Pro',
      7: 'OnePlus 12',
      8: 'Xiaomi 14 Ultra'
    };
    return models[id] || 'Unknown Model';
  }

  getBrandIdFromModel(modelId: number): number {
    const modelToBrand: any = {
      1: 5, 2: 5, 3: 5, 28: 5, 29: 5, 30: 5, 31: 5, 32: 5, 33: 5, 34: 5, 35: 5, 36: 5,
      4: 2, 5: 2, // Samsung
      6: 3, // Google
      7: 4, // OnePlus
      8: 5  // Xiaomi (mapped to 5 as example)
    };
    return modelToBrand[modelId] || 5;
  }

  filterByType(type: string) {
    this.selectedType = type;
    if (type === 'ALL') {
      this.filteredComponents = this.components;
    } else {
      this.filteredComponents = this.components.filter(c => c.type === type);
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.filteredComponents = this.components;
    } else {
      this.filteredComponents = this.components.filter(c => c.category === category);
    }
  }

  addToCart(component: ComponentPart) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === component.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...component,
        quantity: 1,
        imageUrl: component.image
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItemCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    this.cartItemsCount = this.cartItemCount;

    window.dispatchEvent(new Event('cartUpdated'));

    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    this.cartItemsCount = this.cartItemCount;
  }

  viewDetails(id: number) {
    this.router.navigate(['/component', id]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goBack() {
    const brandId = this.getBrandIdFromModel(this.modelId);
    this.router.navigate(['/models', brandId]);
  }
}
