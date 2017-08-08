/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be NOT accessed by user, such as api
*/

// TODO: find better name for module

function ensureAuthenticated(types = [0, 1, 2]) {

  return function(req, res, next) {
    if (req.user) {
      if (types.indexOf(req.user.type) > -1) {
        return next();
      }
    }
    res.status(403).json({ message: 'Requires authentication' });
  };

}

module.exports = ensureAuthenticated;

module.exports.student = ensureAuthenticated([0]);
module.exports.teacher = ensureAuthenticated([1]);
module.exports.admin = ensureAuthenticated([2]);
