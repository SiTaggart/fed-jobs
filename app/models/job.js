var request = require('request'),
    mongoose = require('mongoose');

exports.Job = mongoose.model('Job', new mongoose.Schema(
  {
    feedIdedentifier: String,
    title: String,
    url: String
  }));
