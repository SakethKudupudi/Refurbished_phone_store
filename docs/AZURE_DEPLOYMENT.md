# Azure App Service Deployment Guide

## 🚀 Deploy Spring Boot Backend to Azure App Service

### Prerequisites
1. Azure account with active subscription (Student account with $100 credit)
2. Azure CLI installed: `brew install azure-cli` (macOS)
3. Maven installed: `brew install maven`

### Step 1: Login to Azure
```bash
az login
az account set --subscription "YOUR_SUBSCRIPTION_ID"
```

### Step 2: Create Resource Group
```bash
az group create \
  --name rg-mobileparts \
  --location eastus
```

### Step 3: Create App Service Plan
```bash
# Free tier (F1) - Perfect for development
az appservice plan create \
  --name plan-mobileparts \
  --resource-group rg-mobileparts \
  --sku F1 \
  --is-linux

# OR Basic tier (B1) - Better performance, ~$13/month
az appservice plan create \
  --name plan-mobileparts \
  --resource-group rg-mobileparts \
  --sku B1 \
  --is-linux
```

### Step 4: Create Web App for Backend
```bash
az webapp create \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --plan plan-mobileparts \
  --runtime "JAVA:17-java17"
```

### Step 5: Configure App Settings
```bash
# Set Spring profile
az webapp config appsettings set \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --settings SPRING_PROFILES_ACTIVE=h2

# Optional: Add Azure SQL connection (when ready)
az webapp config appsettings set \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --settings \
    AZURE_SQL_SERVER="your-server.database.windows.net" \
    AZURE_SQL_DATABASE="mobileparts-db" \
    AZURE_SQL_USERNAME="sqladmin" \
    AZURE_SQL_PASSWORD="YourSecurePassword123!"
```

### Step 6: Build Backend JAR
```bash
cd backend
mvn clean package -DskipTests
```

### Step 7: Deploy to Azure
```bash
az webapp deploy \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --src-path target/mobileparts-0.0.1-SNAPSHOT.jar \
  --type jar
```

### Step 8: Verify Deployment
```bash
# Get app URL
az webapp show \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --query defaultHostName -o tsv

# Visit: https://mobileparts-api.azurewebsites.net
# Check health: https://mobileparts-api.azurewebsites.net/actuator/health
# GraphQL: https://mobileparts-api.azurewebsites.net/graphql
```

---

## 🌐 Deploy Angular Frontend to Azure Static Web Apps

### Step 1: Build Frontend
```bash
cd frontend
npm run build -- --configuration production
```

### Step 2: Create Static Web App
```bash
az staticwebapp create \
  --name mobileparts-web \
  --resource-group rg-mobileparts \
  --source ./dist/frontend/browser \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location "dist/frontend/browser"
```

### Step 3: Deploy (Automated via GitHub Actions)
Azure Static Web Apps auto-deploys from GitHub when you push to main branch.

Manual upload:
```bash
cd frontend
npm run build -- --configuration production

# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy \
  --app-location dist/frontend/browser \
  --resource-group rg-mobileparts \
  --app-name mobileparts-web
```

---

## 🔧 Environment Variables Setup

### Backend (.env or Azure App Settings)
```properties
SPRING_PROFILES_ACTIVE=h2
FIREBASE_PROJECT_ID=mobileparts-store
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=mobileparts-db
AZURE_SQL_USERNAME=sqladmin
AZURE_SQL_PASSWORD=YourSecurePassword123!
```

### Frontend (environment.prod.ts)
Already configured! Just update Firebase credentials.

---

## 💰 Cost Estimate (Azure for Students)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| App Service (Backend) | F1 Free | $0 |
| Static Web App (Frontend) | Free | $0 |
| Azure SQL (Serverless) | Basic | ~$5 |
| Blob Storage | Standard | ~$1 |
| **TOTAL** | | **~$6/month** |

**With $100 student credit = 16+ months FREE!**

---

## 🎯 Quick Commands Summary

```bash
# Login
az login

# Create everything at once
az group create --name rg-mobileparts --location eastus

az appservice plan create \
  --name plan-mobileparts \
  --resource-group rg-mobileparts \
  --sku F1 --is-linux

az webapp create \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --plan plan-mobileparts \
  --runtime "JAVA:17-java17"

# Build & Deploy Backend
cd backend
mvn clean package -DskipTests
az webapp deploy \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --src-path target/*.jar --type jar

# Build & Deploy Frontend
cd frontend
npm run build -- --configuration production
az staticwebapp create \
  --name mobileparts-web \
  --resource-group rg-mobileparts \
  --source ./dist/frontend/browser \
  --location "East US 2"
```

---

## 🔍 Troubleshooting

### Backend not starting?
```bash
# Check logs
az webapp log tail --name mobileparts-api --resource-group rg-mobileparts

# Check app settings
az webapp config appsettings list \
  --name mobileparts-api \
  --resource-group rg-mobileparts
```

### Frontend not loading?
```bash
# Check deployment status
az staticwebapp show \
  --name mobileparts-web \
  --resource-group rg-mobileparts
```

### CORS errors?
Add to Spring Boot `SecurityConfig.java`:
```java
@Bean
public CorsFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("https://mobileparts-web.azurestaticapps.net");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    // ... rest of config
}
```

---

## ✅ Next Steps

1. [ ] Complete Firebase setup (see FIREBASE_SETUP.md)
2. [ ] Deploy backend to Azure App Service
3. [ ] Deploy frontend to Azure Static Web Apps
4. [ ] Update environment.prod.ts with Azure URLs
5. [ ] Test authentication flow
6. [ ] Set up Azure SQL (when ready)

