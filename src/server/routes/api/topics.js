const mongoose = require('mongoose');

const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const { handleErrors, handleNotFound } = require('../../helpers/db');

const topicController = require('../../controllers/topics');

module.exports = function(app) {

  app.get('/api/topics/', ensureAuthenticated(), topicController.getTopics);
  app.post('/api/topics/', ensureAuthenticated([1, 2]), topicController.createTopic);

  app.get('/api/topics/:id/', ensureAuthenticated(), topicController.getTopic);
  app.patch('/api/topics/:id/', ensureAuthenticated([1, 2]), topicController.updateTopic);
  app.delete('/api/topics/:id/', ensureAuthenticated([1, 2]), topicController.deleteTopic);

  app.get('/api/topics/:id/students/', ensureAuthenticated([1, 2]), topicController.getStudents);
  app.post('/api/topics/:id/students/', ensureAuthenticated([1, 2]), topicController.addStudent);

};
