import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GraphqlService } from './graphql.service';
import { environment } from '../../environments/environment';

export interface Component {
  id?: number;
  name: string;
  price: number;
  description: string;
  componentType: string;
  quantityAvailable: number;
  imageUrl?: string;
  manufacturer?: string;
  warrantyMonths?: number;
  condition?: string;
  isActive?: boolean;
  model?: {
    id: number;
    name: string;
    brand?: {
      id: number;
      name: string;
    };
  };
  vendor?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  approvalStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private apiUrl = `${environment.apiUrl}/components`;

  constructor(
    private http: HttpClient,
    private graphqlService: GraphqlService
  ) { }

  // ===== REST API Methods =====
  
  /**
   * Get all components via REST API
   */
  getAllComponentsRest(): Observable<Component[]> {
    return this.http.get<Component[]>(this.apiUrl);
  }

  /**
   * Get component by ID via REST API
   */
  getComponentByIdRest(id: number): Observable<Component> {
    return this.http.get<Component>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get components by model via REST API
   */
  getComponentsByModelRest(modelId: number): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.apiUrl}/model/${modelId}`);
  }

  /**
   * Get components by vendor via REST API
   */
  getComponentsByVendorRest(vendorId: number): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.apiUrl}/vendor/${vendorId}`);
  }

  /**
   * Get pending approvals via REST API (Admin only)
   */
  getPendingApprovalsRest(): Observable<Component[]> {
    return this.http.get<Component[]>(`${this.apiUrl}/pending`);
  }

  /**
   * Create component via REST API
   */
  createComponentRest(component: Partial<Component>): Observable<Component> {
    return this.http.post<Component>(this.apiUrl, component);
  }

  /**
   * Update component via REST API
   */
  updateComponentRest(id: number, component: Partial<Component>): Observable<Component> {
    return this.http.put<Component>(`${this.apiUrl}/${id}`, component);
  }

  /**
   * Delete component via REST API
   */
  deleteComponentRest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Approve component via REST API (Admin only)
   */
  approveComponentRest(id: number): Observable<Component> {
    return this.http.post<Component>(`${this.apiUrl}/${id}/approve`, {});
  }

  /**
   * Reject component via REST API (Admin only)
   */
  rejectComponentRest(id: number, reason: string): Observable<Component> {
    return this.http.post<Component>(`${this.apiUrl}/${id}/reject`, { reason });
  }

  // ===== GraphQL Methods =====

  /**
   * Get all components
   */
  getAllComponents(): Observable<Component[]> {
    return this.graphqlService.getAllComponents();
  }

  /**
   * Get component by ID
   */
  getComponentById(id: number): Observable<Component> {
    return this.graphqlService.getComponentById(id);
  }

  /**
   * Get components by model
   */
  getComponentsByModel(modelId: number): Observable<Component[]> {
    return this.graphqlService.getComponentsByModel(modelId);
  }

  /**
   * Get components by type
   */
  getComponentsByType(type: string): Observable<Component[]> {
    const query = `
      query GetComponentsByType($type: ComponentType!) {
        componentsByType(type: $type) {
          id
          name
          description
          price
          quantityAvailable
          imageUrl
          componentType
          manufacturer
          warrantyMonths
          condition
          isActive
          approvalStatus
          model {
            id
            name
            brand {
              id
              name
            }
          }
          vendor {
            id
            firstName
            lastName
            email
          }
        }
      }
    `;
    return this.graphqlService.query(query, { type });
  }

  /**
   * Search components
   */
  searchComponents(searchTerm: string): Observable<Component[]> {
    const query = `
      query SearchComponents($searchTerm: String!) {
        searchComponents(searchTerm: $searchTerm) {
          id
          name
          description
          price
          quantityAvailable
          imageUrl
          componentType
          manufacturer
          warrantyMonths
          condition
          isActive
          approvalStatus
          model {
            id
            name
            brand {
              id
              name
            }
          }
          vendor {
            id
            firstName
            lastName
            email
          }
        }
      }
    `;
    return this.graphqlService.query(query, { searchTerm });
  }

  /**
   * Create new component (vendor only)
   */
  createComponent(component: Partial<Component>): Observable<Component> {
    const mutation = `
      mutation CreateComponent($input: CreateComponentInput!) {
        createComponent(input: $input) {
          id
          name
          description
          price
          quantityAvailable
          imageUrl
          componentType
          manufacturer
          warrantyMonths
          condition
          approvalStatus
        }
      }
    `;
    return this.graphqlService.mutate(mutation, {
      input: {
        name: component.name,
        modelId: component.model?.id?.toString(),
        componentType: component.componentType,
        description: component.description,
        price: component.price,
        quantityAvailable: component.quantityAvailable,
        manufacturer: component.manufacturer,
        warrantyMonths: component.warrantyMonths,
        condition: component.condition || 'NEW',
        imageUrl: component.imageUrl
      }
    });
  }

  /**
   * Update component
   */
  updateComponent(id: number, component: Partial<Component>): Observable<Component> {
    const mutation = `
      mutation UpdateComponent($id: ID!, $input: UpdateComponentInput!) {
        updateComponent(id: $id, input: $input) {
          id
          name
          description
          price
          quantityAvailable
          imageUrl
          componentType
          manufacturer
          warrantyMonths
          condition
          isActive
          approvalStatus
        }
      }
    `;
    return this.graphqlService.mutate(mutation, {
      id: id.toString(),
      input: {
        name: component.name,
        description: component.description,
        price: component.price,
        quantityAvailable: component.quantityAvailable,
        manufacturer: component.manufacturer,
        warrantyMonths: component.warrantyMonths,
        condition: component.condition,
        imageUrl: component.imageUrl,
        isActive: component.isActive
      }
    });
  }

  /**
   * Delete component
   */
  deleteComponent(id: number): Observable<void> {
    const mutation = `
      mutation DeleteComponent($id: ID!) {
        deleteComponent(id: $id)
      }
    `;
    return this.graphqlService.mutate(mutation, { id: id.toString() });
  }

  /**
   * Approve component (admin only)
   */
  approveComponent(id: number): Observable<Component> {
    const mutation = `
      mutation ApproveComponent($id: ID!) {
        approveComponent(id: $id) {
          id
          name
          approvalStatus
        }
      }
    `;

    return this.graphqlService.mutate(mutation, { id: id.toString() });
  }

  /**
   * Reject component (admin only)
   */
  rejectComponent(id: number, reason: string): Observable<Component> {
    const mutation = `
      mutation RejectComponent($id: ID!, $reason: String) {
        rejectComponent(id: $id, reason: $reason) {
          id
          name
          approvalStatus
        }
      }
    `;

    return this.graphqlService.mutate(mutation, { id: id.toString(), reason });
  }
}
