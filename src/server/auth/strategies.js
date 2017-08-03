const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/User');
const config = require('../config');

const opts = {
  clientID: config.google.CLIENT_ID,
  clientSecret: config.google.CLIENT_SECRET,
  callbackURL: config.google.CALLBACK_URL,
};

function findUserByGoogle(token, refreshToken, profile, done) {
  const query = { email: profile.emails[0].value };
  User.findOne(query).exec()
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, null);
      }
    })
    .catch(err => done(err));
}

const strategy = new GoogleStrategy(opts, findUserByGoogle);

module.exports = passport => passport.use(strategy);
