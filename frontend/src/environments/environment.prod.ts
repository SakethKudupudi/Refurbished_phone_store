export const environment = {
  production: true,
  apiUrl: 'https://uqiawhrnbjtikdxclukn.supabase.co/rest/v1',
  graphqlUrl: 'https://uqiawhrnbjtikdxclukn.supabase.co/graphql/v1',
  graphqlEndpoint: '/graphql',
  graphiqlUrl: 'https://uqiawhrnbjtikdxclukn.supabase.co/graphiql',

  // Supabase configuration
  supabase: {
    url: 'https://uqiawhrnbjtikdxclukn.supabase.co',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
  },

  // Firebase Authentication (same config as development)
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
    clientId: '',
    authority: '',
    redirectUri: '',
    enabled: false // Disabled - using Firebase instead
  }
};
