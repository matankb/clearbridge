const authRoute = require('./auth');
const dashboardRoute = require('./dashboard');
const publicRoute = require('./public');
const webpackRoute = require('./webpack');
const apiRoute = require('./api');

module.exports = function (app) {
  authRoute(app);
  dashboardRoute(app);
  publicRoute(app);
  webpackRoute(app); // webpack must be after dashboard
  apiRoute(app);
};
