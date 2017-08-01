/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be accessed by user, such as dashboard
*/

function loginProtected(types) {
  if ((types || []).length === 0) {
    return function(req, res, next) { // this function will only check for user
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    };
  } else {
    return function(req, res, next) {
      if (req.user) {
        if (types.indexOf(req.user.type) > -1) {
          next();
        } else {
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    };
  }

}

module.exports = loginProtected;

module.exports.student = loginProtected([0]);
module.exports.teacher = loginProtected([1]);
module.exports.admin = loginProtected([2]);
