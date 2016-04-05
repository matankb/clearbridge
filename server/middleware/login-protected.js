/* NOTE: login-protected middleware redirects to login if not authenticated
 * whearas ensure-authenticated ends request if not authenticated
 * This module to be used in protected routes that will be accessed by user, such as dashboard
*/

// TODO: find better name for module

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};
