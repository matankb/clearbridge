const { Router } = require('express');

const topicRoutes = require('./topics');
const userRoutes = require('./users');
const reportRoutes = require('./report');

const { notFound, internalError } = require('../../controllers/api-errors');
const trackRequests = require('../../middleware/track-requests');

const router = Router();

module.exports = function(app) {

  router.use(trackRequests);

  topicRoutes(router);
  userRoutes(router);
  reportRoutes(router);


  router.use(notFound);
  router.use(internalError); // must be last

  app.use('/api', router);

};
