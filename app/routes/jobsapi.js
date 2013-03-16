exports.getJobs = function(req, res) {
  exports.Job.find({}, function(err, objs){
    res.json(objs);
  });
};
