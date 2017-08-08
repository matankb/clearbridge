/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be accessed by user, such as dashboard
*/
const path = require('path');

const { getTypeName } = require('../helpers/user');
const { getFullUrl } = require('../helpers/url');

function loginProtected(types = [0, 1, 2]) {

  return function(req, res, next) {

    const returnUrl = encodeURIComponent(getFullUrl(req));

    if (req.user) {
      if (types.indexOf(req.user.type) > -1) {
        next();
      } else {
        res.render(path.resolve(__dirname, '../../../public/errors/403.ejs'), {
          allowedTypes: getTypeName(types),
          returnTo: returnUrl,
        });
      }
    } else {
      res.redirect(`/auth/?returnTo=${returnUrl}`);
    }

  };

}

module.exports = loginProtected;

module.exports.student = loginProtected([0]);
module.exports.teacher = loginProtected([1]);
module.exports.admin = loginProtected([2]);
