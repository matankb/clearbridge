const sendReport = require('../../controllers/send-report');
const ensureAuthenticated = require('../../middleware/ensure-authenticated');

module.exports = function(router) {
  router.post('/report/', ensureAuthenticated(), sendReport);
};
