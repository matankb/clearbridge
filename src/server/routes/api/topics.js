/* eslint-disable max-len */

const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const wrapAsync = require('../../helpers/wrap-async');

const topicController = require('../../controllers/topics');

module.exports = function(router) {

  router.get('/topics/', ensureAuthenticated(), wrapAsync(topicController.getTopics));
  router.post('/topics/', ensureAuthenticated([1, 2]), wrapAsync(topicController.createTopic));

  router.get('/topics/:id/', ensureAuthenticated(), wrapAsync(topicController.getTopic));
  router.patch('/topics/:id/', ensureAuthenticated([1, 2]), wrapAsync(topicController.updateTopic));
  router.delete('/topics/:id/', ensureAuthenticated([1, 2]), wrapAsync(topicController.deleteTopic));

  router.get('/topics/:id/students/', ensureAuthenticated([1, 2]), wrapAsync(topicController.getStudents));
  router.get('/topics/:id/asks/', ensureAuthenticated(), wrapAsync(topicController.getAsks));

};
