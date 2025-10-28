# 🚀 Quick Start Guide - Firebase + Azure Setup

## ⚡ 5-Minute Setup

### Step 1: Create Firebase Project (2 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add Project" → Name: `mobileparts-store` → Create
3. Click "Authentication" → "Get Started" → Enable "Email/Password"
4. Go to Project Settings (⚙️) → Your apps → Click Web icon (`</>`)
5. Register app: `MobileParts` → Copy the `firebaseConfig` object

### Step 2: Update Frontend Config (1 minute)

Open `frontend/src/environments/environment.ts` and replace:

```typescript
firebase: {
  apiKey: "YOUR_API_KEY_HERE",          // ← Paste from Firebase Console
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc"
}
```

### Step 3: Download Service Account (1 minute)

1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key" → Download JSON
3. Save as: `backend/src/main/resources/firebase-service-account.json`

### Step 4: Build & Run (1 minute)

```bash
# Terminal 1 - Backend
cd backend
mvn clean install -DskipTests
mvn spring-boot:run -Dspring.profiles.active=h2

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit: http://localhost:4200

---

## ✅ Done!

You now have:
- ✅ Firebase Authentication working
- ✅ Backend verifying Firebase tokens
- ✅ Frontend sending authenticated requests

**Test it:**
1. Create a user in Firebase Console → Authentication → Add User
2. Use those credentials to log in from your app
3. All API calls will be authenticated!

---

## 📖 Full Documentation

- `FIREBASE_SETUP.md` - Detailed Firebase setup
- `AZURE_DEPLOYMENT.md` - Deploy to Azure cloud
- `FIREBASE_AZURE_SETUP.md` - Complete integration guide
- `INTEGRATION_SUMMARY.md` - Everything we've done

---

## 🎯 What's Next?

**Option A: Keep Developing Locally**
- Use H2 database (no Azure needed)
- Add more features
- Test everything locally

**Option B: Deploy to Azure**
- Follow `AZURE_DEPLOYMENT.md`
- Deploy backend to Azure App Service (FREE)
- Deploy frontend to Static Web Apps (FREE)
- Use Azure SQL (~$5/month)

**Recommended:** Develop locally first, deploy to Azure when ready for demo!

