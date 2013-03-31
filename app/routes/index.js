var appConfig = require('../../config'),
    Job = require('../../app/models/job');

exports.index = function(req, res){
  Job.getLatestJobs(function(err, jobs){
    res.render('index', {
      title: 'Front-end Developer Jobs',
      jobs: jobs
    });
  });
};
exports.getJobs = function(req, res) {
  Job.getJobs(function(err, jobs){
    res.json(jobs);
  });
};
exports.getJobsByFeedName = function(req, res) {
  var feed = req.params.feed;
  Job.getJobsByFeedName(feed, function(err, jobs){
    res.json(jobs);
  });
};
