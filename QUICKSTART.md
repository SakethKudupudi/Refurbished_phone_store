# Quick Start Guide - Mobile Parts E-Commerce Platform

## 🚀 Getting Started in 5 Minutes

This guide will help you get the application running locally for development.

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Java 21 JDK** installed ([Download](https://adoptium.net/))
- ✅ **Maven 3.8+** installed
- ✅ **Node.js 18+** and npm installed
- ✅ **PostgreSQL 14+** installed and running
- ✅ **Angular CLI** installed globally: `npm install -g @angular/cli`
- ✅ **Git** installed

## Step 1: Clone and Setup Database

```bash
# Navigate to project directory
cd /Users/saketh/project_codes/test_projects/final_project

# Create PostgreSQL database
psql -U postgres
CREATE DATABASE mobileparts;
CREATE USER mobileparts_user WITH ENCRYPTED PASSWORD 'mobileparts_pass';
GRANT ALL PRIVILEGES ON DATABASE mobileparts TO mobileparts_user;
\q
```

## Step 2: Configure Backend

```bash
# Navigate to backend directory
cd backend

# Create application-local.yml for local development (optional)
cat > src/main/resources/application-local.yml << 'EOF'
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mobileparts
    username: mobileparts_user
    password: mobileparts_pass
  
  jpa:
    show-sql: true
  
  flyway:
    enabled: true

# For local development, you can skip Azure configuration
azure:
  activedirectory:
    enabled: false
  storage:
    blob:
      enabled: false
  keyvault:
    enabled: false
  openai:
    enabled: false
  search:
    enabled: false

# Use mock services for local development
app:
  payment:
    mock-mode: true
  email:
    mock-mode: true
  rag:
    enabled: false
EOF
```

## Step 3: Build and Run Backend

```bash
# Still in backend directory

# Run database migrations
./mvnw flyway:migrate

# Build the project
./mvnw clean install -DskipTests

# Run the application
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

The backend will start on `http://localhost:8080`

### Verify Backend is Running

Open your browser and navigate to:
- GraphQL Playground: `http://localhost:8080/graphiql`
- Health Check: `http://localhost:8080/actuator/health`

## Step 4: Setup Angular Frontend

```bash
# Open a new terminal and navigate to project root
cd /Users/saketh/project_codes/test_projects/final_project

# Create Angular application
ng new frontend --routing --style=scss --skip-git
cd frontend

# Install dependencies
npm install @angular/material @angular/cdk
npm install apollo-angular @apollo/client graphql
npm install @azure/msal-angular @azure/msal-browser

# Generate Angular Material module
ng add @angular/material --skip-confirmation
```

## Step 5: Configure Frontend

```bash
# Create environment files
cat > src/environments/environment.ts << 'EOF'
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  graphqlUrl: 'http://localhost:8080/graphql',
  azureAdB2C: {
    clientId: 'your-client-id',
    authority: 'https://login.microsoftonline.com/your-tenant-id',
    redirectUri: 'http://localhost:4200',
    enabled: false  // Disable for local development
  }
};
EOF

cat > src/environments/environment.prod.ts << 'EOF'
export const environment = {
  production: true,
  apiUrl: 'https://your-backend.azurewebsites.net',
  graphqlUrl: 'https://your-backend.azurewebsites.net/graphql',
  azureAdB2C: {
    clientId: process.env['AZURE_AD_CLIENT_ID'],
    authority: process.env['AZURE_AD_AUTHORITY'],
    redirectUri: process.env['APP_URL'],
    enabled: true
  }
};
EOF
```

## Step 6: Run Frontend

```bash
# Still in frontend directory
ng serve

# Or run with proxy configuration
ng serve --proxy-config proxy.conf.json
```

The frontend will start on `http://localhost:4200`

## 🎉 You're All Set!

### Default Accounts

After running database migrations, you'll have these default accounts:

**Admin Account:**
- Email: `admin@mobileparts.com`
- Access: Admin Dashboard, Vendor Portal, Customer Portal

**Vendor Account:**
- Email: `vendor@example.com`
- Access: Vendor Portal, Customer Portal

**Customer Account:**
- Email: `customer@example.com`
- Access: Customer Portal

> **Note**: For local development without Azure AD B2C, you may need to implement a simple local authentication mechanism or mock the authentication.

## 📝 Common Commands

### Backend Commands

```bash
# Run tests
./mvnw test

# Run specific test
./mvnw test -Dtest=ComponentServiceTest

# Clean and rebuild
./mvnw clean install

# Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Check code coverage
./mvnw verify

# Run Flyway migrations
./mvnw flyway:migrate

# Check Flyway status
./mvnw flyway:info
```

### Frontend Commands

```bash
# Run development server
ng serve

# Run tests
ng test

# Run e2e tests
ng e2e

# Build for production
ng build --configuration production

# Generate component
ng generate component features/customer/landing

# Generate service
ng generate service services/cart

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/frontend/stats.json
```

## 🔧 Troubleshooting

### Backend Issues

**Issue: Database connection failed**
```bash
# Verify PostgreSQL is running
pg_isready

# Check database exists
psql -U postgres -l | grep mobileparts

# Test connection
psql -U mobileparts_user -d mobileparts -h localhost
```

**Issue: Port 8080 already in use**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process (replace PID)
kill -9 <PID>

# Or change port in application.yml
server:
  port: 8081
```

**Issue: Maven build fails**
```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Rebuild
./mvnw clean install -U
```

### Frontend Issues

**Issue: Node modules issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Port 4200 already in use**
```bash
# Run on different port
ng serve --port 4201

# Or kill process on port 4200
lsof -i :4200
kill -9 <PID>
```

**Issue: GraphQL connection error**
- Verify backend is running on `http://localhost:8080`
- Check CORS settings in `application.yml`
- Verify `graphqlUrl` in `environment.ts`

## 📚 Next Steps

1. **Explore GraphQL API**
   - Open GraphQL Playground at `http://localhost:8080/graphiql`
   - Try sample queries from `/docs/graphql-examples.md`

2. **Implement Missing Components**
   - Follow `/IMPLEMENTATION_GUIDE.md` for detailed instructions
   - Start with service layer, then resolvers, then frontend components

3. **Set up Azure Services** (for production)
   - Create Azure SQL Database / PostgreSQL
   - Set up Azure AD B2C
   - Configure Blob Storage
   - Set up Azure OpenAI Service
   - Configure Key Vault

4. **Run Tests**
   - Write unit tests for services
   - Write integration tests for resolvers
   - Write e2e tests for critical user flows

5. **Deploy to Azure**
   - Follow `/docs/DEPLOYMENT.md` (to be created)
   - Use Terraform or ARM templates in `/infrastructure`

## 🆘 Getting Help

- **Documentation**: Check `/docs` directory
- **Implementation Guide**: See `/IMPLEMENTATION_GUIDE.md`
- **GraphQL Schema**: See `/backend/src/main/resources/graphql/schema.graphqls`
- **Issues**: Create an issue in the repository

## 🔐 Security Notes for Local Development

For local development without Azure AD B2C:

1. **Option 1**: Implement simple JWT-based authentication
2. **Option 2**: Use Spring Security with in-memory authentication
3. **Option 3**: Temporarily disable security for development

**Example: Disable security temporarily (development only)**

Create `SecurityConfig.java`:
```java
@Configuration
@EnableWebSecurity
@Profile("local")
public class LocalSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
}
```

## ⚡ Performance Tips

1. **Enable caching** for frequently accessed data
2. **Use connection pooling** (already configured in application.yml)
3. **Implement pagination** for large result sets
4. **Use lazy loading** in JPA relationships
5. **Enable GraphQL query caching**
6. **Use CDN** for static assets in production

## 📊 Monitoring (Local Development)

Access Spring Boot Actuator endpoints:

- Health: `http://localhost:8080/actuator/health`
- Metrics: `http://localhost:8080/actuator/metrics`
- Info: `http://localhost:8080/actuator/info`

---

**Happy Coding! 🚀**

For more detailed information, refer to the comprehensive guides in the `/docs` directory.
