/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be NOT accessed by user, such as api
*/

// TODO: find better name for module

function ensureAuthenticated(types) {
  if ((types || []).length === 0) {
    return function(req, res, next) { // this function will only check for user
      if (req.user) {
        next();
      } else {
        res.status(403).json({ message: 'Requires authentication' });
      }
    };
  } else {
    return function(req, res, next) {
      if (req.user) {
        if (types.indexOf(req.user.type) > -1) {
          next();
        } else {
          res.status(403).json({ message: 'Requires authentication' });
        }
      } else {
        res.status(403).json({ message: 'Requires authentication' });
      }
    };
  }

}

module.exports = ensureAuthenticated;

module.exports.student = ensureAuthenticated([0]);
module.exports.teacher = ensureAuthenticated([1]);
module.exports.admin = ensureAuthenticated([2]);
