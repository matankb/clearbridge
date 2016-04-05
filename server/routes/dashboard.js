const express = require('express');

function handleDashboardRoute(req, res, next) {

  if (req.url.indexOf('/dashboard/build/') === -1) { // ensure that route is not a link to build

    switch (req.user.type) { // send different dashboard based on user type
      case 0:
        res.sendFile('dashboard/student/index.html', { root: './client' });
        break;
      case 1:
        res.sendFile('dashboard/teacher/index.html', { root: './client' });
        break;
      case 2:
        res.sendFile('dashboard/admin/index.html', { root: './client' });
        break;
      default:
        res.sendFile('login/index.html', { root: './client' });
        break;
    }

  } else { // route IS link to build
    next(); // continue middleware train - next stop, express.static
  }

}

module.exports = function(app) {

  // two routes because /dashboard/* doesnt handle /dashboard/
  app.get('/dashboard/*', handleDashboardRoute);
  app.get('/dashboard', handleDashboardRoute);

  app.use('/dashboard/build/', express.static('client/dashboard/build/'));

};
