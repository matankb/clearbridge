const flatten = require('flat');
const routes = flatten(require('require-all')({
  dirname: __dirname,
  recursive: true,
}));

module.exports = function (app) {
  for (var key in routes) {
    if (routes.hasOwnProperty(key) && key !== 'index') {
      routes[key](app);
    }
  }
};
