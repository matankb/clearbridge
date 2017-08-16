const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const wrapAsync = require('../../helpers/wrap-async');

const askController = require('../../controllers/ask');

module.exports = function (router) {

  router.get('/asks/', ensureAuthenticated([1, 2]), wrapAsync(askController.getAsks));
  router.post('/asks/', ensureAuthenticated(), wrapAsync(askController.createAsk));

};
