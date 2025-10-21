import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

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
  styleUrl: './component-list.component.scss',
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

  // Mock data
  mockComponents: ComponentPart[] = [
    { 
      id: 1, 
      name: 'OLED Display Screen', 
      type: 'SCREEN', 
      category: 'Display',
      description: 'Original quality OLED display with vibrant colors', 
      price: 299.99, 
      stock: 15,
      quantityInStock: 15, 
      image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
      features: ['Original Quality', 'Easy Install', '1 Year Warranty'],
      vendorName: 'TechParts Pro', 
      modelId: 1 
    },
    { 
      id: 2, 
      name: 'High Capacity Battery', 
      type: 'BATTERY', 
      category: 'Battery',
      description: '4500mAh replacement battery with extended life', 
      price: 79.99, 
      stock: 25,
      quantityInStock: 25, 
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80',
      features: ['High Capacity', 'Fast Charging', 'Certified'],
      vendorName: 'PowerCell Inc', 
      modelId: 1 
    },
    { 
      id: 3, 
      name: 'Rear Camera Module', 
      type: 'CAMERA', 
      category: 'Camera',
      description: '48MP main camera with optical stabilization', 
      price: 149.99, 
      stock: 10,
      quantityInStock: 10, 
      image: 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=600&q=80',
      features: ['48MP', 'OIS', 'Premium Glass'],
      vendorName: 'CamTech', 
      modelId: 1 
    },
    { 
      id: 4, 
      name: 'USB-C Charging Port', 
      type: 'CHARGING_PORT', 
      category: 'Charging Port',
      description: 'Fast charging port with data sync support', 
      price: 39.99, 
      stock: 30,
      quantityInStock: 30, 
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80',
      features: ['Fast Charge', 'USB-C', 'Durable'],
      vendorName: 'ConnectParts', 
      modelId: 1 
    },
    { 
      id: 5, 
      name: 'LCD Display', 
      type: 'SCREEN', 
      category: 'Display',
      description: 'Premium LCD display with true colors', 
      price: 199.99, 
      stock: 8,
      quantityInStock: 8, 
      image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
      features: ['LCD Technology', 'Affordable', 'Warranty'],
      vendorName: 'ScreenMasters', 
      modelId: 1 
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelId = +params['modelId'];
      this.loadComponents();
    });
    this.loadCartCount();
  }

  loadComponents() {
    setTimeout(() => {
      this.components = this.mockComponents.filter(c => c.modelId === this.modelId);
      this.filteredComponents = this.components;
      this.modelName = this.getModelName(this.modelId);
      this.loading = false;
    }, 500);
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
      1: 5, 2: 5, 3: 5, // iPhone models → Apple (brandId: 5)
      4: 1, 5: 1,       // Galaxy models → Samsung (brandId: 1)
      6: 2,             // Pixel → Google (brandId: 2)
      7: 3,             // OnePlus → OnePlus (brandId: 3)
      8: 4              // Xiaomi → Xiaomi (brandId: 4)
    };
    return modelToBrand[modelId] || 1;
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
    // Add to localStorage cart (mock implementation)
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
    
    // Dispatch cart update event
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
