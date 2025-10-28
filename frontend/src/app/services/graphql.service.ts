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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

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
