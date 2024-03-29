var appConfig = require('../../config'),
    feedJob = require('../../app/jobs/feed');


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
