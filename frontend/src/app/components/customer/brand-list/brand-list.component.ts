import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { BrandService, Brand } from '../../../services/brand.service';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  category: string = '';
  brands: any[] = [];
  loading: boolean = true;

  mockBrands = [
    { 
      id: 1, 
      name: 'Samsung', 
      category: 'ANDROID', 
      description: 'Galaxy series & more',
      logo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'
    },
    { 
      id: 2, 
      name: 'Google', 
      category: 'ANDROID', 
      description: 'Pixel smartphones',
      logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80'
    },
    { 
      id: 3, 
      name: 'OnePlus', 
      category: 'ANDROID', 
      description: 'Flagship killers',
      logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
    },
    { 
      id: 4, 
      name: 'Xiaomi', 
      category: 'ANDROID', 
      description: 'Mi & Redmi series',
      logo: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80'
    },
    { 
      id: 5, 
      name: 'Apple', 
      category: 'APPLE', 
      description: 'iPhone parts',
      logo: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      
      // Set brands immediately from mock data
      if (this.category === 'APPLE') {
        this.brands = this.mockBrands.filter(b => b.category === 'APPLE');
        this.loading = false;
        if (this.brands.length > 0) {
          // Auto-navigate to Apple models page (brand ID 5)
          this.selectBrand(5);
        }
      } else {
        // ANDROID category - show brands immediately
        this.brands = this.mockBrands.filter(b => b.category === 'ANDROID');
        this.loading = false;
        // Try to load from API in background
        this.loadBrands();
      }
    });
  }

  loadBrands() {
    this.brandService.getAllBrands().subscribe({
      next: (data: Brand[]) => {
        if (data && data.length > 0) {
          // Map brands to include category and images
          const mappedBrands = data.map(brand => {
            const mockBrand = this.mockBrands.find(mb => mb.name.toLowerCase() === brand.name.toLowerCase());
            return {
              id: brand.id,
              name: brand.name,
              category: brand.name === 'Apple' ? 'APPLE' : 'ANDROID',
              description: mockBrand?.description || `${brand.name} smartphones`,
              logo: mockBrand?.logo || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
            };
          });

          const androidBrands = mappedBrands.filter(b => b.category === 'ANDROID');
          if (androidBrands.length > 0) {
            this.brands = androidBrands;
          }
        }
      },
      error: (err: any) => {
        // Keep mock data on error
      }
    });
  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  selectBrand(brandId: number) {
    this.router.navigate(['/models', brandId]);
  }

  getBrandImage(brandName: string): string {
    const brand = this.mockBrands.find(b => b.name === brandName);
    return brand?.logo || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80';
  }
}
