var appConfig = require('../../config'),
    localConfig = require('../../config_local'),
    request = require('request'),
    Twit = require('twit'),
    moment = require('moment'),
    _ = require('lodash'),
    FeedParser = require('feedparser'),
    Feed = require('../../app/models/feed'),
    Job = require('../../app/models/job');

var T = new Twit({
  consumer_key:         (process.env.consumer_key || localConfig.Twitter.consumer_key),
  consumer_secret:      (process.env.consumer_secret || localConfig.Twitter.consumer_secret),
  access_token:         (process.env.access_token || localConfig.Twitter.access_token),
  access_token_secret:  (process.env.access_token_secret || localConfig.Twitter.access_token_secret)
});

function feedJob () {

  var reqObj = { 'uri': '' },
      feedID,
      feedName,
      savedJobs;

  this.getFeed = function( feedDetails, modifiedSince, callback ) {

    reqObj.uri = feedDetails.url;
    feedID = feedDetails.feed_id;
    feedName = feedDetails.feed_name;
    savedJobs = 0;

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
    //These temps are probably not needed but I'm passing them around as everything s async and the saves might not get finished by the time the new feed starts getting
    var tempFeedID = feedID,
        tempFeedName = feedName,
        title = article.title;

    //attempt to weed out some of the crappier jobs as searches are pretty crappy and loose. Shameful regex.
    if(title.match(/front end|front-end|UI|Interface|frontend|user interface/gi) === null) return;

    Job.CheckIfExistsByURL(article.link, function(jobExist){

      if(!jobExist) {
        createNewJob(article, tempFeedID, tempFeedName);
        // only tweet in production
        if(process.env.NODE_ENV === 'production') tweetNewJob(article);
      } else if (jobExist === 'error') {
        console.error('job search errored: %s', article.title);
      }

    });

  };

  var createNewJob = function (article, tempFeedID, tempFeedName){
    savedJobs ++;
    Job.Create({
      feedIdentifier: tempFeedID,
      feedName: tempFeedName,
      title: article.title,
      url: article.link
    });
  };

  var tweetNewJob = function (article){
    var tweetStatus = 'On @' + feedID + ': ' + article.title,
        tweetURL = article.link,
        fullTweet;
    tweetStatus = tweetStatus.substring(0, 101);
    fullTweet = tweetStatus + ' ' + encodeURI(tweetURL) + ' #job #frontend';

    T.post('statuses/update', { status: fullTweet }, function(err, reply) {
      if(err) {
        console.error('Tweet Failed: ', err);
      } else {
        console.log('Tweeted: ', reply);
      }
    });
  };

  var feedComplete = function(meta, articles) {
    console.log('Got %s articles from %s, %s were saved to the DB', articles.length, feedID, savedJobs);
  };

}

module.exports = feedJob;
