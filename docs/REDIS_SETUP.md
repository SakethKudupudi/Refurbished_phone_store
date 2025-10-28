# Redis Setup Guide

This application uses **Redis** for shopping cart storage and session management, providing fast performance and automatic expiration of cart data.

## 🎯 **Why Redis for Cart?**

✅ **Fast**: In-memory storage (sub-millisecond response)  
✅ **Scalable**: Handles high traffic easily  
✅ **Auto-expiring**: Carts automatically deleted after 24 hours  
✅ **Session-based**: Works for both guests and logged-in users  
✅ **Cloud-ready**: Easy Azure integration  

---

## 🏠 **Local Development Setup**

### **Option 1: Docker (Recommended)**

```bash
# Pull and run Redis
docker run --name redis-cart -p 6379:6379 -d redis:latest

# Verify it's running
docker ps

# Test connection
docker exec -it redis-cart redis-cli ping
# Should return: PONG
```

### **Option 2: Homebrew (macOS)**

```bash
# Install Redis
brew install redis

# Start Redis
brew services start redis

# Test connection
redis-cli ping
# Should return: PONG
```

### **Option 3: Manual Download**

```bash
# Download and install
wget https://download.redis.io/releases/redis-7.2.4.tar.gz
tar xzf redis-7.2.4.tar.gz
cd redis-7.2.4
make

# Start Redis
src/redis-server
```

---

## ☁️ **Azure Production Setup**

### **1. Create Azure Cache for Redis**

```bash
# Login to Azure
az login

# Create resource group (if not exists)
az group create --name mobile-parts-rg --location eastus

# Create Redis cache (Basic C0 tier - ~$15/month)
az redis create \
  --name mobile-parts-cache \
  --resource-group mobile-parts-rg \
  --location eastus \
  --sku Basic \
  --vm-size c0

# Get connection details
az redis show --name mobile-parts-cache --resource-group mobile-parts-rg
az redis list-keys --name mobile-parts-cache --resource-group mobile-parts-rg
```

### **2. Configure App Service**

```bash
# Set environment variables for App Service
az webapp config appsettings set \
  --name your-app-name \
  --resource-group mobile-parts-rg \
  --settings \
    REDIS_HOST="mobile-parts-cache.redis.cache.windows.net" \
    REDIS_PORT="6380" \
    REDIS_PASSWORD="<your-redis-key>" \
    REDIS_SSL="true"
```

### **3. Deploy Application**

```bash
# Build JAR
mvn clean package -DskipTests

# Deploy to Azure App Service
az webapp deploy \
  --resource-group mobile-parts-rg \
  --name your-app-name \
  --src-path target/mobile-parts-backend.jar \
  --type jar
```

---

## 🔧 **Configuration**

### **Environment Variables**

| Variable | Local Default | Azure Example |
|----------|--------------|---------------|
| `REDIS_HOST` | `localhost` | `your-cache.redis.cache.windows.net` |
| `REDIS_PORT` | `6379` | `6380` (SSL port) |
| `REDIS_PASSWORD` | *(empty)* | `your-primary-key` |
| `REDIS_SSL` | `false` | `true` |

### **Application Settings**

Located in `application.yml` and `application-supabase.yml`:

```yaml
spring:
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
      password: ${REDIS_PASSWORD:}
      ssl:
        enabled: ${REDIS_SSL:false}
  
  session:
    store-type: redis
    timeout: 30m  # Session expires after 30 minutes
  
  cache:
    type: redis
```

---

## 📊 **Cart Storage Details**

### **Data Structure**

Cart items are stored in Redis as hash maps:

```
Key: cart:{userId}
Hash Field: {componentId}
Hash Value: {
  "id": 123,
  "componentId": 123,
  "componentName": "iPhone 15 Pro OLED Display",
  "price": 299.99,
  "imageUrl": "https://...",
  "quantity": 2
}
```

### **Expiration**

- Cart data expires after **24 hours** of inactivity
- Each cart operation refreshes the expiration timer
- Automatic cleanup - no manual intervention needed

### **Features**

✅ Add items to cart  
✅ Update quantities  
✅ Remove items  
✅ Clear cart  
✅ Get cart summary with total  
✅ Get cart item count  

---

## 🧪 **Testing Redis**

### **Test Local Connection**

```bash
# Connect to Redis CLI
redis-cli

# Test commands
127.0.0.1:6379> SET test "Hello Redis"
127.0.0.1:6379> GET test
127.0.0.1:6379> DEL test
127.0.0.1:6379> KEYS *
127.0.0.1:6379> exit
```

### **Test Application**

```bash
# Start backend
mvn spring-boot:run

# Add item to cart (using curl)
curl -X POST http://localhost:8080/api/cart \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "componentId": 1, "quantity": 2}'

# Get cart items
curl "http://localhost:8080/api/cart?userId=1"

# Get cart summary
curl "http://localhost:8080/api/cart/summary?userId=1"
```

### **Monitor Redis**

```bash
# Watch Redis commands in real-time
redis-cli MONITOR

# Check cart keys
redis-cli KEYS "cart:*"

# View specific cart
redis-cli HGETALL "cart:1"

# Check memory usage
redis-cli INFO memory
```

---

## 🚨 **Troubleshooting**

### **Connection Refused**

```bash
# Check if Redis is running
redis-cli ping

# Start Redis if not running
brew services start redis  # macOS
docker start redis-cart     # Docker
```

### **Authentication Failed (Azure)**

```bash
# Verify credentials
az redis list-keys --name mobile-parts-cache --resource-group mobile-parts-rg

# Check App Service settings
az webapp config appsettings list --name your-app --resource-group mobile-parts-rg
```

### **SSL Connection Issues (Azure)**

Ensure you're using:
- Port `6380` (not 6379)
- `REDIS_SSL=true`
- Latest Azure Redis primary key

---

## 💡 **Best Practices**

### **For Development**
- Use local Redis without password
- Monitor Redis with `redis-cli MONITOR`
- Clear test data: `redis-cli FLUSHALL`

### **For Production**
- Always use SSL (port 6380)
- Enable Azure Redis firewall rules
- Use connection pooling (already configured)
- Monitor memory usage and set max-memory policy
- Use Azure Redis Premium for critical apps

### **Cart Expiration Strategy**
- **24 hours**: Cart items auto-expire
- **30 minutes**: Session expires (can be adjusted)
- **Logged-in users**: Cart persists across sessions until expiration
- **Guest users**: Cart tied to session

---

## 📚 **Additional Resources**

- [Redis Official Docs](https://redis.io/docs/)
- [Azure Cache for Redis](https://docs.microsoft.com/en-us/azure/azure-cache-for-redis/)
- [Spring Data Redis](https://spring.io/projects/spring-data-redis)
- [Redis CLI Commands](https://redis.io/commands/)

---

## 🎯 **Next Steps**

1. ✅ Redis configured in `application.yml`
2. ✅ Cart service migrated to Redis
3. ✅ RedisConfig and RedisTemplate set up
4. ⏳ **Start local Redis** for development
5. ⏳ **Test cart APIs** with Postman/curl
6. ⏳ **Deploy to Azure** with Azure Cache for Redis

**Happy coding!** 🚀
