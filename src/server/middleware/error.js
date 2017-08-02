const path = require('path');

function handleNotFound(req, res) {
  res.status(404).render(path.resolve(__dirname, '../../../public/errors/404.ejs'));
}

module.exports = function (app) {
  app.use(handleNotFound);
};
