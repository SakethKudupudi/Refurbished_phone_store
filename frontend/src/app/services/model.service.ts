import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from './graphql.service';

export interface Model {
  id: number;
  name: string;
  modelNumber?: string;
  description?: string;
  releaseYear?: number;
  imageUrl?: string;
  isActive?: boolean;
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

  constructor(private graphqlService: GraphqlService) { }

  /**
   * Get all models
   */
  getAllModels(): Observable<Model[]> {
    return this.graphqlService.getAllModels();
  }

  /**
   * Get model by ID
   */
  getModelById(id: number): Observable<Model> {
    return this.graphqlService.getModelById(id);
  }

  /**
   * Get models by brand
   */
  getModelsByBrand(brandId: number): Observable<Model[]> {
    return this.graphqlService.getModelsByBrand(brandId);
  }

  /**
   * Search models by name
   */
  searchModels(searchTerm: string): Observable<Model[]> {
    return this.graphqlService.searchModels(searchTerm);
  }

  /**
   * Create new model (admin only)
   */
  createModel(model: Partial<Model>): Observable<Model> {
    const mutation = `
      mutation CreateModel($input: CreateModelInput!) {
        createModel(input: $input) {
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
    return this.graphqlService.mutate(mutation, {
      input: {
        name: model.name,
        brandId: model.brand?.id?.toString(),
        description: model.description,
        imageUrl: model.imageUrl,
        releaseYear: model.releaseYear,
        modelNumber: model.modelNumber
      }
    });
  }

  /**
   * Update model (admin only)
   */
  updateModel(id: number, model: Partial<Model>): Observable<Model> {
    const mutation = `
      mutation UpdateModel($id: ID!, $input: CreateModelInput!) {
        updateModel(id: $id, input: $input) {
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
    return this.graphqlService.mutate(mutation, {
      id: id.toString(),
      input: {
        name: model.name,
        brandId: model.brand?.id?.toString(),
        description: model.description,
        imageUrl: model.imageUrl,
        releaseYear: model.releaseYear,
        modelNumber: model.modelNumber
      }
    });
  }

  /**
   * Delete model (admin only)
   */
  deleteModel(id: number): Observable<void> {
    const mutation = `
      mutation DeleteModel($id: ID!) {
        deleteModel(id: $id)
      }
    `;
    return this.graphqlService.mutate(mutation, { id: id.toString() });
  }
}
