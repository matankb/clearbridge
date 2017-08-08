const express = require('express');

const loginProtected = require('../middleware/login-protected');
const appendTrailingSlash = require('../middleware/append-trailing-slash');
const trackRequests = require('../middleware/track-requests');
const ignoreSubRoutes = require('../middleware/ignore-subroutes');

function applyMiddleware(app, name, securityLevel) {
  const route = `/${name}/`;
  app.use(route, loginProtected([securityLevel]), trackRequests);
  app.use(`/${name}`, appendTrailingSlash); // let react router be happy and not sad
  app.use(route, ignoreSubRoutes);
}

module.exports = function(app) {

  applyMiddleware(app, 'student', 0);
  applyMiddleware(app, 'teacher', 1);
  applyMiddleware(app, 'admin', 2);

  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('build/'));
  } // else continue middleware train - next stop, webpack-dev-server

};
