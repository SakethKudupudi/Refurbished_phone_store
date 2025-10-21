# Mobile Parts E-Commerce - Complete Implementation Guide

This document provides the complete file structure and implementation details for all remaining components.

## ✅ Completed Components

### Backend - Completed Files
1. ✅ `/backend/pom.xml` - Maven configuration with Java 21
2. ✅ `/backend/src/main/resources/application.yml` - Application configuration
3. ✅ `/backend/src/main/java/com/mobileparts/MobilePartsApplication.java` - Main class
4. ✅ All Entity classes (BaseEntity, User, Brand, Model, Component, CartItem, Order, OrderItem)
5. ✅ All Repository interfaces (User, Brand, Model, Component, CartItem, Order, OrderItem)
6. ✅ `/backend/src/main/resources/graphql/schema.graphqls` - GraphQL schema

### Project Structure - Completed
1. ✅ README.md - Project documentation
2. ✅ .gitignore - Git ignore configuration

## 📋 Remaining Backend Components

### 1. DTOs (Data Transfer Objects)
**Location**: `/backend/src/main/java/com/mobileparts/dto/`

Files to create:
- `UserDTO.java` - User data transfer object
- `BrandDTO.java` - Brand DTO
- `ModelDTO.java` - Model DTO
- `ComponentDTO.java` - Component DTO
- `CartDTO.java` - Cart DTO with items
- `OrderDTO.java` - Order DTO
- `AuthRequest.java` - Authentication request
- `AuthResponse.java` - Authentication response
- `CreateComponentRequest.java` - Component creation request
- `UpdateComponentRequest.java` - Component update request
- `CreateOrderRequest.java` - Order creation request
- `SalesAnalyticsDTO.java` - Analytics data
- `InventoryStatsDTO.java` - Inventory statistics
- `RAGResponseDTO.java` - RAG system response

### 2. Service Layer
**Location**: `/backend/src/main/java/com/mobileparts/service/`

Files to create:
- `UserService.java` - User management service
- `AuthenticationService.java` - Authentication and JWT handling
- `BrandService.java` - Brand management
- `ModelService.java` - Model management
- `ComponentService.java` - Component CRUD and approval
- `CartService.java` - Shopping cart operations
- `OrderService.java` - Order processing and management
- `PaymentService.java` - Payment processing (mock)
- `EmailService.java` - Email notifications via Azure Communication Services
- `AnalyticsService.java` - Sales and inventory analytics
- `SearchService.java` - Component search functionality

### 3. GraphQL Resolvers
**Location**: `/backend/src/main/java/com/mobileparts/resolver/`

Files to create:
- `UserResolver.java` - User queries and mutations
- `AuthResolver.java` - Authentication mutations
- `BrandResolver.java` - Brand queries and mutations
- `ModelResolver.java` - Model queries and mutations
- `ComponentResolver.java` - Component queries and mutations
- `CartResolver.java` - Cart queries and mutations
- `OrderResolver.java` - Order queries and mutations
- `AdminResolver.java` - Admin-only operations
- `AnalyticsResolver.java` - Analytics queries
- `RAGResolver.java` - RAG system queries

### 4. Security Configuration
**Location**: `/backend/src/main/java/com/mobileparts/security/`

Files to create:
- `SecurityConfig.java` - Spring Security configuration
- `AzureADB2CConfig.java` - Azure AD B2C configuration
- `JwtTokenProvider.java` - JWT token generation and validation
- `JwtAuthenticationFilter.java` - JWT authentication filter
- `UserDetailsServiceImpl.java` - User details service
- `CustomUserDetails.java` - Custom user details implementation

### 5. Azure Service Integration
**Location**: `/backend/src/main/java/com/mobileparts/azure/`

Files to create:
- `AzureBlobStorageService.java` - Blob storage operations
- `AzureKeyVaultService.java` - Key Vault secret management
- `AzureOpenAIService.java` - OpenAI service integration
- `AzureSearchService.java` - Azure AI Search integration
- `AzureCommunicationService.java` - Email service integration
- `AzureConfig.java` - Azure services configuration

### 6. RAG System Implementation
**Location**: `/backend/src/main/java/com/mobileparts/rag/`

Files to create:
- `RAGService.java` - Main RAG service orchestrator
- `EmbeddingService.java` - Text embedding generation
- `VectorSearchService.java` - Vector similarity search
- `DocumentProcessor.java` - Document ingestion and chunking
- `OfflineLLMService.java` - Offline LLM fallback
- `KnowledgeBaseService.java` - Knowledge base management
- `PromptTemplate.java` - Prompt template management

### 7. Configuration Classes
**Location**: `/backend/src/main/java/com/mobileparts/config/`

Files to create:
- `GraphQLConfig.java` - GraphQL configuration
- `CorsConfig.java` - CORS configuration
- `AsyncConfig.java` - Async processing configuration
- `SchedulingConfig.java` - Scheduled tasks configuration
- `CacheConfig.java` - Caching configuration
- `OpenAPIConfig.java` - OpenAPI/Swagger configuration

### 8. Exception Handling
**Location**: `/backend/src/main/java/com/mobileparts/exception/`

Files to create:
- `GlobalExceptionHandler.java` - Global exception handler
- `ResourceNotFoundException.java` - Resource not found exception
- `UnauthorizedException.java` - Unauthorized exception
- `ValidationException.java` - Validation exception
- `InsufficientStockException.java` - Stock exception
- `PaymentException.java` - Payment exception
- `ErrorResponse.java` - Error response DTO

### 9. Utilities
**Location**: `/backend/src/main/java/com/mobileparts/util/`

Files to create:
- `OrderNumberGenerator.java` - Order number generation
- `SKUGenerator.java` - SKU generation
- `ValidationUtils.java` - Validation utilities
- `DateUtils.java` - Date/time utilities
- `PriceCalculator.java` - Price calculation utilities

### 10. Database Migrations
**Location**: `/backend/src/main/resources/db/migration/`

Files to create:
- `V1__create_users_table.sql`
- `V2__create_brands_table.sql`
- `V3__create_models_table.sql`
- `V4__create_components_table.sql`
- `V5__create_cart_items_table.sql`
- `V6__create_orders_table.sql`
- `V7__create_order_items_table.sql`
- `V8__create_indexes.sql`
- `V9__insert_initial_data.sql`

### 11. Testing
**Location**: `/backend/src/test/java/com/mobileparts/`

Files to create:
- `MobilePartsApplicationTests.java`
- `service/ComponentServiceTest.java`
- `service/OrderServiceTest.java`
- `service/CartServiceTest.java`
- `repository/ComponentRepositoryTest.java`
- `resolver/ComponentResolverTest.java`
- `security/JwtTokenProviderTest.java`

### 12. Test Resources
**Location**: `/backend/src/test/resources/`

Files to create:
- `application-test.yml`
- `test-data.sql`

## 📋 Frontend Components

### 1. Angular Project Setup

**Commands to run:**
```bash
cd /Users/saketh/project_codes/test_projects/final_project
ng new frontend --routing --style=scss --skip-git
cd frontend
ng add @angular/material
ng add apollo-angular
```

### 2. Project Configuration Files
**Location**: `/frontend/`

Files to create/modify:
- `angular.json` - Angular configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies
- `.browserslistrc` - Browser compatibility
- `proxy.conf.json` - Development proxy

### 3. Environment Configuration
**Location**: `/frontend/src/environments/`

Files to create:
- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

### 4. Core Module
**Location**: `/frontend/src/app/core/`

Folders and files:
- `guards/` 
  - `auth.guard.ts`
  - `role.guard.ts`
  - `customer.guard.ts`
  - `vendor.guard.ts`
  - `admin.guard.ts`
- `interceptors/`
  - `auth.interceptor.ts`
  - `error.interceptor.ts`
  - `loading.interceptor.ts`
- `services/`
  - `auth.service.ts`
  - `user.service.ts`
  - `azure-ad.service.ts`
  - `storage.service.ts`
- `models/`
  - `user.model.ts`
  - `auth.model.ts`
  - `role.enum.ts`
- `core.module.ts`

### 5. Shared Module
**Location**: `/frontend/src/app/shared/`

Components and services:
- `components/`
  - `header/header.component.ts|html|scss`
  - `footer/footer.component.ts|html|scss`
  - `loading-spinner/loading-spinner.component.ts|html|scss`
  - `error-message/error-message.component.ts|html|scss`
  - `confirm-dialog/confirm-dialog.component.ts|html|scss`
- `pipes/`
  - `currency.pipe.ts`
  - `date-format.pipe.ts`
- `directives/`
  - `img-fallback.directive.ts`
- `shared.module.ts`

### 6. Customer Feature Module
**Location**: `/frontend/src/app/features/customer/`

Components:
- `landing/landing.component.ts|html|scss`
- `category-selection/category-selection.component.ts|html|scss`
- `brand-selection/brand-selection.component.ts|html|scss`
- `model-selection/model-selection.component.ts|html|scss`
- `product-details/product-details.component.ts|html|scss`
- `cart/cart.component.ts|html|scss`
- `checkout/checkout.component.ts|html|scss`
- `order-confirmation/order-confirmation.component.ts|html|scss`
- `order-history/order-history.component.ts|html|scss`
- `order-detail/order-detail.component.ts|html|scss`
- `customer-routing.module.ts`
- `customer.module.ts`

### 7. Vendor Feature Module
**Location**: `/frontend/src/app/features/vendor/`

Components:
- `vendor-login/vendor-login.component.ts|html|scss`
- `vendor-dashboard/vendor-dashboard.component.ts|html|scss`
- `add-inventory/add-inventory.component.ts|html|scss`
- `inventory-list/inventory-list.component.ts|html|scss`
- `inventory-detail/inventory-detail.component.ts|html|scss`
- `vendor-analytics/vendor-analytics.component.ts|html|scss`
- `vendor-routing.module.ts`
- `vendor.module.ts`

### 8. Admin Feature Module
**Location**: `/frontend/src/app/features/admin/`

Components:
- `admin-login/admin-login.component.ts|html|scss`
- `admin-dashboard/admin-dashboard.component.ts|html|scss`
- `pending-approvals/pending-approvals.component.ts|html|scss`
- `approval-detail/approval-detail.component.ts|html|scss`
- `inventory-management/inventory-management.component.ts|html|scss`
- `sales-analytics/sales-analytics.component.ts|html|scss`
- `user-management/user-management.component.ts|html|scss`
- `vendor-management/vendor-management.component.ts|html|scss`
- `order-management/order-management.component.ts|html|scss`
- `admin-routing.module.ts`
- `admin.module.ts`

### 9. GraphQL Operations
**Location**: `/frontend/src/app/graphql/`

Files to create:
- `queries/`
  - `brand.queries.ts`
  - `model.queries.ts`
  - `component.queries.ts`
  - `cart.queries.ts`
  - `order.queries.ts`
  - `user.queries.ts`
  - `analytics.queries.ts`
- `mutations/`
  - `auth.mutations.ts`
  - `cart.mutations.ts`
  - `order.mutations.ts`
  - `component.mutations.ts`
  - `approval.mutations.ts`
- `subscriptions/`
  - `order.subscriptions.ts`
  - `inventory.subscriptions.ts`
- `graphql.module.ts`

### 10. Models/Interfaces
**Location**: `/frontend/src/app/models/`

Files to create:
- `brand.model.ts`
- `model.model.ts`
- `component.model.ts`
- `cart.model.ts`
- `order.model.ts`
- `analytics.model.ts`
- `enums.ts`

### 11. Services
**Location**: `/frontend/src/app/services/`

Files to create:
- `brand.service.ts`
- `model.service.ts`
- `component.service.ts`
- `cart.service.ts`
- `order.service.ts`
- `analytics.service.ts`
- `search.service.ts`
- `rag.service.ts`

### 12. Main App Files
**Location**: `/frontend/src/app/`

Files to create/modify:
- `app.component.ts|html|scss`
- `app-routing.module.ts`
- `app.module.ts`

### 13. Styles
**Location**: `/frontend/src/styles/`

Files to create:
- `_variables.scss` - SCSS variables
- `_mixins.scss` - SCSS mixins
- `_typography.scss` - Typography styles
- `/frontend/src/styles.scss` - Global styles

### 14. Assets
**Location**: `/frontend/src/assets/`

Folders to create:
- `images/` - Image assets
- `icons/` - Icon files
- `i18n/` - Internationalization files (optional)

## 📋 Infrastructure & DevOps

### 1. Terraform Configuration
**Location**: `/infrastructure/terraform/`

Files to create:
- `main.tf` - Main Terraform configuration
- `variables.tf` - Variable definitions
- `outputs.tf` - Output values
- `providers.tf` - Provider configuration
- `modules/`
  - `app-service/main.tf`
  - `spring-apps/main.tf`
  - `database/main.tf`
  - `storage/main.tf`
  - `key-vault/main.tf`
  - `app-insights/main.tf`
  - `api-management/main.tf`
  - `ad-b2c/main.tf`
  - `openai/main.tf`
  - `search/main.tf`
  - `communication/main.tf`

### 2. ARM Templates
**Location**: `/infrastructure/arm/`

Files to create:
- `azuredeploy.json` - Main ARM template
- `azuredeploy.parameters.json` - Parameters file
- `modules/`
  - `app-service.json`
  - `spring-apps.json`
  - `database.json`
  - `storage.json`
  - `keyvault.json`

### 3. Deployment Scripts
**Location**: `/infrastructure/scripts/`

Files to create:
- `deploy-backend.sh`
- `deploy-frontend.sh`
- `deploy-infrastructure.sh`
- `setup-database.sh`
- `seed-data.sh`

### 4. GitHub Actions
**Location**: `/.github/workflows/`

Files to create:
- `backend-ci.yml` - Backend CI pipeline
- `frontend-ci.yml` - Frontend CI pipeline
- `backend-cd.yml` - Backend deployment
- `frontend-cd.yml` - Frontend deployment
- `infrastructure.yml` - Infrastructure deployment
- `pr-validation.yml` - PR validation

### 5. Azure DevOps (Alternative)
**Location**: `/azure-pipelines/`

Files to create:
- `backend-pipeline.yml`
- `frontend-pipeline.yml`
- `infrastructure-pipeline.yml`

## 📋 Documentation

### Location: `/docs/`

Files to create:
- `API.md` - API documentation
- `DEPLOYMENT.md` - Deployment guide
- `ARCHITECTURE.md` - Architecture overview
- `SECURITY.md` - Security best practices
- `DEVELOPMENT.md` - Development guide
- `CONTRIBUTING.md` - Contribution guidelines
- `graphql-examples.md` - GraphQL query examples
- `azure-setup.md` - Azure services setup guide
- `rag-configuration.md` - RAG system configuration

## 🔧 Configuration Files

### Docker (Optional)
**Location**: `/`

Files to create:
- `docker-compose.yml`
- `/backend/Dockerfile`
- `/frontend/Dockerfile`
- `.dockerignore`

### Additional Files
**Location**: `/`

Files to create:
- `LICENSE`
- `CHANGELOG.md`
- `.editorconfig`
- `.nvmrc`

## 📊 Summary

### Total Files to Create:

**Backend**: ~60 files
- Entities: 8 ✅
- Repositories: 7 ✅
- DTOs: 14
- Services: 11
- Resolvers: 10
- Security: 6
- Azure Integration: 6
- RAG System: 7
- Configuration: 6
- Exception Handling: 7
- Utilities: 5
- Database Migrations: 9
- Tests: 7
- GraphQL Schema: 1 ✅

**Frontend**: ~80 files
- Configuration: 6
- Core Module: 15
- Shared Module: 10
- Customer Module: 20
- Vendor Module: 14
- Admin Module: 18
- GraphQL: 15
- Models: 7
- Services: 8
- Main App: 3
- Styles: 4

**Infrastructure**: ~35 files
- Terraform: 15
- ARM Templates: 5
- Scripts: 5
- CI/CD: 7
- Documentation: 9

**Total: ~175 files**

## 🚀 Next Steps

1. Complete backend service layer implementation
2. Implement GraphQL resolvers
3. Set up Azure service integrations
4. Implement RAG system
5. Create database migration scripts
6. Initialize Angular frontend
7. Build customer portal components
8. Build vendor portal components
9. Build admin dashboard
10. Set up infrastructure as code
11. Create CI/CD pipelines
12. Write comprehensive tests
13. Document the system

## 📝 Implementation Priority

### Phase 1: Core Backend (Week 1-2)
- Service layer
- GraphQL resolvers
- Security configuration
- Database migrations

### Phase 2: Azure Integration (Week 2-3)
- Blob Storage
- Key Vault
- OpenAI Service
- RAG System

### Phase 3: Frontend (Week 3-5)
- Angular setup
- Customer portal
- Vendor portal
- Admin dashboard

### Phase 4: Infrastructure & DevOps (Week 5-6)
- Terraform/ARM templates
- CI/CD pipelines
- Testing
- Documentation

---

**Note**: This is a comprehensive enterprise-level application. Each component has been designed following best practices and industry standards. The implementation requires experienced developers familiar with Spring Boot, Angular, GraphQL, and Azure services.
