/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be accessed by user, such as dashboard
*/
const path = require('path');

const { getTypeName } = require('../helpers/user');

function loginProtected(types) {
  if ((types || []).length === 0) {
    return function(req, res, next) { // this function will only check for user
      if (req.user) {
        next();
      } else {
        res.redirect('/auth/');
      }
    };
  } else {
    return function(req, res, next) {
      if (req.user) {
        if (types.indexOf(req.user.type) > -1) {
          next();
        } else {
          res.render(path.resolve(__dirname, '../../../public/errors/403.ejs'), {
            allowedTypes: getTypeName(types),
          });
        }
      } else {
        res.redirect('/auth/');
      }
    };
  }

}

module.exports = loginProtected;

module.exports.student = loginProtected([0]);
module.exports.teacher = loginProtected([1]);
module.exports.admin = loginProtected([2]);
