const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const wrapAsync = require('../../helpers/wrap-async');

const searchController = require('../../controllers/search');

module.exports = function (router) {
  router.get('/search/', ensureAuthenticated.student, wrapAsync(searchController.search));
};
