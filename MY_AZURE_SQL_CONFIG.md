# Your Azure SQL Configuration - Quick Reference

## 📋 Your Settings

```
Resource Group:    rg-mobileparts-student
SQL Server:        rg-mobileparts-dev
Database:          db-mobileparts
Admin User:        sql_admin
Password:          Saketh117
```

## 🔗 Full Connection Details

**Server FQDN:** `rg-mobileparts-dev.database.windows.net`  
**Port:** `1433`  
**Database:** `db-mobileparts`  
**Username:** `sql_admin`  
**Password:** `Saketh117`

## 🚀 Quick Start Commands

### Option 1: Set Environment Variables & Run
```bash
# Set variables
export AZURE_SQL_SERVER="rg-mobileparts-dev.database.windows.net"
export AZURE_SQL_DATABASE="db-mobileparts"
export AZURE_SQL_USERNAME="sql_admin"
export AZURE_SQL_PASSWORD="Saketh117"
export SPRING_PROFILES_ACTIVE="sqlserver"

# Start backend
cd backend
mvn spring-boot:run
```

### Option 2: Use Setup Script (Easiest!)
```bash
# From project root
source setup-azure-sql.sh
cd backend
mvn spring-boot:run
```

### Option 3: Maven with Inline Properties
```bash
cd backend
mvn spring-boot:run \
  -Dspring-boot.run.profiles=sqlserver \
  -Dspring-boot.run.arguments="--AZURE_SQL_SERVER=rg-mobileparts-dev.database.windows.net --AZURE_SQL_DATABASE=db-mobileparts --AZURE_SQL_USERNAME=sql_admin --AZURE_SQL_PASSWORD=Saketh117"
```

## 🔧 JDBC Connection String

```
jdbc:sqlserver://rg-mobileparts-dev.database.windows.net:1433;database=db-mobileparts;user=sql_admin;password=Saketh117;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
```

## ✅ Verify Connection

### Test with Azure CLI
```bash
az sql db show \
  --resource-group rg-mobileparts-student \
  --server rg-mobileparts-dev \
  --name db-mobileparts
```

### Test Connection from Application
```bash
# Start backend and check logs
cd backend
mvn spring-boot:run

# Look for these success messages:
# ✅ Flyway migration completed successfully
# ✅ Started MobilePartsApplication
```

### Test API Endpoints
```bash
# Once backend is running
curl http://localhost:8080/actuator/health
curl http://localhost:8080/api/brands
```

## 🔥 Firewall Configuration

Make sure your IP is allowed in Azure SQL firewall:

```bash
# Get your current IP
curl ifconfig.me

# Add firewall rule
az sql server firewall-rule create \
  --resource-group rg-mobileparts-student \
  --server rg-mobileparts-dev \
  --name AllowMyIP \
  --start-ip-address YOUR_IP_HERE \
  --end-ip-address YOUR_IP_HERE
```

## 📝 Application Configuration Files

### backend/src/main/resources/application-sqlserver.yml
Already updated with your settings! ✅

### backend/.env.example
Template created with your configuration! ✅

## 🐛 Troubleshooting

### Error: "Cannot open server"
**Solution:** Add your IP to firewall rules (see above)

### Error: "Login failed for user"
**Solution:** Verify username is `sql_admin` (without @ or server name)

### Error: "Database does not exist"
**Solution:** Verify database name is exactly `db-mobileparts`

### Error: "SSL/TLS connection"
**Solution:** Connection string already includes SSL settings ✅

## 🎯 Next Steps

1. ✅ Configuration files updated
2. ⏭️ Ensure Azure SQL database is created in Azure Portal
3. ⏭️ Add your IP to firewall rules
4. ⏭️ Run setup script: `source setup-azure-sql.sh`
5. ⏭️ Start backend: `cd backend && mvn spring-boot:run`
6. ⏭️ Verify connection: `curl http://localhost:8080/actuator/health`

## 💡 Tips

- **Security:** Never commit passwords to Git! The `.env` file is already in `.gitignore`
- **Testing:** Use `application.yml` (default) for local PostgreSQL, `application-sqlserver.yml` for Azure
- **Cost:** Monitor your Azure student credits in the Azure Portal
- **Backup:** Azure SQL Basic tier includes automatic backups (7 days retention)

---

**All set!** 🎉 Your configuration is ready to use.
