const flat = require('flat');
const routes = flat(require('require-all')({
  dirname: __dirname,
  recursive: true,
}));

module.exports = function (app) {
  for (let key in routes) {
    if (routes.hasOwnProperty(key) && key !== 'index') {
      routes[key](app);
    }
  }
};
