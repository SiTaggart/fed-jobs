var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    feedIdentifier: String,
    title: String,
    url: String
});

var Job = mongoose.model('Job', jobSchema);
Job.collection.drop(function(){ console.log('Dropped jobs'); });

exports.Create = function(j) {
  var job = new Job(j);
  job.save(function (err, job) {
    if (err) {
      // TODO handle the error
    }
    console.log('Job %s saved from %s', job.title, job.feedIdentifier);
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
      console.log('Job exists with url %s', u);
    }

    callback(doesJobExist);
  });
};
