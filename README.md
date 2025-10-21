# Mobile Parts E-Commerce Platform

An e-waste reduction platform selling mobile device parts and components with separate user, vendor, and admin interfaces.

## 🚀 Tech Stack

### Frontend
- **Framework**: Angular 17+ with TypeScript
- **UI Library**: Angular Material
- **State Management**: RxJS & Services
- **GraphQL Client**: Apollo Angular
- **Authentication**: Azure AD B2C

### Backend
- **Framework**: Spring Boot 3.2+ (Java 21)
- **API**: GraphQL with Spring GraphQL
- **Database**: Azure SQL Database / PostgreSQL
- **Authentication**: Spring Security + Azure AD B2C
- **Storage**: Azure Blob Storage
- **AI/RAG**: Azure OpenAI Service with offline LLM fallback

### Azure Services
- Azure App Service (Frontend hosting)
- Azure Spring Apps (Backend deployment)
- Azure SQL Database / Azure Database for PostgreSQL
- Azure Blob Storage (Product images)
- Azure AD B2C (Authentication)
- Azure API Management (API Gateway)
- Azure Key Vault (Secrets management)
- Azure Monitor (Logging and monitoring)
- Azure OpenAI Service (RAG system)
- Azure AI Search (Vector search)
- Azure Communication Services (Email notifications)

## 📋 Features

### Customer Portal
- Browse mobile parts by brand and model
- Search and filter components
- Shopping cart management
- Secure checkout and payment
- Order tracking and history
- AI-powered component recommendations (RAG)

### Vendor Portal
- Inventory management dashboard
- Add/update product listings
- Track approval status
- Sales analytics

### Admin Dashboard
- Approve/reject vendor submissions
- Real-time inventory monitoring
- Sales analytics and reports
- User and vendor management
- Order management system

## 🏗️ Project Structure

```
final_project/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mobileparts/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── repository/      # Spring Data repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── resolver/        # GraphQL resolvers
│   │   │   │   ├── security/        # Security configuration
│   │   │   │   ├── azure/           # Azure service integrations
│   │   │   │   ├── rag/             # RAG implementation
│   │   │   │   └── dto/             # Data transfer objects
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── graphql/         # GraphQL schema files
│   │   │       └── db/migration/    # Flyway migrations
│   │   └── test/                    # Unit and integration tests
│   └── pom.xml
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/               # Core services and guards
│   │   │   ├── shared/             # Shared components and utilities
│   │   │   ├── features/
│   │   │   │   ├── customer/       # Customer portal
│   │   │   │   ├── vendor/         # Vendor portal
│   │   │   │   └── admin/          # Admin dashboard
│   │   │   ├── graphql/            # GraphQL queries and mutations
│   │   │   └── models/             # TypeScript interfaces
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── infrastructure/             # Azure infrastructure
│   ├── terraform/              # Terraform configurations
│   ├── arm/                    # ARM templates
│   └── scripts/                # Deployment scripts
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
└── docs/                       # Additional documentation
```

## 🔧 Prerequisites

- **Java 21** (JDK 21)
- **Node.js 18+** and npm
- **Angular CLI** 17+
- **Maven 3.8+**
- **Azure CLI**
- **Azure Subscription**
- **PostgreSQL** or **SQL Server** (for local development)

## 🚦 Getting Started

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Configure Azure services in `application.yml`:
   - Azure AD B2C credentials
   - Database connection string
   - Blob Storage connection
   - OpenAI Service endpoint

3. Run database migrations:
   ```bash
   mvn flyway:migrate
   ```

4. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will be available at `http://localhost:8080/graphql`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `src/environments/`:
   - Azure AD B2C configuration
   - GraphQL API endpoint

4. Start the development server:
   ```bash
   ng serve
   ```

The frontend will be available at `http://localhost:4200`

## 🔐 Authentication

The application uses Azure AD B2C for authentication with three user roles:

- **Customer**: Browse and purchase components
- **Vendor**: Manage inventory and listings
- **Admin**: Approve listings and manage platform

## 📊 Database Schema

Key entities:
- **Users**: Customer, Vendor, and Admin accounts
- **Brands**: Mobile device manufacturers
- **Models**: Specific device models
- **Components**: Parts available for sale
- **Orders**: Customer purchases
- **Cart**: Shopping cart items
- **Inventory**: Vendor stock management

## 🤖 RAG System

The application includes an AI-powered recommendation system:
- Azure OpenAI Service for natural language understanding
- Azure AI Search for vector-based product search
- Offline LLM fallback for air-gapped environments
- Custom knowledge base with repair guides and manuals

## 🚀 Deployment

### Azure Deployment

1. Configure Azure resources:
   ```bash
   cd infrastructure/terraform
   terraform init
   terraform apply
   ```

2. Deploy backend to Azure Spring Apps:
   ```bash
   az spring app deploy -n mobile-parts-api -s <spring-app-service> --artifact-path target/mobile-parts-backend.jar
   ```

3. Deploy frontend to Azure App Service:
   ```bash
   cd frontend
   npm run build --prod
   az webapp deploy --resource-group <rg-name> --name <app-name> --src-path dist/
   ```

### CI/CD Pipeline

The project includes GitHub Actions workflows for automated deployment:
- `.github/workflows/backend-deploy.yml`
- `.github/workflows/frontend-deploy.yml`

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📝 API Documentation

GraphQL Playground is available at: `http://localhost:8080/graphql`

Example queries and mutations are documented in `docs/graphql-examples.md`

## 🔒 Security Features

- HTTPS enforcement
- JWT token-based authentication
- CORS configuration
- SQL injection prevention (JPA/Hibernate)
- XSS protection
- Input validation and sanitization
- Secure password storage (Azure AD B2C)
- Azure Key Vault for secrets management

## 📈 Monitoring

Application monitoring via Azure Monitor:
- Application Insights for performance tracking
- Log Analytics for centralized logging
- Custom metrics and alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- Create an issue in the repository
- Contact: support@mobileparts.com

---

Built with ❤️ for e-waste reduction
