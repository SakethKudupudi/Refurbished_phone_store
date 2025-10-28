# Azure SQL Database Setup Guide (Azure Student Account)

## Overview
This guide will help you set up a **FREE Azure SQL Database** using your Azure Student subscription and connect it to your Spring Boot application.

## 🎓 Azure Student Benefits
Your Azure Student account includes:
- **$100 USD credit** for 12 months
- **12 months FREE** of popular services
- **Always FREE** services (up to usage limits)

## 📋 Prerequisites
- Azure Student account (already activated)
- Azure CLI installed (or use Azure Portal)
- Your Spring Boot application (already configured)

---

## Step 1: Create Azure SQL Database (Free/Low-Cost Option)

### Option A: Using Azure Portal (Recommended for Beginners)

#### 1.1 Login to Azure Portal
1. Go to [https://portal.azure.com](https://portal.azure.com)
2. Sign in with your student account

#### 1.2 Create SQL Database
1. Click **"Create a resource"**
2. Search for **"SQL Database"**
3. Click **"Create"**

#### 1.3 Configure Basic Settings
- **Subscription**: Azure for Students
- **Resource Group**: Create new → `mobile-parts-rg`
- **Database Name**: `mobileparts-db`
- **Server**: Click **"Create new"**
  - **Server name**: `mobileparts-server-[yourname]` (must be globally unique)
  - **Location**: Choose nearest region (e.g., `East US`, `West Europe`)
  - **Authentication method**: **SQL authentication**
  - **Server admin login**: `sqladmin`
  - **Password**: Create a strong password (save it!)
  - Click **OK**

#### 1.4 Configure Compute + Storage (FREE/CHEAP OPTION)
1. Click **"Configure database"**
2. Select **"Basic"** tier (Most affordable option)
   - **vCores**: N/A (DTU model)
   - **Storage**: 2 GB (up to 2 GB included)
   - **Cost**: ~$4.99/month (covered by student credits)
   
   **OR** for completely FREE during trial:
3. Select **"Serverless"** tier
   - **Compute tier**: Serverless
   - **vCores**: 0.5 (minimum)
   - **Storage**: 1 GB
   - **Auto-pause**: Enabled (after 1 hour of inactivity)
   - **Cost**: Pay only when active (~$0.52/vCore-hour) + Storage costs
   - This can be essentially FREE with auto-pause enabled!

#### 1.5 Configure Network Settings
1. **Connectivity method**: Public endpoint
2. **Firewall rules**:
   - ✅ **Allow Azure services and resources to access this server**: YES
   - ✅ **Add current client IP address**: YES
3. Click **Next**

#### 1.6 Additional Settings
- **Use existing data**: None
- **Collation**: Default
- Click **Review + Create**
- Click **Create**

⏰ **Wait 5-10 minutes** for deployment to complete.

---

### Option B: Using Azure CLI (Faster)

```bash
# Login to Azure
az login

# Set variables
RESOURCE_GROUP="mobile-parts-rg"
LOCATION="eastus"
SERVER_NAME="mobileparts-server-$(whoami)"
DB_NAME="mobileparts-db"
ADMIN_USER="sqladmin"
ADMIN_PASSWORD="YourStrongPassword123!"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create SQL Server
az sql server create \
  --name $SERVER_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --admin-user $ADMIN_USER \
  --admin-password $ADMIN_PASSWORD

# Create SQL Database (Basic tier - most affordable)
az sql db create \
  --resource-group $RESOURCE_GROUP \
  --server $SERVER_NAME \
  --name $DB_NAME \
  --service-objective Basic \
  --backup-storage-redundancy Local

# Allow Azure services to access server
az sql server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --server $SERVER_NAME \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Allow your current IP
MY_IP=$(curl -s ifconfig.me)
az sql server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --server $SERVER_NAME \
  --name AllowMyIP \
  --start-ip-address $MY_IP \
  --end-ip-address $MY_IP

echo "✅ Database created successfully!"
echo "Server: $SERVER_NAME.database.windows.net"
echo "Database: $DB_NAME"
echo "Username: $ADMIN_USER"
```

---

## Step 2: Get Connection Details

### 2.1 Find Connection String
1. Go to your SQL Database in Azure Portal
2. Click **"Connection strings"** in left menu
3. Copy the **JDBC** connection string

It will look like:
```
jdbc:sqlserver://mobileparts-server-yourname.database.windows.net:1433;database=mobileparts-db;user=sqladmin@mobileparts-server-yourname;password={your_password_here};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
```

### 2.2 Extract Information
From the connection string, note:
- **Server**: `mobileparts-server-yourname.database.windows.net`
- **Database**: `mobileparts-db`
- **Username**: `sqladmin`
- **Password**: Your chosen password
- **Port**: `1433`

---

## Step 3: Configure Your Spring Boot Application

### 3.1 Update application.yml

The file `backend/src/main/resources/application-sqlserver.yml` is already created. Just update it:

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://YOUR-SERVER-NAME.database.windows.net:1433;database=YOUR-DATABASE-NAME;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
    username: YOUR-ADMIN-USERNAME
    password: YOUR-PASSWORD
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
    hikari:
      maximum-pool-size: 5
      minimum-idle: 2
      connection-timeout: 30000

  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.SQLServerDialect
        format_sql: true

  flyway:
    enabled: true
    baseline-on-migrate: true
    locations: classpath:db/migration
```

### 3.2 Set Environment Variables (Recommended for Security)

**macOS/Linux**:
```bash
export AZURE_SQL_SERVER="mobileparts-server-yourname.database.windows.net"
export AZURE_SQL_DATABASE="mobileparts-db"
export AZURE_SQL_USERNAME="sqladmin"
export AZURE_SQL_PASSWORD="YourStrongPassword123!"
export SPRING_PROFILES_ACTIVE="sqlserver"
```

**Windows PowerShell**:
```powershell
$env:AZURE_SQL_SERVER="mobileparts-server-yourname.database.windows.net"
$env:AZURE_SQL_DATABASE="mobileparts-db"
$env:AZURE_SQL_USERNAME="sqladmin"
$env:AZURE_SQL_PASSWORD="YourStrongPassword123!"
$env:SPRING_PROFILES_ACTIVE="sqlserver"
```

### 3.3 Alternative: Use application-sqlserver.yml directly

Edit `backend/src/main/resources/application-sqlserver.yml`:

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://mobileparts-server-yourname.database.windows.net:1433;database=mobileparts-db;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
    username: sqladmin
    password: YourStrongPassword123!
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
```

⚠️ **Never commit passwords to Git!** Add to `.gitignore`:
```
application-sqlserver.yml
application-local.yml
*.env
```

---

## Step 4: Run Database Migrations

### 4.1 Start Application with SQL Server Profile

```bash
cd backend

# Option 1: Using Maven with environment variables
export SPRING_PROFILES_ACTIVE=sqlserver
mvn spring-boot:run

# Option 2: Using Maven with inline profile
mvn spring-boot:run -Dspring-boot.run.profiles=sqlserver

# Option 3: Using JAR
java -jar target/mobile-parts-backend.jar --spring.profiles.active=sqlserver
```

### 4.2 Verify Connection

Check the logs for:
```
✅ Successfully acquired change log lock
✅ Flyway migration completed successfully
✅ Started MobilePartsApplication in X.XXX seconds
```

If you see errors about database connection, check:
1. Firewall rules in Azure Portal
2. Connection string is correct
3. Username/password are correct
4. Server name ends with `.database.windows.net`

---

## Step 5: Test the Connection

### 5.1 Access GraphiQL
Open: [http://localhost:8080/graphiql](http://localhost:8080/graphiql)

Try this query:
```graphql
{
  brands {
    id
    name
    category
  }
}
```

### 5.2 Test REST API
```bash
curl http://localhost:8080/api/brands
```

### 5.3 Check Actuator Health
```bash
curl http://localhost:8080/actuator/health
```

Should return:
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "Microsoft SQL Server"
      }
    }
  }
}
```

---

## 💰 Cost Management Tips

### 1. Use Serverless Tier with Auto-Pause
- **Auto-pause after 1 hour** of inactivity
- Pay only when database is active
- **Saves ~90% costs** for development

### 2. Monitor Your Spending
```bash
# Check current usage
az consumption usage list --query "[].{Name:name.value, Cost:cost}" -o table
```

### 3. Set Up Budget Alerts
1. Go to Azure Portal → **Cost Management + Billing**
2. Click **Budgets**
3. Create alert at **$50** (half your credit)

### 4. Delete Resources When Not Needed
```bash
# Stop development? Delete everything:
az group delete --name mobile-parts-rg --yes --no-wait
```

### 5. Use Basic Tier for Development
- **Basic tier**: $4.99/month (2 GB storage)
- **Covered by student credits** ($100/year)
- Perfect for development and learning

---

## 🔒 Security Best Practices

### 1. Never Commit Credentials
Add to `.gitignore`:
```gitignore
# Sensitive configuration
application-sqlserver.yml
application-local.yml
.env
*.env

# Logs
logs/
*.log
```

### 2. Use Environment Variables
```bash
# Create a .env file (add to .gitignore!)
echo "AZURE_SQL_SERVER=your-server.database.windows.net" > backend/.env
echo "AZURE_SQL_DATABASE=mobileparts-db" >> backend/.env
echo "AZURE_SQL_USERNAME=sqladmin" >> backend/.env
echo "AZURE_SQL_PASSWORD=YourPassword" >> backend/.env
```

### 3. Restrict IP Access
Only allow your IP in Azure SQL firewall rules:
```bash
az sql server firewall-rule create \
  --resource-group mobile-parts-rg \
  --server mobileparts-server-yourname \
  --name MyHomeIP \
  --start-ip-address YOUR.IP.ADDRESS \
  --end-ip-address YOUR.IP.ADDRESS
```

### 4. Use Azure Active Directory (Optional)
For production, consider Azure AD authentication instead of SQL auth.

---

## 🐛 Troubleshooting

### Issue 1: "Cannot open server"
**Solution**: Add your IP to firewall rules
```bash
az sql server firewall-rule create \
  --resource-group mobile-parts-rg \
  --server YOUR-SERVER-NAME \
  --name AllowMyIP \
  --start-ip-address $(curl -s ifconfig.me) \
  --end-ip-address $(curl -s ifconfig.me)
```

### Issue 2: "Login failed for user"
**Solution**: Check username format
- ✅ Correct: `sqladmin` (when using connection string)
- ❌ Wrong: `sqladmin@servername`

### Issue 3: "Database does not exist"
**Solution**: Verify database name in Azure Portal and connection string

### Issue 4: SSL/TLS errors
**Solution**: Use this connection string format:
```
jdbc:sqlserver://SERVER.database.windows.net:1433;database=DB_NAME;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net
```

### Issue 5: Flyway migration fails
**Solution**: Check if tables already exist
```sql
-- Connect using Azure Data Studio or SSMS
SELECT * FROM INFORMATION_SCHEMA.TABLES;

-- Drop all tables if needed (CAREFUL!)
-- Then restart application
```

---

## 📊 Monitoring Your Database

### View Database Metrics in Azure Portal
1. Go to your SQL Database
2. Click **"Metrics"** in left menu
3. Monitor:
   - DTU/vCore usage
   - Storage usage
   - Connection count
   - Failed connections

### Query Performance Insights
1. Go to **"Query Performance Insight"**
2. View slowest queries
3. Optimize as needed

---

## 🚀 Next Steps

1. ✅ Database created on Azure
2. ✅ Application connected
3. ✅ Migrations applied
4. ⏭️ Start Angular frontend
5. ⏭️ Test end-to-end flow
6. ⏭️ Deploy application to Azure App Service (optional)

---

## 📚 Additional Resources

- [Azure SQL Documentation](https://docs.microsoft.com/azure/sql-database/)
- [Azure for Students](https://azure.microsoft.com/free/students/)
- [Spring Boot + Azure SQL](https://spring.io/guides/gs/accessing-data-jpa/)
- [Flyway Documentation](https://flywaydb.org/documentation/)

---

## 💡 Quick Command Reference

```bash
# Check Azure CLI version
az --version

# Login to Azure
az login

# List all resource groups
az group list -o table

# List all SQL servers
az sql server list -o table

# List all databases on a server
az sql db list --resource-group mobile-parts-rg --server YOUR-SERVER -o table

# Show database details
az sql db show --resource-group mobile-parts-rg --server YOUR-SERVER --name mobileparts-db

# Test connection from command line
sqlcmd -S YOUR-SERVER.database.windows.net -d mobileparts-db -U sqladmin -P 'YourPassword'

# Run Spring Boot with Azure SQL profile
cd backend
export SPRING_PROFILES_ACTIVE=sqlserver
mvn spring-boot:run
```

---

## ✅ Checklist

- [ ] Azure SQL Database created (Basic or Serverless tier)
- [ ] Firewall rules configured (Azure services + Your IP)
- [ ] Connection string copied
- [ ] application-sqlserver.yml configured
- [ ] Environment variables set (optional but recommended)
- [ ] Application started with `sqlserver` profile
- [ ] Flyway migrations successful
- [ ] API endpoints working (test with curl/browser)
- [ ] Frontend can connect to backend
- [ ] Budget alerts configured

---

**🎉 You're all set! Your application is now connected to Azure SQL Database using your free Azure Student account.**

Need help? Check the troubleshooting section above or feel free to ask questions!
