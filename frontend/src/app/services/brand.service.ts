import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from './graphql.service';

export interface Brand {
  id: number;
  name: string;
  description?: string;
  category: 'APPLE' | 'ANDROID';
  logoUrl?: string;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private graphqlService: GraphqlService) { }

  /**
   * Get all brands
   */
  getAllBrands(): Observable<Brand[]> {
    return this.graphqlService.getAllBrands();
  }

  /**
   * Get brand by ID
   */
  getBrandById(id: number): Observable<Brand> {
    return this.graphqlService.getBrandById(id);
  }

  /**
   * Get brands by category
   */
  getBrandsByCategory(category: 'APPLE' | 'ANDROID'): Observable<Brand[]> {
    return this.graphqlService.getBrandsByCategory(category);
  }

  /**
   * Create new brand (admin only)
   */
  createBrand(brand: Partial<Brand>): Observable<Brand> {
    const mutation = `
      mutation CreateBrand($input: CreateBrandInput!) {
        createBrand(input: $input) {
          id
          name
          description
          category
          logoUrl
          isActive
        }
      }
    `;
    return this.graphqlService.mutate(mutation, {
      input: {
        name: brand.name,
        description: brand.description,
        category: brand.category,
        logoUrl: brand.logoUrl
      }
    });
  }

  /**
   * Update brand (admin only)
   */
  updateBrand(id: number, brand: Partial<Brand>): Observable<Brand> {
    const mutation = `
      mutation UpdateBrand($id: ID!, $input: CreateBrandInput!) {
        updateBrand(id: $id, input: $input) {
          id
          name
          description
          category
          logoUrl
          isActive
        }
      }
    `;
    return this.graphqlService.mutate(mutation, {
      id: id.toString(),
      input: {
        name: brand.name,
        description: brand.description,
        category: brand.category,
        logoUrl: brand.logoUrl
      }
    });
  }

  /**
   * Delete brand (admin only)
   */
  deleteBrand(id: number): Observable<void> {
    const mutation = `
      mutation DeleteBrand($id: ID!) {
        deleteBrand(id: $id)
      }
    `;
    return this.graphqlService.mutate(mutation, { id: id.toString() });
  }
}
