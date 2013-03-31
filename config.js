if(process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else {
    var mongo = {
        'hostname':'localhost',
        'port':27017,
        'username':'',
        'password':'',
        'name':'',
        'db':'fed-jobs'
    };
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};

module.exports = {
  environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
  port: (process.env.VMC_APP_PORT || 3000),
  uri: (process.env.VCAP_APP_HOST || 'localhost'),
  mongodb: generate_mongo_url(mongo)
};
