const { Router } = require('express');

const topicRoutes = require('./topics');
const userRoutes = require('./users');

const router = Router();

module.exports = function(app) {

  topicRoutes(router);
  userRoutes(router);

  app.use('/api', router);

};
