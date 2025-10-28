# 🔄 Migration from SQLite to Supabase (PostgreSQL)

## Why Supabase?

✅ **Production-ready** PostgreSQL database
✅ **Free tier** with 500MB database
✅ **Real-time subscriptions** for live updates
✅ **Built-in authentication** (alternative to Firebase)
✅ **Auto-generated REST API**
✅ **Dashboard for data management**
✅ **Automatic backups**
✅ **Better Hibernate compatibility** (no foreign key constraint issues)

## 📋 Setup Steps

### 1. Create Supabase Project (5 minutes)

1. Visit [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Enter:
   - **Organization**: Create or select existing
   - **Project Name**: `mobile-parts-ecommerce`
   - **Database Password**: Generate strong password (**SAVE THIS!**)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free (500MB database, 50k monthly active users)

5. Wait 2-3 minutes for project provisioning

### 2. Get Database Credentials

1. In your Supabase project dashboard, go to:
   **Settings** (gear icon) → **Database**

2. Scroll to **Connection string** section

3. Select **Connection pooling** tab (recommended for applications)

4. Copy the URI - it looks like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

5. **Important**: Replace `[YOUR-PASSWORD]` with your actual database password

### 3. Configure Your Application

**Option A: Environment Variables (Recommended for Security)**

Create `.env` file in `backend/` directory:

```env
# Supabase Configuration
SUPABASE_DB_URL=jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres
SUPABASE_DB_USERNAME=postgres.your-project-ref
SUPABASE_DB_PASSWORD=your_database_password_here
```

Update `application-supabase.yml`:
```yaml
spring:
  datasource:
    url: ${SUPABASE_DB_URL}
    username: ${SUPABASE_DB_USERNAME}
    password: ${SUPABASE_DB_PASSWORD}
```

**Option B: Direct Configuration (Quick Start)**

Edit `backend/src/main/resources/application-supabase.yml`:

```yaml
spring:
  datasource:
    # Replace with your Supabase credentials
    url: jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres
    username: postgres.your-project-ref
    password: your_database_password_here
```

### 4. Build & Run

```bash
# Navigate to backend
cd backend

# Clean build
mvn clean package -DskipTests

# Run with Supabase profile
java -jar target/mobile-parts-backend.jar

# Or use Maven directly
mvn spring-boot:run -Dspring-boot.run.profiles=supabase
```

### 5. Verify Setup

Check your terminal output for:
```
✅ Tomcat started on port 8080 (http)
✅ Started MobilePartsApplication in X.XXX seconds
✅ Initialized JPA EntityManagerFactory for persistence unit 'default'
```

Visit Supabase Dashboard:
- **Table Editor** → You should see all tables created
- **SQL Editor** → Run: `SELECT COUNT(*) FROM brands;`

## 🎯 What Happens on First Run

1. **Hibernate Auto-DDL**: Creates all tables automatically
   - users, user_roles
   - brands, models, components
   - orders, order_items

2. **Foreign Keys**: All relationships established correctly (unlike SQLite)

3. **Indexes**: Performance indexes created automatically

4. **Sequences**: PostgreSQL sequences for auto-increment IDs

## 📊 Loading Seed Data (Optional)

To populate with sample data, edit `application-supabase.yml`:

```yaml
spring:
  sql:
    init:
      mode: always
      data-locations: classpath:data-supabase.sql
  jpa:
    hibernate:
      ddl-auto: create  # Will drop and recreate tables
```

**⚠️ Warning**: `ddl-auto: create` will **delete all existing data** on restart!

For production, use:
```yaml
ddl-auto: validate  # Only validates schema, doesn't modify
```

## 🔧 Supabase Dashboard Features

### 1. Table Editor
- Browse and edit data visually
- Filter, sort, and search
- Export to CSV/JSON

### 2. SQL Editor
```sql
-- View all brands
SELECT * FROM brands;

-- Count components by type
SELECT type, COUNT(*) as count 
FROM components 
GROUP BY type;

-- Find expensive components
SELECT name, price 
FROM components 
WHERE price > 200 
ORDER BY price DESC;
```

### 3. Database → Metrics
- Monitor connection count
- Query performance
- Storage usage

### 4. API (Auto-generated)
Supabase creates REST endpoints automatically:
```
GET    https://your-project.supabase.co/rest/v1/brands
POST   https://your-project.supabase.co/rest/v1/brands
GET    https://your-project.supabase.co/rest/v1/models
```

## 🔐 Security Best Practices

### 1. Use Environment Variables
Never commit credentials to Git!

Add to `.gitignore`:
```
.env
application-supabase.yml
```

### 2. Row Level Security (RLS)
Enable in Supabase:
```sql
-- Enable RLS on brands table
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public brands are viewable by everyone" 
ON brands FOR SELECT 
USING (true);
```

### 3. API Keys
- **anon (public)**: For frontend calls
- **service_role (secret)**: For backend only (NEVER expose!)

## 🚀 Production Deployment

### Heroku Example

```bash
# Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=supabase
heroku config:set SUPABASE_DB_URL=jdbc:postgresql://...
heroku config:set SUPABASE_DB_USERNAME=postgres.xxx
heroku config:set SUPABASE_DB_PASSWORD=your_password

# Deploy
git push heroku main
```

### Docker Example

```dockerfile
FROM openjdk:21-jdk-slim
COPY target/mobile-parts-backend.jar app.jar
ENV SPRING_PROFILES_ACTIVE=supabase
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
docker build -t mobile-parts-backend .
docker run -p 8080:8080 \
  -e SUPABASE_DB_URL=jdbc:postgresql://... \
  -e SUPABASE_DB_USERNAME=postgres.xxx \
  -e SUPABASE_DB_PASSWORD=your_password \
  mobile-parts-backend
```

## 📈 Performance Tuning

### Connection Pooling
Already configured in `application-supabase.yml`:
```yaml
hikari:
  maximum-pool-size: 10
  minimum-idle: 2
  connection-timeout: 30000
```

### Indexes
Add for frequently queried columns:
```sql
CREATE INDEX idx_components_model ON components(model_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_order_items_component ON order_items(component_id);
```

## 🆚 Comparison: SQLite vs Supabase

| Feature | SQLite | Supabase |
|---------|--------|----------|
| Setup Time | ⚡ Instant | ⏱️ 5 minutes |
| Production Ready | ❌ No | ✅ Yes |
| Concurrent Users | ⚠️ Limited | ✅ Thousands |
| Cloud Hosted | ❌ No | ✅ Yes |
| Backup | ⚠️ Manual | ✅ Automatic (daily) |
| Dashboard | ❌ No | ✅ Full featured |
| Cost | ✅ Free | ✅ Free tier (500MB) |
| Scalability | ❌ Single file | ✅ Horizontal scaling |
| Foreign Keys | ⚠️ Dialect issues | ✅ Full support |

## 🐛 Troubleshooting

### Connection Refused
- Check firewall/network
- Verify connection string format
- Ensure using port 6543 (pooler) or 5432 (direct)

### Authentication Failed
- Double-check password
- Verify username format: `postgres.your-project-ref`
- Check Supabase project is active

### Tables Not Created
- Check Hibernate logs
- Verify `ddl-auto` setting
- Review `application-supabase.yml` configuration

### Slow Performance
- Enable connection pooling
- Add database indexes
- Use connection pooler (port 6543)

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase + Spring Boot Guide](https://supabase.com/docs/guides/integrations/spring)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)

## ✅ Success Checklist

- [ ] Supabase project created
- [ ] Database credentials obtained
- [ ] `application-supabase.yml` configured
- [ ] Application builds successfully
- [ ] Backend starts without errors
- [ ] Tables visible in Supabase dashboard
- [ ] Sample queries work
- [ ] Frontend connects to backend
- [ ] Environment variables secured

---

**Need Help?** Check the [Supabase Discord](https://discord.supabase.com) or [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)
