const { Router } = require('express');

const topicRoutes = require('./topics');
const searchRoutes = require('./search');
const userRoutes = require('./users');
const reportRoutes = require('./report');
const askRoutes = require('./ask');

const { notFound, internalError } = require('../../controllers/api-errors');
const trackRequests = require('../../middleware/track-requests');

const router = Router();

module.exports = function(app) {

  router.use(trackRequests);

  topicRoutes(router);
  searchRoutes(router);
  userRoutes(router);
  reportRoutes(router);
  askRoutes(router);

  router.use(notFound);
  router.use(internalError); // must be last

  app.use('/api', router);

};
