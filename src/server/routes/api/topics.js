const ensureAuthenticated = require('../../middleware/ensure-authenticated');

const topicController = require('../../controllers/topics');

module.exports = function(router) {

  router.get('/topics/', ensureAuthenticated(), topicController.getTopics);
  router.post('/topics/', ensureAuthenticated([1, 2]), topicController.createTopic);

  router.get('/topics/:id/', ensureAuthenticated(), topicController.getTopic);
  router.patch('/topics/:id/', ensureAuthenticated([1, 2]), topicController.updateTopic);
  router.delete('/topics/:id/', ensureAuthenticated([1, 2]), topicController.deleteTopic);

  router.get('/topics/:id/students/', ensureAuthenticated([1, 2]), topicController.getStudents);
  router.post('/topics/:id/students/', ensureAuthenticated([1, 2]), topicController.addStudent);

};
