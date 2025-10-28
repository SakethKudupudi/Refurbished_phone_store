import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Component {
  id: number;
  name: string;
  price: number;
  description: string;
  componentType: string;
  quantityAvailable: number;
  imageUrl?: string;
  manufacturer?: string;
  warrantyMonths?: number;
  model: {
    id: number;
    name: string;
    brand: {
      id: number;
      name: string;
    };
  };
  vendor: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  approvalStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private apiUrl = `${environment.apiUrl}/api/components`;

  constructor(private http: HttpClient) { }

  /**
   * Get all components
   */
  getAllComponents(): Observable<Component[]> {
    return this.http.get<Component[]>(this.apiUrl);
  }

  /**
   * Get component by ID
   */
  getComponentById(id: number): Observable<Component> {
    return this.http.get<Component>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get components by model
   */
  getComponentsByModel(modelId: number): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.apiUrl}/model/${modelId}`);
  }

  /**
   * Get components by type
   */
  getComponentsByType(type: string): Observable<Component[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Component[]>(`${this.apiUrl}/type`, { params });
  }

  /**
   * Search components
   */
  searchComponents(searchTerm: string): Observable<Component[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Component[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Create new component (vendor only)
   */
  createComponent(component: Partial<Component>): Observable<Component> {
    return this.http.post<Component>(this.apiUrl, component);
  }

  /**
   * Update component
   */
  updateComponent(id: number, component: Partial<Component>): Observable<Component> {
    return this.http.put<Component>(`${this.apiUrl}/${id}`, component);
  }

  /**
   * Delete component
   */
  deleteComponent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Approve component (admin only)
   */
  approveComponent(id: number): Observable<Component> {
    return this.http.post<Component>(`${this.apiUrl}/${id}/approve`, {});
  }

  /**
   * Reject component (admin only)
   */
  rejectComponent(id: number, reason: string): Observable<Component> {
    return this.http.post<Component>(`${this.apiUrl}/${id}/reject`, { reason });
  }
}
