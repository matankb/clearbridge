const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/User');
const config = require('../config');

const googleOpts = {
  clientID: config.google.CLIENT_ID,
  clientSecret: config.google.CLIENT_SECRET,
  callbackURL: config.google.CALLBACK_URL,
};

const localOpts = {
  usernameField: config.localAuth.USERNAME_FIELD,
  passwordField: config.localAuth.PASSWORD_FIELD,
  passReqToCallback: true,
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

async function findUserByLocal(req, email, password, done) {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      done(null, null, req.flash(config.localAuth.FLASH_KEY, 'Sorry, you don\'t have an account'));
    } else if (!(await user.validPassword(password))) {
      done(null, null, req.flash(config.localAuth.FLASH_KEY, 'Wrong Password. Please try again'));
    } else {
      done(null, user);
    }
  } catch (e) {
    done(e);
  }
}

const googleStrategy = new GoogleStrategy(googleOpts, findUserByGoogle);
const localStrategy = new LocalStrategy(localOpts, findUserByLocal);

module.exports = passport => {
  passport.use(googleStrategy);
  passport.use(localStrategy);
};
