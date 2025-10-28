# Supabase Setup Guide for Mobile Parts E-Commerce

## 🚀 Quick Start with Supabase

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: `mobile-parts-ecommerce`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is perfect for development

### 2. Get Your Database Credentials

Once your project is created:

1. Go to **Project Settings** → **Database**
2. Find the **Connection string** section
3. Copy the **Connection pooling** URI (looks like):
   ```
   postgresql://postgres.xxxxxxxxxxxx:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres
   ```

### 3. Configure Your Application

#### Option A: Using Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
# Supabase Database Configuration
SUPABASE_DB_HOST=aws-0-us-west-1.pooler.supabase.com
SUPABASE_DB_PORT=5432
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres.xxxxxxxxxxxx
SUPABASE_DB_PASSWORD=your_database_password_here
```

Update `application-supabase.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://${SUPABASE_DB_HOST}:${SUPABASE_DB_PORT}/${SUPABASE_DB_NAME}
    username: ${SUPABASE_DB_USER}
    password: ${SUPABASE_DB_PASSWORD}
```

#### Option B: Direct Configuration

Edit `backend/src/main/resources/application-supabase.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:5432/postgres
    username: postgres.xxxxxxxxxxxx
    password: YOUR_PASSWORD_HERE
```

### 4. Update Default Profile

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  profiles:
    active: supabase  # Changed from 'sqlite' to 'supabase'
```

### 5. Build and Run

```bash
cd backend
mvn clean package -DskipTests
java -jar target/mobile-parts-backend.jar
```

Or with Maven:
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=supabase
```

## 🗃️ Database Features

### Automatic Schema Creation

When you first run the application, Hibernate will:
- Create all tables (users, brands, models, components, orders, etc.)
- Set up foreign key relationships
- Create indexes for performance

### Flyway Migrations

The application uses Flyway for versioned database migrations:
- **Location**: `backend/src/main/resources/db/migration/`
- **Naming**: `V1__description.sql`, `V2__description.sql`, etc.
- **Automatic**: Runs on application startup

### Seed Data

To populate initial data, enable in `application-supabase.yml`:

```yaml
spring:
  sql:
    init:
      mode: always
      data-locations: classpath:data-supabase.sql
```

## 🔐 Supabase Auth Integration (Optional)

If you want to use Supabase Authentication instead of Firebase:

1. **Enable Auth in Supabase**:
   - Go to **Authentication** in Supabase dashboard
   - Configure providers (Email, Google, etc.)

2. **Get API Keys**:
   - **Project Settings** → **API**
   - Copy `anon` public key and `service_role` secret key

3. **Add Supabase Client Dependency**:
```xml
<dependency>
    <groupId>io.supabase</groupId>
    <artifactId>supabase-kt</artifactId>
    <version>1.3.2</version>
</dependency>
```

## 📊 Supabase Dashboard Features

### Table Editor
- **Visual Interface**: Edit data directly in browser
- **SQL Editor**: Run custom queries
- **Table View**: See all your data

### Real-time Subscriptions
- Listen to database changes
- Perfect for live updates in your Angular frontend

### Storage
- Store product images
- Get CDN URLs automatically

### API Auto-generation
- REST API automatically created
- GraphQL support available

## 🔍 Monitoring

### Logs
- **Supabase Dashboard** → **Logs**
- View database queries, errors, and performance

### Performance
- **Database** → **Metrics**
- Monitor connections, queries, and load

## 🚢 Production Deployment

### Environment Variables

Set these in your deployment platform:

```env
SPRING_PROFILES_ACTIVE=supabase
SUPABASE_DB_HOST=your-project.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your_secure_password
```

### Connection Pooling

Supabase provides connection pooling by default:
- **Session Mode**: For long-lived connections
- **Transaction Mode**: For serverless/short connections
- **Statement Mode**: For simple queries

Use **Transaction Mode** for most applications:
```
postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:6543/postgres
```

## 🆚 Supabase vs SQLite

| Feature | Supabase (PostgreSQL) | SQLite |
|---------|----------------------|--------|
| Production Ready | ✅ Yes | ❌ No |
| Concurrent Users | ✅ Unlimited | ⚠️ Limited |
| Cloud Hosted | ✅ Yes | ❌ No |
| Backup/Restore | ✅ Automatic | ⚠️ Manual |
| Full-text Search | ✅ Built-in | ⚠️ Limited |
| JSON Support | ✅ Native JSONB | ⚠️ Basic |
| Scalability | ✅ Excellent | ❌ Not scalable |
| Cost | ✅ Free tier available | ✅ Free |

## 📝 Sample Queries

### Check Connection
```sql
SELECT version();
```

### View All Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Count Records
```sql
SELECT 
    'brands' as table_name, COUNT(*) as count FROM brands
UNION ALL
SELECT 'models', COUNT(*) FROM models
UNION ALL
SELECT 'components', COUNT(*) FROM components;
```

## 🐛 Troubleshooting

### Connection Issues
- Verify database password
- Check if IP is allowlisted (Supabase allows all by default)
- Ensure using connection pooler URL

### Migration Errors
- Check Flyway migration files
- Verify baseline version
- Review Supabase logs

### Performance Issues
- Add indexes to frequently queried columns
- Use connection pooling
- Enable query logging

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Spring Boot + PostgreSQL](https://spring.io/guides/gs/accessing-data-jpa/)
- [Flyway Migrations](https://flywaydb.org/documentation/)

---

**Next Steps**: 
1. Create Supabase project
2. Configure credentials in `application-supabase.yml`
3. Run the application
4. Access Supabase dashboard to view your data!
