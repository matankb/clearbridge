const ensureAuthenticated = require('../../middleware/ensure-authenticated');

const userController = require('../../controllers/users');

module.exports = function(router) {

  router.get('/users/', ensureAuthenticated([1, 2]), userController.getUsers);
  router.post('/users/', ensureAuthenticated.admin, userController.createUser);

  router.patch('/users/:id/', ensureAuthenticated.admin, userController.updateUser);
  router.get('/users/:id/', ensureAuthenticated([1, 2]), userController.getUser);
  router.delete('/users/:id/', ensureAuthenticated.admin, userController.deleteUser);

  router.get('/users/:id/topics/', ensureAuthenticated(), userController.getTopics);
  router.post('/users/:id/topics/', ensureAuthenticated(), userController.assignTopic);

  router.get('/user/', ensureAuthenticated(), userController.redirectUser);
  router.get('/user/:resource/', ensureAuthenticated(), userController.redirectUserResource);

};
