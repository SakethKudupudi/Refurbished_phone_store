export const environment = {
  production: false,
  // Local backend endpoints
  apiUrl: 'http://localhost:8080/api',
  graphqlUrl: 'http://localhost:8080/graphql',
  graphqlEndpoint: '/graphql',
  graphiqlUrl: 'http://localhost:8080/graphiql',

  // Supabase configuration - set your anon key here (or export in environment)
  supabase: {
    url: 'https://uqiawhrnbjtikdxclukn.supabase.co',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
  },

  // Firebase Authentication (Replaces Azure AD B2C)
  // TODO: Replace with your Firebase project credentials from Firebase Console
  // Get these from: Firebase Console → Project Settings → Your apps → Web app
  firebase: {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "mobileparts-store.firebaseapp.com",
    projectId: "mobileparts-store",
    storageBucket: "mobileparts-store.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  },

  // Deprecated: Azure AD B2C (replaced by Firebase)
  azureAdB2C: {
    clientId: 'your-client-id-here',
    authority: 'https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_SignUpSignIn',
    redirectUri: 'http://localhost:4200',
    enabled: false // Disabled - using Firebase instead
  }
};
