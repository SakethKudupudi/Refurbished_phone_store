export const environment = {
  production: true,
  apiUrl: 'https://your-backend.azurewebsites.net',
  graphqlUrl: 'https://your-backend.azurewebsites.net/graphql',
  graphiqlUrl: 'https://your-backend.azurewebsites.net/graphiql',
  azureAdB2C: {
    clientId: process.env['AZURE_AD_CLIENT_ID'] || '',
    authority: process.env['AZURE_AD_AUTHORITY'] || '',
    redirectUri: process.env['APP_URL'] || '',
    enabled: true
  }
};
