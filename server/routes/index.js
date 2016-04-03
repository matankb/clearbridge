const routes = require('require-all')(__dirname);

module.exports = function (app) {
  for(let key in routes) {
    if(routes.hasOwnProperty(key) && key !== 'index') {
      routes[key](app);
    }
  }
};
