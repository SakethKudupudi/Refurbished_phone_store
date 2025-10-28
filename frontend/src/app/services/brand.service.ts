import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Brand {
  id: number;
  name: string;
  description?: string;
  category: 'PHONE' | 'TABLET' | 'LAPTOP' | 'ACCESSORY';
  logoUrl?: string;
  website?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/api/brands`;

  constructor(private http: HttpClient) { }

  /**
   * Get all brands
   */
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  /**
   * Get brand by ID
   */
  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get brands by category
   */
  getBrandsByCategory(category: Brand['category']): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/category/${category}`);
  }

  /**
   * Create new brand (admin only)
   */
  createBrand(brand: Partial<Brand>): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  /**
   * Update brand (admin only)
   */
  updateBrand(id: number, brand: Partial<Brand>): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand);
  }

  /**
   * Delete brand (admin only)
   */
  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
