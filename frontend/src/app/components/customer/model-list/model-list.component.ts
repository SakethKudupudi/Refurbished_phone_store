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
  loading: boolean = true;
  sortOrder: string = 'newest'; // Default sort order

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.brandId = +params['brandId'];
      this.loadBrandName();
      this.loadModels();
    });
  }

  loadBrandName() {
    this.brandService.getBrandById(this.brandId).subscribe({
      next: (brand) => {
        this.brandName = brand.name;
      },
      error: (err: any) => {
        console.error('Error loading brand:', err);
        this.brandName = this.getBrandName(this.brandId);
      }
    });
  }

  loadModels() {
    this.loading = true;
    this.modelService.getModelsByBrand(this.brandId).subscribe({
      next: (data: ModelData[]) => {
        this.models = data.map(m => this.mapToModel(m));
        this.sortModels();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading models:', err);
        this.loading = false;
        this.models = [];
      }
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

  mapToModel(model: ModelData): Model {
    return {
      id: model.id,
      name: model.name,
      brandId: model.brand.id,
      year: model.releaseYear?.toString() || 'Unknown',
      storage: '128GB', // Default since not in backend model
      color: 'Standard', // Default since not in backend model
      image: this.getModelImage(model.name, model.imageUrl),
      partsAvailable: 0 // Can be calculated from components if needed
    };
  }

  getModelImage(modelName: string, imageUrl?: string): string {
    if (imageUrl) return imageUrl;

    // Map model names to local images
    const imageMap: { [key: string]: string } = {
      'iPhone 15 Pro Max': '/application_images/960px-IPhone_15_Pro_Max.png',
      'iPhone 15 Pro': '/application_images/967px-IPhone_15_Pro.png',
      'iPhone 15': '/application_images/914px-IPhone_15.png',
      'iPhone 14 Pro Max': '/application_images/954px-IPhone_14_Pro_Max.png',
      'iPhone 14 Pro': '/application_images/968px-IPhone_14_Pro.png',
      'iPhone 14': '/application_images/897px-IPhone_14.png',
      'iPhone 16 Pro Max': '/application_images/954px-IPhone_16_Pro_Max.png',
      'iPhone 16 Pro': '/application_images/966px-IPhone_16_Pro.png',
      'iPhone 16': '/application_images/975px-IPhone_16.png',
      'iPhone 17 Pro Max': '/application_images/926px-IPhone_17_Pro_Max_Silver.webp.png',
      'iPhone 17 Pro': '/application_images/960px-IPhone_17_Pro_Cosmic_Orange.webp.png',
      'iPhone 17': '/application_images/682px-IPhone_17_Lavender.webp.png'
    };

    // Check if exact match exists
    if (imageMap[modelName]) return imageMap[modelName];

    // Generate default images based on brand
    const brandImages: { [key: number]: string } = {
      1: '/application_images/apple_main.jpg', // Apple
      2: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80', // Samsung
      3: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', // Google
      4: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', // OnePlus
      5: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'  // Xiaomi
    };

    return brandImages[this.brandId] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80';
  }

  getBrandName(id: number): string {
    const brands: any = { 1: 'Apple', 2: 'Samsung', 3: 'Google', 4: 'OnePlus', 5: 'Xiaomi' };
    return brands[id] || 'Unknown';
  }

  goBack() {
    // For Apple (brandId 1), go back to shop since brands/APPLE auto-redirects to models
    if (this.brandId === 1) {
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
