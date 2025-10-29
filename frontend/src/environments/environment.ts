export const environment = {
  production: false,
  // Supabase REST endpoint (PostgREST) and GraphQL endpoint
  apiUrl: 'https://uqiawhrnbjtikdxclukn.supabase.co/rest/v1',
  graphqlUrl: 'https://uqiawhrnbjtikdxclukn.supabase.co/graphql/v1',
  graphqlEndpoint: '/graphql',
  graphiqlUrl: 'https://uqiawhrnbjtikdxclukn.supabase.co/graphiql',

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
