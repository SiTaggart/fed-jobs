var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    feedIdentifier: String,
    feedName: String,
    title: String,
    url: String,
    createdAt: { type: Date, default: Date.now }
});

var Job = mongoose.model('Job', jobSchema);
// Job.collection.drop(function(){ console.log('Dropped jobs'); });

exports.Create = function(j) {
  var job = new Job(j);
  job.save(function (err, job) {
    if (err) {
      // TODO handle the error
    }
    console.log('Saved Job %s from %s at %s', job.title, job.feedIdentifier, new Date().toString('T'));
  });
};

exports.CheckIfExistsByURL = function(u, callback) {
  Job.find({ url:u }, function(err, objs){
    var doesJobExist = false;
    if (err) {
      // Handle the error
      doesJobExist = 'error';
    }
    if (objs.length > 0) {
      doesJobExist = true;
    }

    callback(doesJobExist);
  });
};

exports.getJobs = function(callback) {
  Job.find({}).sort('field -createdAt').execFind(function(err, jobs) {
    callback(err, jobs);
  });
};
exports.getLatestJobs = function(callback) {
  Job.find({}).sort('field -createdAt').limit(30).execFind(function(err, jobs) {
    callback(err, jobs);
  });
};
exports.getJobsByFeedName = function(feed, callback) {
  Job.find({ feedIdentifier: feed }).sort('field -createdAt').execFind(function(err, jobs) {
    callback(err, jobs);
  });
};


