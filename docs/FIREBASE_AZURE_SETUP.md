# Firebase + Azure App Service Integration - Complete Setup

## 🎯 Overview

This guide shows you how to integrate Firebase Authentication with your Spring Boot backend and deploy to Azure App Service.

## ✅ What You've Done So Far

### Frontend (Angular)
- ✅ Installed Firebase SDK (`npm install firebase @angular/fire@^17.0.0`)
- ✅ Created `FirebaseAuthService` for authentication
- ✅ Updated `auth.interceptor.ts` to send Firebase tokens
- ✅ Configured `environment.ts` and `environment.prod.ts`
- ✅ Added Firebase providers to `app.config.ts`

### Backend (Spring Boot)
- ✅ Added Firebase Admin SDK dependency to `pom.xml`
- ✅ Created `FirebaseConfig.java` configuration class
- ⏳ Need to download Firebase service account JSON
- ⏳ Need to rebuild Maven to download dependencies

---

## 📝 Next Steps (In Order)

### Step 1: Complete Firebase Project Setup

1. **Go to Firebase Console** → https://console.firebase.google.com/
2. **Create project** named `mobileparts-store`
3. **Enable Authentication**:
   - Click "Authentication" → "Get Started"
   - Enable "Email/Password"
   - Enable "Google" (optional)

4. **Get Firebase Config** (for Frontend):
   - Project Settings → Your apps → Web (`</>` icon)
   - Copy the `firebaseConfig` object
   - Update `frontend/src/environments/environment.ts`:
   
   ```typescript
   firebase: {
     apiKey: "AIza...",  // Copy from Firebase Console
     authDomain: "mobileparts-store.firebaseapp.com",
     projectId: "mobileparts-store",
     storageBucket: "mobileparts-store.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   }
   ```

5. **Download Service Account** (for Backend):
   - Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as: `backend/src/main/resources/firebase-service-account.json`
   - ⚠️ **IMPORTANT**: Add to `.gitignore`!

---

### Step 2: Update .gitignore

Add this to prevent committing Firebase secrets:

```bash
# Add to .gitignore
backend/src/main/resources/firebase-service-account.json
frontend/src/environments/environment.ts
frontend/src/environments/environment.prod.ts
```

---

### Step 3: Rebuild Backend (Download Firebase SDK)

```bash
cd backend
mvn clean install -DskipTests
```

This will download the Firebase Admin SDK dependencies.

---

### Step 4: Test Locally

#### Start Backend:
```bash
cd backend
mvn spring-boot:run -Dspring.profiles.active=h2
```

Should see:
```
✅ Firebase initialized successfully
🚀 Started MobilePartsApplication on port 8080
```

#### Start Frontend:
```bash
cd frontend
npm start
```

Navigate to http://localhost:4200

---

### Step 5: Create Login Component (Optional - if you don't have one)

We can create a simple login page using Firebase:

```bash
ng generate component components/auth/login --standalone
```

Would you like me to create a ready-to-use login component?

---

## 🚀 Deploy to Azure

### Backend to Azure App Service

```bash
# 1. Build JAR
cd backend
mvn clean package -DskipTests

# 2. Create Azure resources
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

# 3. Deploy
az webapp deploy \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --src-path target/*.jar \
  --type jar

# 4. Upload Firebase service account (IMPORTANT!)
az webapp config appsettings set \
  --name mobileparts-api \
  --resource-group rg-mobileparts \
  --settings GOOGLE_APPLICATION_CREDENTIALS=/home/site/wwwroot/firebase-service-account.json

# Upload the file via Azure Portal or FTP
```

### Frontend to Azure Static Web Apps

```bash
cd frontend
npm run build -- --configuration production

# Update environment.prod.ts with Azure backend URL first!
# apiUrl: 'https://mobileparts-api.azurewebsites.net'

az staticwebapp create \
  --name mobileparts-web \
  --resource-group rg-mobileparts \
  --source ./dist/frontend/browser \
  --location "East US 2"
```

---

## 🧪 Testing the Integration

### Test Firebase Login (Frontend)

Create a test user:
1. Go to Firebase Console → Authentication → Users
2. Click "Add User"
3. Email: `test@example.com`, Password: `Test123!`

Use in your app to test login!

### Test Backend Token Verification

```bash
# Get Firebase ID token from browser DevTools
# (After logging in, check localStorage: firebaseToken)

curl -H "Authorization: Bearer <YOUR_FIREBASE_TOKEN>" \
  https://mobileparts-api.azurewebsites.net/api/models
```

Should return authorized data!

---

## 📊 Architecture Summary

```
┌──────────────┐
│   Browser    │
│   (Angular)  │
└──────┬───────┘
       │
       │ 1. Login with Firebase
       ▼
┌──────────────────┐
│  Firebase Auth   │ (Google's servers)
│  (Email/Google)  │
└──────┬───────────┘
       │
       │ 2. Returns ID Token
       ▼
┌──────────────┐
│   Browser    │
│ (Stores JWT) │
└──────┬───────┘
       │
       │ 3. API calls with Bearer token
       ▼
┌────────────────────┐
│  Azure App Service │
│  (Spring Boot)     │
│  ├─ Verify token   │ ← Firebase Admin SDK
│  ├─ Check user     │
│  └─ Return data    │
└────────────────────┘
```

---

## ✅ Checklist

**Firebase Setup:**
- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Firebase config added to environment.ts
- [ ] Service account JSON downloaded
- [ ] Service account added to backend/src/main/resources/

**Backend:**
- [ ] Maven dependencies installed (`mvn clean install`)
- [ ] Backend starts successfully with Firebase
- [ ] Firebase service account in .gitignore

**Azure Deployment:**
- [ ] Backend deployed to Azure App Service
- [ ] Frontend deployed to Azure Static Web Apps
- [ ] Firebase service account uploaded to Azure
- [ ] CORS configured for Azure domain
- [ ] Environment variables set

**Testing:**
- [ ] Can create Firebase user
- [ ] Can login from frontend
- [ ] Token sent to backend API
- [ ] Backend verifies token successfully
- [ ] Protected routes work

---

## 💡 Pro Tips

1. **Development**: Use H2 database (no Azure SQL needed initially)
2. **Production**: Switch to Azure SQL with `SPRING_PROFILES_ACTIVE=sqlserver`
3. **Secrets**: NEVER commit `firebase-service-account.json`
4. **Cost**: Firebase Auth is FREE for unlimited users!
5. **Testing**: Use Firebase Emulator Suite for local testing

---

## 🆘 Need Help?

**Backend won't start?**
- Check if `firebase-service-account.json` exists
- Check Maven downloaded Firebase dependencies
- Look at console logs for Firebase errors

**Frontend can't login?**
- Check Firebase config in environment.ts
- Check Firebase Console → Authentication is enabled
- Check browser console for errors

**Token not verified?**
- Check Authorization header format: `Bearer <token>`
- Check Firebase service account uploaded to Azure
- Check backend logs for verification errors

---

## 🎓 What's Next?

Once this is working:
1. ✅ Add user roles to Firebase custom claims
2. ✅ Implement role-based access (Admin, Vendor, Customer)
3. ✅ Add Azure SQL database
4. ✅ Add Azure Blob Storage for images
5. ✅ Set up CI/CD with GitHub Actions

You're building a **production-grade cloud application**! 🚀

