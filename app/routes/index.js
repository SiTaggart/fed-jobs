var appConfig = require('../../config'),
    Job = require('../../app/models/job'),
    moment = require('moment');

exports.index = function(req, res){
  Job.getLatestJobs(function(err, jobs){

    //take the jobs and present them for the view
    var sanitizedJobs = [],
        jobsLength = jobs.length;

    for (var i = 0; i < jobsLength; i++) {
      sanitizedJobs.push({
        'source': jobs[i].feedName,
        'title': jobs[i].title,
        'url': jobs[i].url,
        'date': new moment.utc(jobs[i].createdAt).format("D"),
        'month': new moment.utc(jobs[i].createdAt).format("MMMM")
      });
    }

    // render the page with lovely new jobs
    res.render('index', {
      title: 'Front-end Development Jobs',
      description: 'A collection of some of the best Front-end Development Jobs from some of the best job boards on the Internet.',
      jobs: sanitizedJobs
    });

  });
};

/**
 * API URL to return all jobs in JSON form
 * @param  {object} req Request object
 * @param  {object} res Response object
 */
exports.getJobs = function(req, res) {
  Job.getJobs(function(err, jobs){
    res.json(jobs);
  });
};
/**
 * API URL to return all jobs for a specific feed based on parameter string
 * @param  {object} req Request object
 * @param  {object} res Response object
 */
exports.getJobsByFeedName = function(req, res) {
  var feed = req.params.feed;
  Job.getJobsByFeedName(feed, function(err, jobs){
    res.json(jobs);
  });
};
