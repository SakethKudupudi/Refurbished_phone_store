import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

interface Model {
  id: number;
  name: string;
  brandId: number;
  year: string;
  storage: string;
  color: string;
  image: string;
  partsAvailable?: number;
}

@Component({
  selector: 'app-model-list',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './model-list.component.html',
  styleUrl: './model-list.component.scss'
})
export class ModelListComponent implements OnInit {
  models: Model[] = [];
  brandId: number = 0;
  brandName: string = '';
  loading: boolean = true;

  // Mock data with real device images
  mockModels: Model[] = [
    { 
      id: 1, 
      name: 'iPhone 15 Pro Max', 
      brandId: 5, 
      year: '2023',
      storage: '256GB',
      color: 'Titanium',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
      partsAvailable: 45 
    },
    { 
      id: 2, 
      name: 'iPhone 15 Pro', 
      brandId: 5, 
      year: '2023',
      storage: '128GB',
      color: 'Blue',
      image: 'https://images.unsplash.com/photo-1696446702052-1faf68c06ab7?w=600&q=80',
      partsAvailable: 42 
    },
    { 
      id: 3, 
      name: 'iPhone 14 Pro Max', 
      brandId: 5, 
      year: '2022',
      storage: '512GB',
      color: 'Deep Purple',
      image: 'https://images.unsplash.com/photo-1663499482523-1c0d8c2f6c2f?w=600&q=80',
      partsAvailable: 38 
    },
    { 
      id: 4, 
      name: 'Galaxy S24 Ultra', 
      brandId: 1, 
      year: '2024',
      storage: '256GB',
      color: 'Titanium Gray',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
      partsAvailable: 35 
    },
    { 
      id: 5, 
      name: 'Galaxy S23 Ultra', 
      brandId: 1, 
      year: '2023',
      storage: '512GB',
      color: 'Phantom Black',
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80',
      partsAvailable: 32 
    },
    { 
      id: 6, 
      name: 'Pixel 8 Pro', 
      brandId: 2, 
      year: '2023',
      storage: '128GB',
      color: 'Obsidian',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
      partsAvailable: 28 
    },
    { 
      id: 7, 
      name: 'OnePlus 12', 
      brandId: 3, 
      year: '2024',
      storage: '256GB',
      color: 'Flowy Emerald',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      partsAvailable: 25 
    },
    { 
      id: 8, 
      name: 'Xiaomi 14 Ultra', 
      brandId: 4, 
      year: '2024',
      storage: '512GB',
      color: 'Titanium',
      image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
      partsAvailable: 22 
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.brandId = +params['brandId'];
      this.loadModels();
    });
  }

  loadModels() {
    setTimeout(() => {
      this.models = this.mockModels.filter(m => m.brandId === this.brandId);
      this.brandName = this.getBrandName(this.brandId);
      this.loading = false;
    }, 500);
  }

  getBrandName(id: number): string {
    const brands: any = { 1: 'Samsung', 2: 'Google', 3: 'OnePlus', 4: 'Xiaomi', 5: 'Apple' };
    return brands[id] || 'Unknown';
  }

  goBack() {
    this.router.navigate(['/brands', this.brandId === 5 ? 'APPLE' : 'ANDROID']);
  }

  selectModel(modelId: number) {
    this.router.navigate(['/components', modelId]);
  }
}
