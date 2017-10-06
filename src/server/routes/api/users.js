const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const wrapAsync = require('../../helpers/wrap-async');

const userController = require('../../controllers/users');

module.exports = function(router) {

  router.get('/users/', ensureAuthenticated([1, 2]), wrapAsync(userController.getUsers));
  router.post('/users/', ensureAuthenticated.admin, wrapAsync(userController.createUser));

  router.patch('/users/:id/', ensureAuthenticated.admin, wrapAsync(userController.updateUser));
  // getUser responds with 403 if req.user is student and is not requesting itself
  router.get('/users/:id/', ensureAuthenticated(), wrapAsync(userController.getUser));
  router.delete('/users/:id/', ensureAuthenticated.admin, wrapAsync(userController.deleteUser));

  router.get('/users/:id/topics/', ensureAuthenticated(), wrapAsync(userController.getTopics));
  router.post('/users/:id/topics/', ensureAuthenticated(), wrapAsync(userController.assignTopic));

  router.get('/user/', ensureAuthenticated(), userController.redirectUser);
  router.get('/user/:resource/', ensureAuthenticated(), userController.redirectUserResource);

};
