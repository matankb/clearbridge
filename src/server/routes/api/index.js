const { Router } = require('express');

const topicRoutes = require('./topics');
const userRoutes = require('./users');

const { notFound, internalError } = require('../../controllers/api-errors');

const router = Router();

module.exports = function(app) {

  topicRoutes(router);
  userRoutes(router);

  router.use(notFound);
  router.use(internalError); // must be last

  app.use('/api', router);

};
