export const environment = {
  production: true,
  apiUrl: 'https://mobileparts-api.azurewebsites.net', // Your Azure App Service URL
  graphqlUrl: 'https://mobileparts-api.azurewebsites.net/graphql',
  graphqlEndpoint: '/graphql',
  graphiqlUrl: 'https://mobileparts-api.azurewebsites.net/graphiql',
  
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
