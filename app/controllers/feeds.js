var appConfig = require('../../config'),
    moment = require('moment'),
    _ = require('lodash'),
    feedparser = require('feedparser'),
    rssFeeds = require('../../feeds'),
    Feed = require('../../app/models/feed'),
    Job = require('../../app/models/job');

var request = require('request'),
    mongoose = require('mongoose');


function feedJob ( url ) {

  var reqObj = { 'uri': url };

  this.getFeed = function() {
    request(reqObj, function (err, response, body){
      console.log('getting');
      lastmModified = moment.utc();
      feedparser.parseString(body)
        .on('article', feedCallback)
        .on('meta', metaCallBack);
    });
  };

  var feedCallback = function(article) {
    console.log('Got article: %s', article.title);
    // Create new job model and save to DB
    // var job = new Job({
    //   feedIdedentifier: '',
    //   title: article.title,
    //   url: article.link
    // });
    // job.save();
  };

  var metaCallBack = function(meta) {
    console.log('Feed title: ', meta.title);
    console.log('Feed date: ', meta.date);
    console.log('Feed pubDate', meta.pubdate);
  };

  this.getFeed();

}


function FeedsController () {

  this.feeds = rssFeeds.feeds;
  this.numberOfFeeds = this.feeds.length;
  this.feedJobs = [];

}
FeedsController.prototype.start = function (){

  for (var i = 0; i < this.numberOfFeeds; i++) {
    console.log('feed url: ', this.feeds[i].url);

    this.feedJobs.push( new feedJob( this.feeds[i].url ) );
  }

};

module.exports = FeedsController;
