const User = require('../models/User');

module.exports = function(passport) {

  // serializing based on model ID, not google id.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });
};
