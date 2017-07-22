const requireAll = require('require-all');
const flat = require('flat');

const webpackRoute = require('./webpack');

const opts = {
  dirname: __dirname,
  recursive: true,
};

// { {} } -> {} -> []
let routes = requireAll(opts);
delete routes.index;
delete routes.webpack; // required manually
routes = flat(routes);
routes = Object.values(routes);

module.exports = function (app) {
  // initialize each route
  routes.forEach(route => route(app));
  // this must be initialized last
  webpackRoute(app);
};
