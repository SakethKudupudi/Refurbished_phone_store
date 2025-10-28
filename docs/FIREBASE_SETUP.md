# Firebase Authentication Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"**
3. Enter project name: `mobileparts-store`
4. Disable Google Analytics (optional for this project)
5. Click **"Create Project"**

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable these providers:
   - ✅ **Email/Password** (for basic auth)
   - ✅ **Google** (for social login)
   - ⚙️ **GitHub** (optional, for developers)

## Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"**
3. Click **Web app icon** (`</>`)
4. Register app name: `MobileParts Web`
5. Copy the Firebase config object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "mobileparts-store.firebaseapp.com",
  projectId: "mobileparts-store",
  storageBucket: "mobileparts-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. **Save these values** - you'll need them in the next step!

## Step 4: Configure Authorized Domains

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add these domains:
   - `localhost` (for local development)
   - `your-app.azurewebsites.net` (for Azure App Service)

## Step 5: Create Service Account (for Backend)

1. Go to **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"**
3. Download the JSON file
4. **Save as**: `backend/src/main/resources/firebase-service-account.json`
5. **IMPORTANT**: Add to `.gitignore` (security!)

---

## ✅ Checklist

- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Google sign-in enabled
- [ ] Firebase config copied
- [ ] Service account JSON downloaded
- [ ] Authorized domains configured

**Next**: Configure Angular app with Firebase SDK
