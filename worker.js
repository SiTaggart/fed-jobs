var appConfig = require('./config'),
    mongoose = require('mongoose'),
    FeedsController = require('./app/controllers/feeds');

// Connect to data
mongoose.connect(appConfig.mongodb);

var feeds = new FeedsController();

console.log('job ran');

feeds.start();
