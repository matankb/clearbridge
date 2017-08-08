const path = require('path');
const passport = require('passport');

const loginProtected = require('../middleware/login-protected');
const trackRequests = require('../middleware/track-requests');

function redirectAfterAuth(req, res) {

  switch (req.user.type) { // send different dashboard based on user type
    case 0:
      res.redirect('/student/');
      break;
    case 1:
      res.redirect('/teacher/');
      break;
    case 2:
      res.redirect('/admin/');
      break;
    default:
      res.redirect('/'); // TODO: flash message with 'invalid user' or something
      break;
  }

}

function saveReturnTo(req, res, next) {
  const returnTo = req.query.returnTo;
  if (returnTo) {
    req.session.returnTo = returnTo;
  }
  next();
}

module.exports = function(app) {

  app.get('/auth/', saveReturnTo, passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/callback/', passport.authenticate('google', {
    successReturnToOrRedirect: '/auth/success/',
    failureRedirect: '/auth/fail/',
  }));

  app.get('/auth/success', loginProtected(), redirectAfterAuth);
  app.get('/auth/fail/', (req, res) => {
    res.render(path.resolve(__dirname, '../../../public/errors/auth-fail.ejs'));
  });

  app.get('/logout/', trackRequests, (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
