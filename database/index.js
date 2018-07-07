var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  user: String,
  search_terms: [String]
});

var User = mongoose.model('User', userSchema);

var selectAll = function(callback) {
  User.find({}, function(err, terms) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, terms);
    }
  });
};

module.exports.selectAll = selectAll;