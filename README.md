# Mobile Parts E-Commerce Platform

A cost-effective e-waste reduction platform selling mobile device parts and components with separate user, vendor, and admin interfaces. Built with modern technologies and optimized for minimal cloud costs.

## 🚀 Tech Stack

### Frontend
- **Framework**: Angular 17+ with TypeScript
- **UI Components**: Standalone Angular components
- **State Management**: RxJS & Services  
- **API**: RESTful + GraphQL support
- **Authentication**: Firebase Authentication
- **Deployment**: Azure Static Web Apps (free tier)

### Backend
- **Framework**: Spring Boot 3.4.0 (Java 21)
- **Build Tool**: Maven 3.9.11
- **API**: RESTful endpoints + GraphQL with Spring GraphQL
- **Database**: H2 (development) / Azure SQL (production)
- **Authentication**: Firebase Admin SDK + Spring Security
- **Deployment**: Azure App Service (F1 free tier)

### Cost-Optimized Architecture
- **Authentication**: Firebase Authentication (free for most use cases)
- **Frontend Hosting**: Azure Static Web Apps (free tier)
- **Backend Hosting**: Azure App Service F1 (free tier) 
- **Database**: Azure SQL Database (free tier available)
- **Total Monthly Cost**: ~$5/month (vs $115/month with premium services)

### Optional Premium Services
- Azure Blob Storage (Product images)
- Azure OpenAI Service (AI recommendations)
- Azure API Management (API Gateway)
- Azure Key Vault (Secrets management)
- Azure Monitor (Advanced logging and monitoring)

## 📋 Features

### Customer Portal ✅ Implemented
- Browse mobile parts by brand and model (14 phone models available)
- Browse components for iPhone 14/15/16/17, Samsung Galaxy, Google Pixel, OnePlus, Xiaomi
- Shopping cart management
- Secure Firebase authentication (Email/Password + Google Sign-in)
- Mock data with 60+ replacement components (screens, batteries, cameras)

### Vendor Portal 🚧 In Development
- Inventory management dashboard
- Add/update product listings
- Track approval status
- Sales analytics

### Admin Dashboard 🚧 In Development  
- Approve/reject vendor submissions
- Real-time inventory monitoring
- Sales analytics and reports
- User and vendor management
- Order management system

### Current Data Available
- **14 Phone Models**: iPhone 15 Pro Max, 15 Pro, 14 Pro Max, 16 Pro Max, 16 Pro, 16, 17 Pro Max, 17 Pro, 17, Samsung Galaxy S24/S23, Google Pixel 8 Pro, OnePlus 12, Xiaomi 14 Ultra
- **60+ Components**: Screens, batteries, cameras, charging ports, speakers for all models
- **Mock Pricing**: Realistic component pricing ($25-$299 range)

## 🏗️ Project Structure

```
final_project/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mobileparts/
│   │   │   │   ├── config/          # Configuration classes (Firebase, Security)
│   │   │   │   ├── entity/          # JPA entities (User, Brand, Model, Component)
│   │   │   │   ├── repository/      # Spring Data repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── resolver/        # GraphQL resolvers
│   │   │   │   └── controller/      # REST controllers
│   │   │   └── resources/
│   │   │       ├── application.yml  # Main config
│   │   │       ├── application-h2.yml # H2 database config
│   │   │       ├── application-sqlserver.yml # Azure SQL config
│   │   │       ├── data.sql         # Seed data (33 models, 110+ components)
│   │   │       └── graphql/         # GraphQL schema files
│   │   └── test/                    # Unit and integration tests
│   └── pom.xml                      # Maven dependencies (Spring Boot 3.4.0, Firebase)
├── frontend/                   # Angular 17 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── customer/       # Customer portal (brand-list, model-list, component-list)
│   │   │   │   ├── vendor/         # Vendor portal (in development)
│   │   │   │   └── admin/          # Admin dashboard (in development)
│   │   │   ├── services/           # Firebase auth, API services
│   │   │   ├── guards/             # Route guards
│   │   │   ├── interceptors/       # HTTP interceptors (Firebase token)
│   │   │   └── models/             # TypeScript interfaces
│   │   ├── environments/           # Firebase configuration
│   │   └── assets/
│   ├── angular.json
│   ├── package.json                # Dependencies (Angular 17, Firebase SDK)
│   └── proxy.conf.json             # Development proxy
├── infrastructure/             # Deployment infrastructure
│   └── terraform/              # Terraform for Azure resources
├── docs/                       # Setup and deployment guides
│   ├── FIREBASE_SETUP.md       # Firebase project setup
│   ├── AZURE_DEPLOYMENT.md     # Azure deployment guide
│   ├── FIREBASE_AZURE_SETUP.md # Complete integration guide
│   ├── INTEGRATION_SUMMARY.md  # Implementation summary
│   └── QUICK_START.md          # 5-minute setup guide
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
└── README.md                   # This file

## 🔧 Prerequisites

- **Java 21** (JDK 21) - for backend development
- **Node.js 18+** and npm - for frontend development  
- **Angular CLI** 17+ - `npm install -g @angular/cli`
- **Maven 3.9+** - for building Spring Boot backend
- **Firebase Account** - for authentication (free)
- **Azure Account** - for deployment (free tier available)

## 🚦 Quick Start (5 minutes)

### 1. Firebase Setup
Follow `docs/QUICK_START.md` for rapid setup, or:

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password and Google authentication
3. Copy config to `frontend/src/environments/environment.ts`
4. Download service account JSON for backend

### 2. Frontend Setup

```bash
cd frontend
npm install
ng serve
```
Frontend available at `http://localhost:4200`

### 3. Backend Setup (Optional for frontend-only testing)

```bash
cd backend
mvn spring-boot:run -Dspring.profiles.active=h2
```
Backend available at `http://localhost:8080`

**Note**: Frontend works with mock data, so backend is optional for initial testing.

## 🔧 Detailed Setup

### Backend Configuration

1. **Database Profiles**:
   - `h2`: In-memory H2 database (development)
   - `sqlserver`: Azure SQL Database (production)

2. **Application Properties**:
   ```yaml
   # application.yml
   spring:
     profiles:
       active: h2  # or sqlserver for production
   
   # Firebase configuration (add your service account path)
   firebase:
     service-account-path: classpath:firebase-service-account.json
   ```

3. **Firebase Admin SDK**:
   - Place `firebase-service-account.json` in `src/main/resources/`
   - Add to `.gitignore` for security

### Frontend Configuration

1. **Environment Setup**:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080',
     firebase: {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       // ... other Firebase config
     }
   };
   ```

2. **Available Routes**:
   - `/brands` - Browse phone brands
   - `/models/:brandId` - View models for specific brand  
   - `/components/:modelId` - View components for specific model
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

The application uses Firebase Authentication with multiple sign-in methods:

- **Email/Password**: Traditional registration and login
- **Google Sign-in**: One-click authentication with Google accounts
- **JWT Tokens**: Secure API communication with Firebase ID tokens
- **Role-based Access**: Customer, Vendor, and Admin roles (planned)

### Cost Comparison
- **Previous**: Azure AD B2C (~$15/month for 50K users)
- **Current**: Firebase Authentication (free up to 50K users/month)
- **Savings**: $180/year for typical usage

## 📊 Database Schema

### Current Implementation (data.sql)
```sql
-- 7 Phone Brands
BRANDS: Apple, Samsung, Google, OnePlus, Xiaomi, Huawei, Motorola

-- 33 Phone Models (including latest iPhones)
MODELS: iPhone 15 Pro Max, 15 Pro, 14 Pro Max, 16 Pro Max, 16 Pro, 16, 
        17 Pro Max, 17 Pro, 17, Galaxy S24, S23, Pixel 8 Pro, etc.

-- 110+ Components  
COMPONENTS: Screens ($89-$299), Batteries ($25-$79), Cameras ($45-$129),
           Charging Ports ($15-$35), Speakers ($20-$45)
```

### Entity Relationships
- **Users** → **Orders** (1:many)
- **Brands** → **Models** (1:many) 
- **Models** → **Components** (1:many)
- **Users** → **Cart Items** (1:many)
- **Components** → **Cart Items** (1:many)

## 🚀 Deployment Options

### Option 1: Free Tier Deployment (Recommended)
```bash
# Frontend: Azure Static Web Apps (free)
# Backend: Azure App Service F1 (free) 
# Database: Azure SQL free tier or H2
# Auth: Firebase (free)
# Total Cost: ~$0-5/month
```

### Option 2: Premium Deployment
```bash
# Frontend: Azure Static Web Apps (free)
# Backend: Azure App Service (paid tiers)
# Database: Azure SQL Database (paid)  
# Additional: Blob Storage, Key Vault, Monitoring
# Total Cost: ~$20-50/month
```

### Quick Deploy Commands
```bash
# Deploy to Azure (requires Azure CLI)
cd docs
# Follow AZURE_DEPLOYMENT.md for step-by-step guide

# Or use Terraform
cd infrastructure/terraform
terraform init && terraform apply
```

### CI/CD Pipeline (Optional)

GitHub Actions workflows available for automated deployment:
- `.github/workflows/frontend-deploy.yml` - Deploy Angular to Azure Static Web Apps
- `.github/workflows/backend-deploy.yml` - Deploy Spring Boot to Azure App Service

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test          # Unit tests with Jasmine/Karma
npm run e2e           # End-to-end tests (if configured)
npm run lint          # Code linting
```

### Backend Testing  
```bash
cd backend
mvn test              # Unit and integration tests
mvn verify            # Full test suite with reports
```

### Manual Testing Checklist
- ✅ Firebase authentication (sign up, sign in, Google sign-in)
- ✅ Browse brands (7 phone manufacturers)
- ✅ View models for each brand (14 models total)
- ✅ View components for each model (4-5 components per model)
- ✅ Mock shopping cart functionality
- 🚧 Backend API integration (when Lombok issues resolved)

## 📝 API Documentation

### Current Status
- **Frontend**: Mock data implementation working
- **Backend**: GraphQL + REST endpoints (requires Firebase token)
- **Authentication**: Firebase ID tokens required for API access

### Available Endpoints
```bash
# GraphQL Playground (when backend running)
http://localhost:8080/graphql

# REST API examples
GET /api/brands              # List all brands
GET /api/models/{brandId}    # Models for specific brand  
GET /api/components/{modelId} # Components for specific model
```

### GraphQL Queries Example
```graphql
query GetBrands {
  brands {
    id
    name
    models {
      id
      name
      releaseYear
      components {
        id
        name
        type
        price
      }
    }
  }
}
```

## 🔒 Security Features

### Authentication Security
- Firebase ID token verification
- Secure JWT token handling
- Google OAuth 2.0 integration
- Automatic token refresh

### Application Security
- HTTPS enforcement in production
- CORS configuration for API access
- Input validation and sanitization
- SQL injection prevention (JPA/Hibernate)
- XSS protection in Angular
- Environment-based configuration management

### Production Security Checklist
- [ ] Firebase service account JSON in .gitignore
- [ ] Environment variables for sensitive config
- [ ] HTTPS certificates configured
- [ ] Azure App Service security settings
- [ ] Database connection encryption

## 📈 Cost Optimization

### Monthly Cost Breakdown
| Service | Previous (Azure Premium) | Current (Optimized) | Savings |
|---------|-------------------------|-------------------|---------|
| Authentication | Azure AD B2C $15 | Firebase $0 | $15 |
| Backend Hosting | Azure Spring Apps $100 | Azure App Service F1 $0 | $100 |
| Frontend Hosting | Azure App Service $10 | Azure Static Web Apps $0 | $10 |
| **Total** | **$125/month** | **$0-5/month** | **$120/month** |
| **Annual** | **$1,500/year** | **$0-60/year** | **$1,440/year** |

### Scalability Path
1. **Free Tier**: Start with free services (good for 1K-10K users)
2. **Basic Tier**: Upgrade App Service when needed ($10-20/month)
3. **Premium Tier**: Add Blob Storage, Premium DB, monitoring ($50-100/month)

## 🚧 Current Status & Roadmap

### ✅ Completed
- Angular 17 frontend with Firebase authentication
- Spring Boot 3.4.0 backend with Firebase Admin SDK
- Mock data for 14 phone models and 60+ components
- Cost-optimized architecture design
- Comprehensive setup documentation

### 🚧 In Progress  
- Backend compilation fixes (Lombok/JDK 21 compatibility)
- Firebase project setup and configuration
- Azure deployment implementation

### 📅 Planned Features
- Vendor portal development
- Admin dashboard implementation  
- Real shopping cart and checkout
- Order management system
- Payment integration (Stripe/PayPal)
- Email notifications
- Advanced search and filtering
- Mobile app version (React Native/Flutter)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow Angular style guide for frontend
- Use Spring Boot best practices for backend
- Write unit tests for new features
- Update documentation for API changes
- Test Firebase authentication flow

## � Documentation

### Setup Guides
- `docs/QUICK_START.md` - 5-minute setup guide
- `docs/FIREBASE_SETUP.md` - Detailed Firebase configuration
- `docs/AZURE_DEPLOYMENT.md` - Azure deployment guide
- `docs/FIREBASE_AZURE_SETUP.md` - Complete integration guide
- `docs/INTEGRATION_SUMMARY.md` - Implementation summary

### Architecture Documents
- Firebase Authentication flow
- Cost optimization analysis
- Database schema and relationships
- API design patterns

## 🆘 Troubleshooting

### Common Issues

1. **Backend won't start**: 
   - Check Java 21 is installed
   - Verify Maven dependencies: `mvn clean install`
   - Try H2 profile: `mvn spring-boot:run -Dspring.profiles.active=h2`

2. **Frontend authentication errors**:
   - Verify Firebase configuration in `environment.ts`
   - Check Firebase project settings
   - Ensure authentication methods are enabled

3. **API calls failing**:
   - Check if backend is running on port 8080
   - Verify Firebase tokens are being sent
   - Check CORS configuration

### Support Channels
- GitHub Issues: Technical problems and bug reports
- Discussions: Feature requests and general questions
- Documentation: Comprehensive setup guides in `/docs`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Angular Team** - For the excellent Angular framework
- **Spring Team** - For Spring Boot and Spring Security  
- **Firebase Team** - For cost-effective authentication
- **Azure Team** - For generous free tier offerings
- **Open Source Community** - For countless libraries and tools

---

**Built with ❤️ for sustainable e-waste reduction and affordable mobile device repair**

*Total setup time: ~15 minutes | Monthly cost: ~$5 | Annual savings: ~$1,440*
