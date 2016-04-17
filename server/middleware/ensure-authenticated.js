/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be NOT accessed by user, such as api
*/

// TODO: find better name for module

function ensureUserType(req, res, next, type) {
  if (!req.user) {
    return res.status(403).end();
  }
  if (req.user.type === type) {
    next();
  } else {
    res.status(403).end();
  }
}

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).end();
  }
};

module.exports.student = function(req, res, next) { ensureUserType(req, res, next, 0); };
module.exports.teacher = function(req, res, next) { ensureUserType(req, res, next, 1); };
module.exports.admin = function(req, res, next) { ensureUserType(req, res, next, 2); };
