const express = require('express');
const loginProtected = require('../middleware/login-protected');

function redirect(req, res) {

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

function protectLogin(app, name, level) {
  app.use(`/${name}`, loginProtected([level]));
  app.use(`/${name}/*`, loginProtected([level]));
}

module.exports = function(app) {

  app.get('/auth/success', loginProtected(), redirect);

  protectLogin(app, 'admin', 2);
  protectLogin(app, 'teacher', 1);
  protectLogin(app, 'student', 0);

  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('build/'));
  } // else continue middleware train - next stop, webpack-dev-server

};
