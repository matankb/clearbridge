const ensureAuthenticated = require('../../middleware/ensure-authenticated');

const userController = require('../../controllers/users');

module.exports = function(app) {

  app.get('/api/users/', ensureAuthenticated([1, 2]), userController.getUsers);
  app.post('/api/users/', ensureAuthenticated.admin, userController.createUser);

  app.patch('/api/users/:id/', ensureAuthenticated.admin, userController.updateUser);
  app.get('/api/users/:id/', ensureAuthenticated([1, 2]), userController.getUser);
  app.delete('/api/users/:id/', ensureAuthenticated.admin, userController.deleteUser);

  app.get('/api/users/:id/topics/', ensureAuthenticated(), userController.getTopics);
  app.post('/api/users/:id/topics/', ensureAuthenticated(), userController.assignTopic);

  app.get('/api/user/', ensureAuthenticated(), userController.redirectUser);
  app.get('/api/user/:resource/', ensureAuthenticated(), userController.redirectUserResource);

};
