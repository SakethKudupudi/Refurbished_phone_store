# Azure SQL Server Setup Guide

This guide shows how to connect the Spring Boot backend to an Azure SQL Server database.

## Prerequisites

1. Azure SQL Server instance created
2. Database created on the server
3. Firewall rules configured to allow your IP and Azure services
4. SQL authentication enabled (or Azure AD authentication configured)

## Backend Configuration

The backend includes a `sqlserver` Spring profile (`application-sqlserver.yml`) that configures the Microsoft SQL Server JDBC driver and Hibernate dialect.

### Required Environment Variables

Before starting the backend, set these environment variables:

```bash
export AZURE_SQL_SERVER="your-server.database.windows.net"
export AZURE_SQL_DATABASE="mobileparts"
export AZURE_SQL_USERNAME="appuser@your-server"
export AZURE_SQL_PASSWORD="YourSecurePassword123!"
```

Or use a `.env` file (not committed to git):

```bash
# .env file (backend/.env)
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=mobileparts
AZURE_SQL_USERNAME=appuser@your-server
AZURE_SQL_PASSWORD=YourSecurePassword123!
```

### Start the Backend with SQL Server Profile

```bash
cd backend

# Option 1: Using Maven with environment variables
export SPRING_PROFILES_ACTIVE=sqlserver
mvn spring-boot:run

# Option 2: Using Maven with inline properties
mvn spring-boot:run -Dspring-boot.run.profiles=sqlserver

# Option 3: Build and run JAR
mvn clean package -DskipTests
java -jar target/mobile-parts-backend.jar --spring.profiles.active=sqlserver
```

### Connection String Format

The JDBC URL format for Azure SQL Server:

```
jdbc:sqlserver://<server>.database.windows.net:1433;
  database=<database>;
  encrypt=true;
  trustServerCertificate=false;
  hostNameInCertificate=*.database.windows.net;
  loginTimeout=30;
```

### Database Initialization

Flyway migrations will run automatically on startup. Ensure your SQL Server database has the following:

1. Empty database (Flyway will create tables)
2. Or existing schema matching the migrations in `src/main/resources/db/migration/`

To check Flyway status:

```bash
mvn flyway:info -Dspring.profiles.active=sqlserver
```

To manually run migrations:

```bash
mvn flyway:migrate -Dspring.profiles.active=sqlserver
```

## Frontend Configuration

The Angular frontend is already configured to proxy API calls to the backend.

### Start the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will be available at http://localhost:4200 and will proxy API calls to the backend at http://localhost:8080.

### Proxy Configuration

The `proxy.conf.json` file is already configured to forward:
- `/graphql` → backend GraphQL endpoint
- `/api` → backend REST API
- `/actuator` → backend health/metrics

## CORS Configuration

The backend `WebConfig` class enables CORS for:
- http://localhost:4200 (local Angular dev server)
- https://mobileparts-frontend.azurewebsites.net (production)

## Testing the Connection

1. Start the backend with the sqlserver profile
2. Check the logs for successful HikariCP connection initialization:
   ```
   HikariPool-1 - Starting...
   HikariPool-1 - Start completed.
   ```

3. Check the health endpoint:
   ```bash
   curl http://localhost:8080/actuator/health
   ```

4. Start the frontend and verify it can reach the backend:
   ```bash
   curl http://localhost:4200/api/health  # via proxy
   ```

## Troubleshooting

### Connection Refused
- Verify firewall rules in Azure SQL Server allow your IP
- Check the server name and port (1433)

### Login Failed
- Verify username format: `username@servername` for SQL auth
- Check password is correct
- Ensure SQL authentication is enabled on the server

### SSL/TLS Errors
- The connection string uses `encrypt=true` for security
- If using self-signed certs in dev, you can set `trustServerCertificate=true` (not recommended for production)

### Flyway Migration Errors
- Check existing schema matches expected state
- Use `mvn flyway:repair` to fix metadata issues
- Use `mvn flyway:baseline` for existing databases

## Production Deployment

For production on Azure, use:

1. **Managed Identity** - Avoid storing passwords
   ```yaml
   spring:
     datasource:
       azure:
         credential:
           managed-identity-enabled: true
   ```

2. **Key Vault** - Store connection secrets
   ```bash
   az keyvault secret set --vault-name mobileparts-kv \
     --name AZURE-SQL-PASSWORD --value "YourPassword"
   ```

3. **Connection Pooling** - Tune HikariCP for production load
   ```yaml
   spring:
     datasource:
       hikari:
         maximum-pool-size: 20
         minimum-idle: 10
   ```

## References

- [Azure SQL Database Documentation](https://docs.microsoft.com/azure/azure-sql/)
- [Spring Boot with SQL Server](https://spring.io/guides/gs/accessing-data-jpa/)
- [Flyway Documentation](https://flywaydb.org/documentation/)
