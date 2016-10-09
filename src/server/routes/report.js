const sendReport = require('../controllers/send-report');
const ensureAuthenticated = require('../middleware/ensure-authenticated');

module.exports = function(app) {
  app.post('/api/report/', ensureAuthenticated(), sendReport);
};
