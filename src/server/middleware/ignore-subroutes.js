/*
  Treats /root/* as /root
*/

module.exports = function (req, res, next) {
  if (req.url !== '/') {
    req.url = '/';
    req.path = '/';
  }
  next();
};
