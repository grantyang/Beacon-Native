const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beacon');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  user: String,
  savedInterests: [String]
});

const User = mongoose.model('User', userSchema);

const upsertUser = function(userObject) {
  return db
    .collection('users')
    .updateOne(
      { user: userObject.user },
      { $set: { savedInterests: userObject.savedInterests } },
      { upsert: true }
    )
    .then(item => {
      return item.result;
    });
};

const getUserInterests = function(user) {
  return User.findOne({ user: user })
    .exec()
    .then(data => {
      return data;
    });
};

module.exports.upsertUser = upsertUser;
module.exports.getUserInterests = getUserInterests;
