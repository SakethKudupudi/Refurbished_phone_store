import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { ModelService, Model as ModelData } from '../../../services/model.service';
import { BrandService } from '../../../services/brand.service';

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
  imports: [CommonModule, FormsModule, RouterModule, CustomerHeaderComponent],
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  models: Model[] = [];
  brandId: number = 0;
  brandName: string = '';
  loading: boolean = false; // Start with false so models show immediately
  sortOrder: string = 'newest'; // Default sort order

  // Mock data with real device images
  mockModels: Model[] = [
    { 
      id: 1, 
      name: 'iPhone 15 Pro Max', 
      brandId: 5, 
      year: '2023',
      storage: '256GB',
      color: 'Titanium',
      image: '/application_images/960px-IPhone_15_Pro_Max.png',
      partsAvailable: 45 
    },
    { 
      id: 2, 
      name: 'iPhone 15 Pro', 
      brandId: 5, 
      year: '2023',
      storage: '128GB',
      color: 'Blue',
      image: '/application_images/967px-IPhone_15_Pro.png',
      partsAvailable: 42 
    },
    { 
      id: 36, 
      name: 'iPhone 15', 
      brandId: 5, 
      year: '2023',
      storage: '128GB',
      color: 'Pink',
      image: '/application_images/914px-IPhone_15.png',
      partsAvailable: 44 
    },
    { 
      id: 3, 
      name: 'iPhone 14 Pro Max', 
      brandId: 5, 
      year: '2022',
      storage: '512GB',
      color: 'Deep Purple',
      image: '/application_images/954px-IPhone_14_Pro_Max.png',
      partsAvailable: 38 
    },
    { 
      id: 34, 
      name: 'iPhone 14 Pro', 
      brandId: 5, 
      year: '2022',
      storage: '256GB',
      color: 'Space Black',
      image: '/application_images/968px-IPhone_14_Pro.png',
      partsAvailable: 36 
    },
    { 
      id: 35, 
      name: 'iPhone 14', 
      brandId: 5, 
      year: '2022',
      storage: '128GB',
      color: 'Midnight',
      image: '/application_images/897px-IPhone_14.png',
      partsAvailable: 40 
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
    // iPhone 16 & 17 mock entries
    {
      id: 28,
      name: 'iPhone 16 Pro Max',
      brandId: 5,
      year: '2024',
      storage: '256GB',
      color: 'Titanium',
      image: '/application_images/954px-IPhone_16_Pro_Max.png',
      partsAvailable: 40
    },
    {
      id: 29,
      name: 'iPhone 16 Pro',
      brandId: 5,
      year: '2024',
      storage: '128GB',
      color: 'Silver',
      image: '/application_images/966px-IPhone_16_Pro.png',
      partsAvailable: 45
    },
    {
      id: 30,
      name: 'iPhone 16',
      brandId: 5,
      year: '2024',
      storage: '128GB',
      color: 'Black',
      image: '/application_images/975px-IPhone_16.png',
      partsAvailable: 50
    },
    {
      id: 31,
      name: 'iPhone 17 Pro Max',
      brandId: 5,
      year: '2025',
      storage: '512GB',
      color: 'Silver',
      image: '/application_images/926px-IPhone_17_Pro_Max_Silver.webp.png',
      partsAvailable: 38
    },
    {
      id: 32,
      name: 'iPhone 17 Pro',
      brandId: 5,
      year: '2025',
      storage: '256GB',
      color: 'Cosmic Orange',
      image: '/application_images/960px-IPhone_17_Pro_Cosmic_Orange.webp.png',
      partsAvailable: 42
    },
    {
      id: 33,
      name: 'iPhone 17',
      brandId: 5,
      year: '2025',
      storage: '128GB',
      color: 'Lavender',
      image: '/application_images/682px-IPhone_17_Lavender.webp.png',
      partsAvailable: 48
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.brandId = +params['brandId'];
      
      // Set models IMMEDIATELY from mock data
      this.models = this.mockModels.filter(m => m.brandId === this.brandId);
      this.brandName = this.getBrandName(this.brandId);
      
      // Sort models by default (newest first)
      this.sortModels();
      
      // Then try backend (but don't wait for it)
      this.loadModels();
      this.loadBrandName();
    });
  }

  sortModels() {
    this.models.sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      
      if (this.sortOrder === 'newest') {
        return yearB - yearA; // Descending (newest first)
      } else {
        return yearA - yearB; // Ascending (oldest first)
      }
    });
  }

  loadBrandName() {
    this.brandService.getBrandById(this.brandId).subscribe({
      next: (brand) => {
        this.brandName = brand.name;
      },
      error: (err: any) => {
        // Keep the default brand name from getBrandName()
      }
    });
  }

  loadModels() {
    // Try to fetch from API in background (will update if backend becomes available)
    this.modelService.getModelsByBrand(this.brandId).subscribe({
      next: (data: ModelData[]) => {
        // Only update if we got actual data from the API
        if (data && data.length > 0) {
          this.models = data.map(m => this.mapToModel(m));
        }
      },
      error: (err: any) => {
        // Ignore errors, we already have mock data
      }
    });
  }

  mapToModel(model: ModelData): Model {
    // Generate default phone images based on brand
    const brandImages: { [key: number]: string } = {
      1: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80', // Apple
      2: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80', // Samsung
      3: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', // Google
      4: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'  // OnePlus
    };

    return {
      id: model.id,
      name: model.name,
      brandId: model.brand.id,
      year: model.releaseYear?.toString() || 'Unknown',
      storage: '128GB', // Default since not in backend model
      color: 'Standard', // Default since not in backend model
      image: brandImages[model.brand.id] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      partsAvailable: 0 // Can be calculated from components if needed
    };
  }

  getBrandName(id: number): string {
    const brands: any = { 1: 'Samsung', 2: 'Google', 3: 'OnePlus', 4: 'Xiaomi', 5: 'Apple' };
    return brands[id] || 'Unknown';
  }

  goBack() {
    // For Apple (brandId 5), go back to shop since brands/APPLE auto-redirects to models
    if (this.brandId === 5) {
      this.router.navigate(['/shop']);
    } else {
      // For Android brands, go back to brands/ANDROID to see brand selection
      this.router.navigate(['/brands', 'ANDROID']);
    }
  }

  selectModel(modelId: number) {
    this.router.navigate(['/components', modelId]);
  }
}
