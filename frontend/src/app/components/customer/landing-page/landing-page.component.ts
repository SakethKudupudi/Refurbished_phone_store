import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  aiSearchQuery: string = '';
  
  saleItems = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max OLED Display',
      description: 'Super Retina XDR, HDR, True Tone',
      category: 'Display',
      originalPrice: 299.99,
      salePrice: 209.99,
      discount: 30,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1592286927505-4595538b1916?w=400&h=400&fit=crop',
      features: ['Original', 'Warranty', 'Fast Ship'],
      timeLeft: '2 days'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra Battery',
      description: '5000mAh High Capacity Li-ion',
      category: 'Battery',
      originalPrice: 79.99,
      salePrice: 59.99,
      discount: 25,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
      features: ['Certified', '1 Year', 'Quality'],
      timeLeft: '3 days'
    },
    {
      id: 3,
      name: 'OnePlus 12 Camera Module',
      description: 'Hasselblad 50MP Triple Camera',
      category: 'Camera',
      originalPrice: 189.99,
      salePrice: 132.99,
      discount: 30,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1606041011872-596597976b25?w=400&h=400&fit=crop',
      features: ['Genuine', 'Pro Grade', 'Tested'],
      timeLeft: '1 day'
    },
    {
      id: 4,
      name: 'Pixel 8 Pro Charging Port',
      description: 'USB-C 3.2 with Fast Charging',
      category: 'Port',
      originalPrice: 49.99,
      salePrice: 34.99,
      discount: 30,
      stock: 22,
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
      features: ['OEM', 'Durable', '2 Year'],
      timeLeft: '4 days'
    },
    {
      id: 5,
      name: 'iPhone 14 Pro Rear Glass',
      description: 'Ceramic Shield Back Panel',
      category: 'Body',
      originalPrice: 129.99,
      salePrice: 90.99,
      discount: 30,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
      features: ['Authentic', 'Perfect Fit', 'Protected'],
      timeLeft: '2 days'
    },
    {
      id: 6,
      name: 'Xiaomi 14 Fingerprint Scanner',
      description: 'In-Display Ultrasonic Sensor',
      category: 'Sensor',
      originalPrice: 69.99,
      salePrice: 48.99,
      discount: 30,
      stock: 18,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
      features: ['Fast', 'Secure', 'Reliable'],
      timeLeft: '3 days'
    }
  ];

  constructor(public router: Router) {}

  navigateToCategory(category: string) {
    this.router.navigate(['/brands', category]);
  }

  navigateToAndroid() {
    this.router.navigate(['/brands', 'ANDROID']);
  }

  handleAISearch() {
    if (!this.aiSearchQuery.trim()) return;
    
    const query = this.aiSearchQuery.toLowerCase();
    let brandId = 1;
    let modelId = 1;
    
    if (query.includes('iphone') || query.includes('apple') || query.includes('ipad')) {
      brandId = 5;
      if (query.includes('15 pro max')) modelId = 1;
      else if (query.includes('15 pro')) modelId = 2;
      else if (query.includes('14')) modelId = 3;
      else modelId = 1;
    } else if (query.includes('samsung') || query.includes('galaxy')) {
      brandId = 1;
      if (query.includes('s24 ultra')) modelId = 4;
      else if (query.includes('s23')) modelId = 5;
      else modelId = 4;
    } else if (query.includes('pixel') || query.includes('google')) {
      brandId = 2;
      modelId = 6;
    } else if (query.includes('oneplus')) {
      brandId = 3;
      modelId = 7;
    } else if (query.includes('xiaomi')) {
      brandId = 4;
      modelId = 8;
    }
    
    this.router.navigate(['/components', modelId]);
    console.log(`AI Search: Navigating to model ${modelId} based on query: "${this.aiSearchQuery}"`);
  }

  setAIQuery(query: string) {
    this.aiSearchQuery = query;
    this.handleAISearch();
  }

  quickViewItem(item: any) {
    console.log('Quick view for:', item.name);
    alert(`Quick View: ${item.name}\n\nPrice: $${item.salePrice}\nStock: ${item.stock} units\n\n${item.description}`);
  }

  addToCartFromSale(item: any) {
    const cartStr = localStorage.getItem('cart');
    let cart = cartStr ? JSON.parse(cartStr) : [];
    
    const cartItem = {
      id: item.id,
      name: item.name,
      type: item.category,
      price: item.salePrice,
      quantity: 1,
      image: item.image,
      vendor: 'MobileParts Store',
      description: item.description
    };
    
    const existingIndex = cart.findIndex((i: any) => i.id === item.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    this.showToast(`Added ${item.name} to cart! 🎉`);
  }

  showToast(message: string) {
    const toast = document.createElement('div');
    toast.className = 'sale-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}
