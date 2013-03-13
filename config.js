module.exports = {
  environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
  port: 3000,
  uri: 'http://localhost:3333',
  mongodb: 'mongodb://localhost/fed-jobs'
};

if (module.exports.environment == 'production') {
  module.exports.port = process.env.PORT || 3000;
  module.exports.uri = 'http://localhost:'+module.exports.port;
}
