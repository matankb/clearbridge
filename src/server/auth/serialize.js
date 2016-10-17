const User = require('../models/User');

// serializing based on model ID, not google id.
const serialize = (user, done) => done(null, user.id);

function deserialize(id, done) {
  User.findById(id).exec()
    .then(user => done(null, user))
    .catch(err => done(err));
}

module.exports = function(passport) {
  // set serialization and deserialization functions
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
};
