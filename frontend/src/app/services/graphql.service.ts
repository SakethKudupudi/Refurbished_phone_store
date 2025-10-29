import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private graphqlUrl = environment.graphqlUrl;

  constructor(private http: HttpClient) { }

  /**
   * Execute GraphQL query
   */
  query<T>(query: string, variables?: Record<string, any>): Observable<T> {
    return this.execute<T>({ query, variables });
  }

  /**
   * Execute GraphQL mutation
   */
  mutate<T>(mutation: string, variables?: Record<string, any>): Observable<T> {
    return this.execute<T>({ query: mutation, variables });
  }

  /**
   * Execute GraphQL request
   */
  private execute<T>(request: GraphQLRequest): Observable<T> {


    const headersConfig: { [k: string]: string } = {
      'Content-Type': 'application/json',
    };

    // If Supabase anon key is configured, include it in headers (both apikey and Authorization)
    if ((environment as any).supabase && (environment as any).supabase.anonKey) {
      const anon = (environment as any).supabase.anonKey;
      headersConfig['apikey'] = anon;
      headersConfig['Authorization'] = `Bearer ${anon}`;
    }

    const headers = new HttpHeaders(headersConfig);

    return this.http.post<GraphQLResponse<T>>(
      this.graphqlUrl,
      request,
      { headers }
    ).pipe(
      map(response => {
        if (response.errors && response.errors.length > 0) {
          console.error('GraphQL Errors:', response.errors);
          throw new Error(response.errors[0].message);
        }
        return response.data as T;
      })
    );
  }

  /**
   * Example: Get all components via GraphQL
   */
  getAllComponents(): Observable<any> {
    const query = `
      query GetAllComponents {
        components {
          id
          name
          price
          description
          componentType
          quantityAvailable
          imageUrl
          manufacturer
          warrantyMonths
          model {
            id
            name
            modelNumber
            brand {
              id
              name
              category
            }
          }
          vendor {
            id
            firstName
            lastName
            email
          }
          approvalStatus
        }
      }
    `;
    return this.query(query);
  }

  /**
   * Example: Get component by ID via GraphQL
   */
  getComponentById(id: number): Observable<any> {
    const query = `
      query GetComponentById($id: ID!) {
        component(id: $id) {
          id
          name
          price
          description
          componentType
          quantityAvailable
          imageUrl
          manufacturer
          warrantyMonths
          model {
            id
            name
            modelNumber
            brand {
              id
              name
              category
            }
          }
          vendor {
            id
            firstName
            lastName
            email
          }
          approvalStatus
        }
      }
    `;
    return this.query(query, { id });
  }

  /**
   * Example: Create component via GraphQL mutation
   */
  createComponent(input: any): Observable<any> {
    const mutation = `
      mutation CreateComponent($input: ComponentInput!) {
        createComponent(input: $input) {
          id
          name
          price
          description
          componentType
          approvalStatus
        }
      }
    `;
    return this.mutate(mutation, { input });
  }

  /**
   * Example: Get user's cart via GraphQL
   */
  getCart(userId: number): Observable<any> {
    const query = `
      query GetCart($userId: ID!) {
        cartItems(userId: $userId) {
          id
          quantity
          component {
            id
            name
            price
            imageUrl
          }
        }
      }
    `;
    return this.query(query, { userId });
  }

  /**
   * Get all brands
   */
  getAllBrands(): Observable<any> {
    const query = `
      query GetAllBrands {
        brands {
          id
          name
          description
          logoUrl
          category
          isActive
        }
      }
    `;
    return this.query(query).pipe(
      map((response: any) => response.brands || [])
    );
  }

  /**
   * Get brands by category
   */
  getBrandsByCategory(category: string): Observable<any> {
    const query = `
      query GetBrandsByCategory($category: BrandCategory!) {
        brandsByCategory(category: $category) {
          id
          name
          description
          logoUrl
          category
          isActive
        }
      }
    `;
    return this.query(query, { category }).pipe(
      map((response: any) => response.brandsByCategory || [])
    );
  }

  /**
   * Get brand by ID
   */
  getBrandById(id: number): Observable<any> {
    const query = `
      query GetBrandById($id: ID!) {
        brand(id: $id) {
          id
          name
          description
          logoUrl
          category
          isActive
        }
      }
    `;
    return this.query(query, { id: id.toString() }).pipe(
      map((response: any) => response.brand)
    );
  }

  /**
   * Get all models
   */
  getAllModels(): Observable<any> {
    const query = `
      query GetAllModels {
        models {
          id
          name
          description
          imageUrl
          releaseYear
          modelNumber
          isActive
          brand {
            id
            name
            category
          }
        }
      }
    `;
    return this.query(query).pipe(
      map((response: any) => response.models || [])
    );
  }

  /**
   * Get models by brand
   */
  getModelsByBrand(brandId: number): Observable<any> {
    const query = `
      query GetModelsByBrand($brandId: ID!) {
        modelsByBrand(brandId: $brandId) {
          id
          name
          description
          imageUrl
          releaseYear
          modelNumber
          isActive
          brand {
            id
            name
            category
          }
        }
      }
    `;
    return this.query(query, { brandId: brandId.toString() }).pipe(
      map((response: any) => response.modelsByBrand || [])
    );
  }

  /**
   * Get model by ID
   */
  getModelById(id: number): Observable<any> {
    const query = `
      query GetModelById($id: ID!) {
        model(id: $id) {
          id
          name
          description
          imageUrl
          releaseYear
          modelNumber
          isActive
          brand {
            id
            name
            category
          }
        }
      }
    `;
    return this.query(query, { id: id.toString() }).pipe(
      map((response: any) => response.model)
    );
  }

  /**
   * Get components by model
   */
  getComponentsByModel(modelId: number): Observable<any> {
    const query = `
      query GetComponentsByModel($modelId: ID!) {
        componentsByModel(modelId: $modelId) {
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
    return this.query(query, { modelId: modelId.toString() }).pipe(
      map((response: any) => response.componentsByModel || [])
    );
  }

  /**
   * Search models
   */
  searchModels(searchTerm: string): Observable<any> {
    const query = `
      query SearchModels($searchTerm: String!) {
        searchModels(searchTerm: $searchTerm) {
          id
          name
          description
          imageUrl
          releaseYear
          modelNumber
          brand {
            id
            name
            category
          }
        }
      }
    `;
    return this.query(query, { searchTerm }).pipe(
      map((response: any) => response.searchModels || [])
    );
  }

  /**
   * Example: Get user's orders via GraphQL
   */
  getUserOrders(userId: number): Observable<any> {
    const query = `
      query GetUserOrders($userId: ID!) {
        orders(userId: $userId) {
          id
          orderNumber
          orderDate
          totalAmount
          orderStatus
          paymentStatus
          items {
            id
            quantity
            unitPrice
            totalPrice
            component {
              id
              name
              imageUrl
            }
          }
        }
      }
    `;
    return this.query(query, { userId });
  }
}
