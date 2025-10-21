export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  graphqlUrl: 'http://localhost:8080/graphql',
  graphqlEndpoint: '/graphql',
  graphiqlUrl: 'http://localhost:8080/graphiql',
  azureAdB2C: {
    clientId: 'your-client-id-here',
    authority: 'https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_SignUpSignIn',
    redirectUri: 'http://localhost:4200',
    enabled: false // Set to true when Azure AD B2C is configured
  }
};
