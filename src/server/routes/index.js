const flat = require('flat');
const requireAll = require('require-all');

const opts = { dirname: __dirname, recursive: true };

// require all routes in folder
let routes = requireAll(opts);
// then flatten into 2d object
routes = flat(routes);

module.exports = function (app) {
  // initialize each route
  routes.forEach(route => route(app));
};
