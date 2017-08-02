const path = require('path');

function handleNotFound(req, res) {
  res.status(404).render(path.resolve(__dirname, '../../../public/errors/404.ejs'));
}

// all four arguments must be accepted for express to recognize it as internal error handler
function internalServerError(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(500).render(path.resolve(__dirname, '../../../public/errors/500.ejs'));
}

module.exports = function (app) {
  app.use(handleNotFound);
  app.use(internalServerError);
};
