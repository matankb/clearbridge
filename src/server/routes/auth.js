const passport = require('passport');

const loginProtected = require('../middleware/login-protected');

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


module.exports = function(app) {

  app.get('/auth/', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/callback/', passport.authenticate('google', {
    successRedirect: '/auth/success/',
    failureRedirect: '/',
  }));

  app.get('/auth/success', loginProtected(), redirectAfterAuth);

  app.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
