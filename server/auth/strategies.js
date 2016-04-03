const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

const config = require('../config');

module.exports = function(passport) {

  passport.use(new GoogleStrategy({

    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,

  },
  (token, refreshToken, profile, done) => {
    // wait for data to be passed back
    process.nextTick(() => {
      // lookup user based on google id
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          // try to find user by email instead
          // this would mean that the user has not logged in yet
          User.findOne({ email: profile.emails[0].value }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (user) {
              return done(null, user);
            } else {
              // user does not exist
              return done('User Not Found');
            }
          });
        }
      });

    });
  }
  ));

};
