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
  console.log('UPSERT. userObject is', userObject)
  return db
    .collection('users')
    .updateOne(
      { user: userObject.user },
      { $set: { savedInterests: userObject.savedInterests } },
      { upsert: true }
    )
    .then(item => {
      console.log(item.result)
      console.log('item saved to database');
      return item.result;
    });
};

// const selectAll = function(callback) {
//   User.find({}, function(err, terms) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, terms);
//     }
//   });
// };

const getUserInterests = function(user) {
  console.log('GET. user is', user)
  return User.findOne({user:user})
    .exec()
    .then(data => {
      console.log('data is', data)
      return data;
    });
};

module.exports.upsertUser = upsertUser;
module.exports.getUserInterests = getUserInterests;
