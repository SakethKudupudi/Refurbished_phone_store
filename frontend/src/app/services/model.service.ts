import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Model {
  id: number;
  name: string;
  modelNumber: string;
  description?: string;
  releaseYear: number;
  imageUrl?: string;
  brand: {
    id: number;
    name: string;
    category: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private apiUrl = `${environment.apiUrl}/api/models`;

  constructor(private http: HttpClient) { }

  /**
   * Get all models
   */
  getAllModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.apiUrl);
  }

  /**
   * Get model by ID
   */
  getModelById(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get models by brand
   */
  getModelsByBrand(brandId: number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiUrl}/brand/${brandId}`);
  }

  /**
   * Search models by name
   */
  searchModels(searchTerm: string): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiUrl}/search`, {
      params: { q: searchTerm }
    });
  }

  /**
   * Create new model (admin only)
   */
  createModel(model: Partial<Model>): Observable<Model> {
    return this.http.post<Model>(this.apiUrl, model);
  }

  /**
   * Update model (admin only)
   */
  updateModel(id: number, model: Partial<Model>): Observable<Model> {
    return this.http.put<Model>(`${this.apiUrl}/${id}`, model);
  }

  /**
   * Delete model (admin only)
   */
  deleteModel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
