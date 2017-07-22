const express = require('express');

const loginProtected = require('../middleware/login-protected');
const appendTrailingSlash = require('../middleware/append-trailing-slash');

function handleSubRoutes(app, names) {

  const paths = names.map(name => `/${name}/`);

  app.use((req, res, next) => {
    for (const path of paths) {
      if (req.url.startsWith(path)) {
        req.url = path;
        req.path = path;
        break;
      }
    }

    next();
  });
}

function applyMiddleware(app, name, securityLevel) {
  app.use(`/${name}/`, loginProtected([securityLevel]));
  app.use(`/${name}`, appendTrailingSlash); // let react router be happy and not sad
}

module.exports = function(app) {

  handleSubRoutes(app, ['student', 'teacher', 'admin']);

  applyMiddleware(app, 'student', 0);
  applyMiddleware(app, 'teacher', 1);
  applyMiddleware(app, 'admin', 2);

  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('build/'));
  } // else continue middleware train - next stop, webpack-dev-server

};
