import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadBrands();
    });
  }

  loadBrands() {
    setTimeout(() => {
      if (this.category === 'APPLE') {
        this.brands = this.mockBrands.filter(b => b.category === 'APPLE');
        if (this.brands.length > 0) {
          this.selectBrand(this.brands[0].id);
        }
      } else {
        this.brands = this.mockBrands.filter(b => b.category === 'ANDROID');
      }
      this.loading = false;
    }, 500);
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
