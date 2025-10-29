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
  brands: Array<{ id: number; name: string; category: string; description: string; logo: string }> = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'] || 'ANDROID';
      this.loadBrands();
    });
  }

  loadBrands() {
    this.loading = true;
    const categoryEnum = (this.category === 'APPLE' ? 'APPLE' : 'ANDROID');

    this.brandService.getBrandsByCategoryRest(categoryEnum as 'APPLE' | 'ANDROID').subscribe({
      next: (data: Brand[]) => {
        this.brands = (data || []).map(b => ({
          id: b.id,
          name: b.name,
          category: b.category as string,
          description: b.description || `${b.name} products`,
          logo: b.logoUrl || this.getDefaultLogo(b.name)
        }));

        this.loading = false;

        // If APPLE and only one brand returned, auto-navigate to its models page
        if (categoryEnum === 'APPLE' && this.brands.length === 1) {
          this.selectBrand(this.brands[0].id);
        }
      },
      error: (err: any) => {
        console.error('Error loading brands:', err);
        this.loading = false;
        this.brands = [];
      }
    });
  }

  getDefaultLogo(brandName: string): string {
    const logoMap: { [key: string]: string } = {
      'Apple': '/application_images/apple_main.jpg',
      'Samsung': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
      'Google': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
      'OnePlus': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'Xiaomi': 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80'
    };

    return logoMap[brandName] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80';
  }

  selectBrand(brandId: number) {
    this.router.navigate(['/models', brandId]);
  }

  goBack() {
    this.router.navigate(['/shop']);
  }
}
