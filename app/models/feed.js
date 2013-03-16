var request = require('request'),
    mongoose = require('mongoose');

exports.Feed = mongoose.model('Feed', new mongoose.Schema(
  {
    feedIdedentifier: String,
    url: String,
    twitterHandle: String
  }));
