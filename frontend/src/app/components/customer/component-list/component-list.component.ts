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
    // Mock components for iPhone 16 & 17 series
    { id: 201, name: 'iPhone 16 Pro Max OLED Screen', type: 'SCREEN', category: 'Display', description: '6.7\" ProMotion Super Retina', price: 359.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80', features: ['Original Quality','1 Year Warranty'], vendorName: 'AppleParts', modelId: 28 },
    { id: 202, name: 'iPhone 16 Pro Max Battery', type: 'BATTERY', category: 'Battery', description: 'High capacity 4500mAh battery', price: 109.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity','Fast Charging'], vendorName: 'PowerCell Inc', modelId: 28 },
    { id: 203, name: 'iPhone 16 Pro Max Camera Module', type: 'CAMERA', category: 'Camera', description: '50MP triple camera', price: 259.99, stock: 15, quantityInStock: 15, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['50MP','OIS'], vendorName: 'CamTech', modelId: 28 },
    { id: 204, name: 'iPhone 16 Pro Max Back Cover', type: 'OTHER', category: 'Other', description: 'Titanium frame & glass back', price: 139.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Premium Material'], vendorName: 'FrameWorks', modelId: 28 },

    { id: 205, name: 'iPhone 16 Pro OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1\" ProMotion Super Retina', price: 339.99, stock: 22, quantityInStock: 22, image: 'https://images.unsplash.com/photo-1523475496153-3d6ccf2f0316?w=600&q=80', features: ['Original Quality'], vendorName: 'AppleParts', modelId: 29 },
    { id: 206, name: 'iPhone 16 Pro Battery', type: 'BATTERY', category: 'Battery', description: '3800mAh battery', price: 99.99, stock: 28, quantityInStock: 28, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['Fast Charging'], vendorName: 'PowerCell Inc', modelId: 29 },
    { id: 207, name: 'iPhone 16 Pro Camera Module', type: 'CAMERA', category: 'Camera', description: '50MP triple camera', price: 239.99, stock: 18, quantityInStock: 18, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['LiDAR'], vendorName: 'CamTech', modelId: 29 },
    { id: 208, name: 'iPhone 16 Pro Charging Port', type: 'CHARGING_PORT', category: 'Charging Port', description: 'USB-C port assembly', price: 44.99, stock: 50, quantityInStock: 50, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', features: ['Durable'], vendorName: 'ConnectParts', modelId: 29 },

    { id: 209, name: 'iPhone 16 OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1\" Super Retina display', price: 319.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', features: ['Original Quality'], vendorName: 'AppleParts', modelId: 30 },
    { id: 210, name: 'iPhone 16 Battery', type: 'BATTERY', category: 'Battery', description: '3500mAh battery', price: 89.99, stock: 40, quantityInStock: 40, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['Certified'], vendorName: 'PowerCell Inc', modelId: 30 },
    { id: 211, name: 'iPhone 16 Camera', type: 'CAMERA', category: 'Camera', description: '48MP dual/triple camera', price: 199.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['OIS'], vendorName: 'CamTech', modelId: 30 },
    { id: 212, name: 'iPhone 16 Rear Glass', type: 'OTHER', category: 'Other', description: 'Rear glass replacement', price: 119.99, stock: 35, quantityInStock: 35, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Genuine Material'], vendorName: 'GlassWorks', modelId: 30 },

    { id: 213, name: 'iPhone 17 Pro Max OLED Screen', type: 'SCREEN', category: 'Display', description: '6.7\" next-gen ProMotion XDR', price: 379.99, stock: 18, quantityInStock: 18, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', features: ['Next-gen Display'], vendorName: 'AppleParts', modelId: 31 },
    { id: 214, name: 'iPhone 17 Pro Max Battery', type: 'BATTERY', category: 'Battery', description: '4600mAh high-density battery', price: 119.99, stock: 22, quantityInStock: 22, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Density'], vendorName: 'PowerCell Inc', modelId: 31 },
    { id: 215, name: 'iPhone 17 Pro Max Camera Module', type: 'CAMERA', category: 'Camera', description: 'Quad camera 50MP + telephoto', price: 279.99, stock: 12, quantityInStock: 12, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['Quad Camera'], vendorName: 'CamTech', modelId: 31 },
    { id: 216, name: 'iPhone 17 Pro Max Frame', type: 'OTHER', category: 'Other', description: 'Replacement titanium frame', price: 159.99, stock: 15, quantityInStock: 15, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Durable'], vendorName: 'FrameWorks', modelId: 31 },

    { id: 217, name: 'iPhone 17 Pro OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1\" next-gen ProMotion XDR', price: 359.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80', features: ['Next-gen Display'], vendorName: 'AppleParts', modelId: 32 },
    { id: 218, name: 'iPhone 17 Pro Battery', type: 'BATTERY', category: 'Battery', description: '3900mAh battery', price: 109.99, stock: 28, quantityInStock: 28, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['Certified'], vendorName: 'PowerCell Inc', modelId: 32 },
    { id: 219, name: 'iPhone 17 Pro Camera', type: 'CAMERA', category: 'Camera', description: '50MP triple camera with enhanced OIS', price: 249.99, stock: 16, quantityInStock: 16, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['Enhanced OIS'], vendorName: 'CamTech', modelId: 32 },
    { id: 220, name: 'iPhone 17 Pro Back Glass', type: 'OTHER', category: 'Other', description: 'Glass & camera lens assembly', price: 129.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Genuine'], vendorName: 'GlassWorks', modelId: 32 },

    { id: 221, name: 'iPhone 17 OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1\" high-brightness Super Retina', price: 329.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1496180727794-817822f65950?w=600&q=80', features: ['High Brightness'], vendorName: 'AppleParts', modelId: 33 },
    { id: 222, name: 'iPhone 17 Battery', type: 'BATTERY', category: 'Battery', description: '3600mAh battery', price: 99.99, stock: 35, quantityInStock: 35, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['Certified'], vendorName: 'PowerCell Inc', modelId: 33 },
    { id: 223, name: 'iPhone 17 Camera', type: 'CAMERA', category: 'Camera', description: 'Dual 48MP camera main', price: 219.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['48MP'], vendorName: 'CamTech', modelId: 33 },
    { id: 224, name: 'iPhone 17 Rear Cover', type: 'OTHER', category: 'Other', description: 'Rear cover replacement', price: 119.99, stock: 40, quantityInStock: 40, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Replacement'], vendorName: 'GlassWorks', modelId: 33 },

    // iPhone 15 Pro (modelId: 2)
    { id: 301, name: 'iPhone 15 Pro OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1" Super Retina XDR', price: 329.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1696446702052-1faf68c06ab7?w=600&q=80', features: ['Original Quality','ProMotion'], vendorName: 'AppleParts', modelId: 2 },
    { id: 302, name: 'iPhone 15 Pro Battery', type: 'BATTERY', category: 'Battery', description: '3650mAh battery', price: 99.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity','Certified'], vendorName: 'PowerCell Inc', modelId: 2 },
    { id: 303, name: 'iPhone 15 Pro Camera', type: 'CAMERA', category: 'Camera', description: '48MP triple camera system', price: 229.99, stock: 18, quantityInStock: 18, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['48MP','OIS','LiDAR'], vendorName: 'CamTech', modelId: 2 },
    { id: 304, name: 'iPhone 15 Pro USB-C Port', type: 'CHARGING_PORT', category: 'Charging Port', description: 'USB-C charging port', price: 49.99, stock: 40, quantityInStock: 40, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', features: ['Fast Charging','USB-C'], vendorName: 'ConnectParts', modelId: 2 },

    // iPhone 15 (modelId: 36)
    { id: 317, name: 'iPhone 15 OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1" Super Retina XDR', price: 299.99, stock: 28, quantityInStock: 28, image: 'https://images.unsplash.com/photo-1696446702052-1faf68c06ab7?w=600&q=80', features: ['Original Quality','True Tone'], vendorName: 'AppleParts', modelId: 36 },
    { id: 318, name: 'iPhone 15 Battery', type: 'BATTERY', category: 'Battery', description: '3349mAh battery', price: 94.99, stock: 32, quantityInStock: 32, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity','Certified'], vendorName: 'PowerCell Inc', modelId: 36 },
    { id: 319, name: 'iPhone 15 Camera', type: 'CAMERA', category: 'Camera', description: '48MP dual camera system', price: 199.99, stock: 22, quantityInStock: 22, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['48MP','Night Mode','4K Video'], vendorName: 'CamTech', modelId: 36 },
    { id: 320, name: 'iPhone 15 USB-C Port', type: 'CHARGING_PORT', category: 'Charging Port', description: 'USB-C charging port', price: 44.99, stock: 38, quantityInStock: 38, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', features: ['Fast Charging','USB-C'], vendorName: 'ConnectParts', modelId: 36 },

    // iPhone 14 Pro Max (modelId: 3)
    { id: 305, name: 'iPhone 14 Pro Max OLED Screen', type: 'SCREEN', category: 'Display', description: '6.7" Super Retina XDR', price: 319.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1663499482523-1c0d8c2f6c2f?w=600&q=80', features: ['Original Quality','Always-On'], vendorName: 'AppleParts', modelId: 3 },
    { id: 306, name: 'iPhone 14 Pro Max Battery', type: 'BATTERY', category: 'Battery', description: '4323mAh battery', price: 109.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity'], vendorName: 'PowerCell Inc', modelId: 3 },
    { id: 307, name: 'iPhone 14 Pro Max Camera', type: 'CAMERA', category: 'Camera', description: '48MP main camera', price: 219.99, stock: 15, quantityInStock: 15, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['48MP','OIS'], vendorName: 'CamTech', modelId: 3 },
    { id: 308, name: 'iPhone 14 Pro Max Back Glass', type: 'OTHER', category: 'Other', description: 'Ceramic shield back glass', price: 129.99, stock: 22, quantityInStock: 22, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Ceramic Shield'], vendorName: 'GlassWorks', modelId: 3 },

    // iPhone 14 Pro (modelId: 34)
    { id: 309, name: 'iPhone 14 Pro OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1" Super Retina XDR', price: 299.99, stock: 22, quantityInStock: 22, image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=600&q=80', features: ['Original Quality','Always-On','ProMotion'], vendorName: 'AppleParts', modelId: 34 },
    { id: 310, name: 'iPhone 14 Pro Battery', type: 'BATTERY', category: 'Battery', description: '3200mAh battery', price: 99.99, stock: 28, quantityInStock: 28, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity','Certified'], vendorName: 'PowerCell Inc', modelId: 34 },
    { id: 311, name: 'iPhone 14 Pro Camera Module', type: 'CAMERA', category: 'Camera', description: '48MP triple camera system', price: 209.99, stock: 18, quantityInStock: 18, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['48MP','OIS','Night Mode'], vendorName: 'CamTech', modelId: 34 },
    { id: 312, name: 'iPhone 14 Pro Lightning Port', type: 'CHARGING_PORT', category: 'Charging Port', description: 'Lightning charging port', price: 44.99, stock: 35, quantityInStock: 35, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', features: ['Fast Charging','Lightning'], vendorName: 'ConnectParts', modelId: 34 },

    // iPhone 14 (modelId: 35)
    { id: 313, name: 'iPhone 14 OLED Screen', type: 'SCREEN', category: 'Display', description: '6.1" Super Retina XDR', price: 279.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1678911820864-e2c678eca919?w=600&q=80', features: ['Original Quality','True Tone'], vendorName: 'AppleParts', modelId: 35 },
    { id: 314, name: 'iPhone 14 Battery', type: 'BATTERY', category: 'Battery', description: '3279mAh battery', price: 89.99, stock: 32, quantityInStock: 32, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity','Fast Charging'], vendorName: 'PowerCell Inc', modelId: 35 },
    { id: 315, name: 'iPhone 14 Camera', type: 'CAMERA', category: 'Camera', description: '12MP dual camera system', price: 179.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['12MP','Night Mode','4K Video'], vendorName: 'CamTech', modelId: 35 },
    { id: 316, name: 'iPhone 14 Back Glass', type: 'OTHER', category: 'Other', description: 'Rear glass panel replacement', price: 119.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Ceramic Shield','Durable'], vendorName: 'GlassWorks', modelId: 35 },

    // Galaxy S24 Ultra (modelId: 4)
    { id: 401, name: 'Galaxy S24 Ultra AMOLED Screen', type: 'SCREEN', category: 'Display', description: '6.8" Dynamic AMOLED 2X', price: 349.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80', features: ['QHD+','120Hz'], vendorName: 'SamsungParts', modelId: 4 },
    { id: 402, name: 'Galaxy S24 Ultra Battery', type: 'BATTERY', category: 'Battery', description: '5000mAh battery', price: 89.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['Long Life','45W Fast Charge'], vendorName: 'PowerCell Inc', modelId: 4 },
    { id: 403, name: 'Galaxy S24 Ultra Camera Module', type: 'CAMERA', category: 'Camera', description: '200MP quad camera system', price: 289.99, stock: 12, quantityInStock: 12, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['200MP','10x Zoom','OIS'], vendorName: 'CamTech', modelId: 4 },
    { id: 404, name: 'Galaxy S24 Ultra S-Pen', type: 'OTHER', category: 'Other', description: 'Replacement S-Pen stylus', price: 59.99, stock: 50, quantityInStock: 50, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Bluetooth','4096 Pressure'], vendorName: 'SamsungParts', modelId: 4 },

    // Galaxy S23 Ultra (modelId: 5)
    { id: 405, name: 'Galaxy S23 Ultra AMOLED Screen', type: 'SCREEN', category: 'Display', description: '6.8" Dynamic AMOLED 2X', price: 329.99, stock: 18, quantityInStock: 18, image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80', features: ['QHD+','120Hz'], vendorName: 'SamsungParts', modelId: 5 },
    { id: 406, name: 'Galaxy S23 Ultra Battery', type: 'BATTERY', category: 'Battery', description: '5000mAh battery', price: 84.99, stock: 28, quantityInStock: 28, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['Long Life','Fast Charge'], vendorName: 'PowerCell Inc', modelId: 5 },
    { id: 407, name: 'Galaxy S23 Ultra Camera', type: 'CAMERA', category: 'Camera', description: '200MP camera system', price: 269.99, stock: 14, quantityInStock: 14, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['200MP','OIS'], vendorName: 'CamTech', modelId: 5 },
    { id: 408, name: 'Galaxy S23 Ultra USB-C Port', type: 'CHARGING_PORT', category: 'Charging Port', description: 'USB-C charging port', price: 44.99, stock: 35, quantityInStock: 35, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', features: ['Fast Charging','USB 3.2'], vendorName: 'ConnectParts', modelId: 5 },

    // Pixel 8 Pro (modelId: 6)
    { id: 501, name: 'Pixel 8 Pro OLED Screen', type: 'SCREEN', category: 'Display', description: '6.7" LTPO OLED display', price: 299.99, stock: 22, quantityInStock: 22, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['120Hz','Gorilla Glass'], vendorName: 'GoogleParts', modelId: 6 },
    { id: 502, name: 'Pixel 8 Pro Battery', type: 'BATTERY', category: 'Battery', description: '5050mAh battery', price: 79.99, stock: 30, quantityInStock: 30, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['High Capacity','Fast Charge'], vendorName: 'PowerCell Inc', modelId: 6 },
    { id: 503, name: 'Pixel 8 Pro Camera Bar', type: 'CAMERA', category: 'Camera', description: '50MP triple camera', price: 249.99, stock: 16, quantityInStock: 16, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['50MP','Night Sight'], vendorName: 'CamTech', modelId: 6 },
    { id: 504, name: 'Pixel 8 Pro Back Glass', type: 'OTHER', category: 'Other', description: 'Rear glass with camera bar', price: 119.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Original Design'], vendorName: 'GlassWorks', modelId: 6 },

    // OnePlus 12 (modelId: 7)
    { id: 601, name: 'OnePlus 12 AMOLED Screen', type: 'SCREEN', category: 'Display', description: '6.82" LTPO AMOLED', price: 279.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', features: ['120Hz','Dolby Vision'], vendorName: 'OnePlusParts', modelId: 7 },
    { id: 602, name: 'OnePlus 12 Battery', type: 'BATTERY', category: 'Battery', description: '5400mAh battery', price: 74.99, stock: 28, quantityInStock: 28, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['100W Fast Charge'], vendorName: 'PowerCell Inc', modelId: 7 },
    { id: 603, name: 'OnePlus 12 Hasselblad Camera', type: 'CAMERA', category: 'Camera', description: '50MP Hasselblad camera', price: 239.99, stock: 15, quantityInStock: 15, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['Hasselblad','OIS'], vendorName: 'CamTech', modelId: 7 },
    { id: 604, name: 'OnePlus 12 USB-C Port', type: 'CHARGING_PORT', category: 'Charging Port', description: 'USB-C 3.2 port', price: 39.99, stock: 40, quantityInStock: 40, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', features: ['100W SuperVOOC'], vendorName: 'ConnectParts', modelId: 7 },

    // Xiaomi 14 Ultra (modelId: 8)
    { id: 701, name: 'Xiaomi 14 Ultra AMOLED Screen', type: 'SCREEN', category: 'Display', description: '6.73" LTPO AMOLED', price: 289.99, stock: 18, quantityInStock: 18, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80', features: ['120Hz','Dolby Vision'], vendorName: 'XiaomiParts', modelId: 8 },
    { id: 702, name: 'Xiaomi 14 Ultra Battery', type: 'BATTERY', category: 'Battery', description: '5300mAh battery', price: 79.99, stock: 25, quantityInStock: 25, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80', features: ['90W Fast Charge'], vendorName: 'PowerCell Inc', modelId: 8 },
    { id: 703, name: 'Xiaomi 14 Ultra Leica Camera', type: 'CAMERA', category: 'Camera', description: '50MP Leica quad camera', price: 259.99, stock: 12, quantityInStock: 12, image: 'https://images.unsplash.com/photo-1606166242557-d0a62683f00c?w=600&q=80', features: ['Leica Optics','Variable Aperture'], vendorName: 'CamTech', modelId: 8 },
    { id: 704, name: 'Xiaomi 14 Ultra Photography Kit', type: 'OTHER', category: 'Other', description: 'Camera grip attachment', price: 149.99, stock: 20, quantityInStock: 20, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', features: ['Pro Photography'], vendorName: 'XiaomiParts', modelId: 8 },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentService: ComponentService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelId = +params['modelId'];
      
      // Set components IMMEDIATELY from mock data
      this.components = this.mockComponents.filter(c => c.modelId === this.modelId);
      this.filteredComponents = this.components;
      this.loading = false;
      
      // Then try to load from backend
      this.loadComponents();
      this.loadModelName();
    });
    this.loadCartCount();
  }

  loadModelName() {
    this.modelService.getModelById(this.modelId).subscribe({
      next: (model) => {
        this.modelName = `${model.brand.name} ${model.name}`;
      },
      error: (err) => {
        console.error('Error loading model:', err);
        this.modelName = 'Phone Model';
      }
    });
  }

  loadComponents() {
    // Try to fetch from API in background
    this.componentService.getComponentsByModel(this.modelId).subscribe({
      next: (data: ComponentData[]) => {
        // Only update if we got actual data from the API
        if (data && data.length > 0) {
          this.components = data.map(c => this.mapToComponentPart(c));
          this.filteredComponents = this.components;
        }
      },
      error: (err: any) => {
        // Keep mock data on error
      }
    });
  }

  mapToComponentPart(component: ComponentData): ComponentPart {
    const typeMapping: { [key: string]: string } = {
      'SCREEN': 'Display',
      'BATTERY': 'Battery',
      'CAMERA': 'Camera',
      'CHARGING_PORT': 'Charging Port',
      'OTHER': 'Other'
    };

    // Generate default image based on component type
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
      modelId: component.model.id
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
      // iPhone models → Apple (brandId: 5)
      1: 5,   // iPhone 15 Pro Max
      2: 5,   // iPhone 15 Pro
      3: 5,   // iPhone 14 Pro Max
      28: 5,  // iPhone 16 Pro Max
      29: 5,  // iPhone 16 Pro
      30: 5,  // iPhone 16
      31: 5,  // iPhone 17 Pro Max
      32: 5,  // iPhone 17 Pro
      33: 5,  // iPhone 17
      34: 5,  // iPhone 14 Pro
      35: 5,  // iPhone 14
      36: 5,  // iPhone 15
      // Android models
      4: 1,   // Galaxy S24 Ultra → Samsung
      5: 1,   // Galaxy S23 Ultra → Samsung
      6: 2,   // Pixel 8 Pro → Google
      7: 3,   // OnePlus 12 → OnePlus
      8: 4    // Xiaomi 14 Ultra → Xiaomi
    };
    return modelToBrand[modelId] || 5; // Default to Apple if not found
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
