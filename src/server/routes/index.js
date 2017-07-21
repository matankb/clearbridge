const requireAll = require('require-all');
const flat = require('flat');

const opts = {
  dirname: __dirname,
  recursive: true,
};

// { {} } -> {} -> []
let routes = requireAll(opts);
delete routes.index;
routes = flat(routes);
routes = Object.values(routes);

module.exports = function (app) {
  // initialize each route
  routes.forEach(route => route(app));
};
