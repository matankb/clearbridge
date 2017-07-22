const express = require('express');

const loginProtected = require('../middleware/login-protected');

function handleSubRoutes(app, names) {

  const paths = names.map(name => `/${name}`);

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
function protectLogin(app, name, level) {
  app.use(`/${name}`, loginProtected([level]));
}

module.exports = function(app) {

  handleSubRoutes(app, ['student', 'teacher', 'admin']);

  protectLogin(app, 'student', 0);
  protectLogin(app, 'teacher', 1);
  protectLogin(app, 'admin', 2);

  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('build/'));
  } // else continue middleware train - next stop, webpack-dev-server

};
