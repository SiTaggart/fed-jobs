var appConfig = require('../../config'),
    moment = require('moment'),
    _ = require('lodash'),
    FeedParser = require('feedparser'),
    Feed = require('../../app/models/feed'),
    Job = require('../../app/models/job');

var request = require('request'),
    mongoose = require('mongoose');




function feedJob () {

  var reqObj = { 'uri': '' },
      feedID,
      savedJobs;

  this.getFeed = function( feedDetails, modifiedSince, callback ) {

    reqObj.uri = feedDetails.url;
    feedID = feedDetails.feed_id;
    savedJobs = 1;

    console.log('getFeed uri: %s', reqObj.uri);
    console.log('getFeed id: %s', feedID);
    console.log('Modified Since: %s', modifiedSince);

    FeedParser.parseUrl(reqObj)
      .on('response', function (response) {
        console.log(response.statusCode);
      })
      .on('error', function(error) {
        console.error(error);
      })
      .on('article', processArticle)
      .on('complete', feedComplete)
      .on('end', callback);

  };

  var processArticle = function(article) {

    var tempFeedID = feedID;

    Job.CheckIfExistsByURL(article.link, function(jobExist){
      if(!jobExist) {
        createNewJob(article, tempFeedID);
        tweetNewJob(article);
      } else if (jobExist === 'error') {
        console.error('job search errored: %s', article.title);
      }
    });

  };

  createNewJob = function (article, tempFeedID){
    savedJobs ++;
    Job.Create({
      feedIdentifier: tempFeedID,
      title: article.title,
      url: article.link
    });
  };

  tweetNewJob = function (article){
    console.log('tweet job: %s', article.title);
  };

  var feedComplete = function(meta, articles) {
    console.log('Got %s articles from %s, %s were saved to the DB', articles.length, feedID, savedJobs);
  };

}


function FeedsController () {

  this.feeds = [];
  this.currentQueueIndex = 0;
  this.numberOfFeeds = 0;
  this.feedJobsQueue = [];
  this.feedJob = new feedJob();
  this.modifiedSince = '';

}
FeedsController.prototype.start = function (){

  this.currentQueueIndex = 0;
  this.feeds = require('../../feeds').feeds;
  this.numberOfFeeds = this.feeds.length;
  this.modifiedSince = new Date().toString();

  // build a makeshift queue
  for (var i = 0; i < this.numberOfFeeds; i++) {
    console.log('feed url: ', this.feeds[i].url);
    this.feedJobsQueue.push( this.feeds[i] );
  }

  this.readTheQueue();
};
FeedsController.prototype.readTheQueue = function (){

  var that = this,
      i = this.currentQueueIndex;

  console.log('Current queue index: %s', this.currentQueueIndex);
  console.log('Number of feeds: %s', this.numberOfFeeds);

  if(this.currentQueueIndex === this.numberOfFeeds) {
    console.log('kill queue');
    return;
  }

  this.feedJob.getFeed( this.feedJobsQueue[i], this.modifiedSince, function(){
    console.log('Get feed callback');
    that.currentQueueIndex ++;
    that.readTheQueue();
  });


};

module.exports = FeedsController;
