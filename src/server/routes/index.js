const requireAll = require('require-all');
const flat = require('flat');
const objectValues = require('object-values');

const opts = {
  dirname: __dirname,
  recursive: true,
};

// { {} } -> {} -> []
let routes = requireAll(opts);
delete routes.index;
routes = flat(routes);
routes = objectValues(routes);

module.exports = function (app) {
  // initialize each route
  routes.forEach(route => route(app));
};
