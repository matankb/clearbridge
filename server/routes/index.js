const routes = require('require-all')(__dirname);

module.exports = function (app) {
  for(var key in routes) {
    if(routes.hasOwnProperty(key) && key !== 'index') {
      routes[key](app);
    }
  }
};
