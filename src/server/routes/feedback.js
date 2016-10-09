const sendFeedback = require('../controllers/send-feedback');
const ensureAuthenticated = require('../middleware/ensure-authenticated');

module.exports = function(app) {
  app.post('/api/feedback/', ensureAuthenticated(), sendFeedback);
};
