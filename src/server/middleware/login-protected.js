/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be accessed by user, such as dashboard
*/

// TODO: find better name for module

function loginProtectedType(req, res, next, type) {
  if (!req.user) {
    return res.redirect('/');
  }
  if (req.user.type === type) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports.student = function(req, res, next) { loginProtectedType(req, res, next, 0); };
module.exports.teacher = function(req, res, next) { loginProtectedType(req, res, next, 1); };
module.exports.admin = function(req, res, next) { loginProtectedType(req, res, next, 2); };
