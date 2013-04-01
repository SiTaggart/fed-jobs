var mongoURI = ( process.env.MONGOHQ_URL || 'mongodb://localhost/fed-jobs');

module.exports = {
  environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
  port: (process.env.PORT || 3000),
  uri: (process.env.VCAP_APP_HOST || 'localhost'),
  mongodb: mongoURI,
  Twitter: {
    consumer_key: 'eYQuNth3ToMYAF2EjH9dA',
    consumer_secret: 'vF25YTfEaWAoOEtmflZgjrerpFlZNdpA0s6z8Nae0',
    access_token: '1263922795-hC14uzUssdiJi0903WivTlhR4FFn3r6O1GJAyW6',
    access_token_secret: 'grBUwnYiA0UBYujlmvbXRVtvFMFMPgT1DbkfGJvZzr8'
  }
};
