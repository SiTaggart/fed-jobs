var mongoURI =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/fed-jobs';

module.exports = {
  environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
  port: (process.env.PORT || 3000),
  uri: (process.env.VCAP_APP_HOST || 'localhost'),
  mongodb: mongoURI
};
