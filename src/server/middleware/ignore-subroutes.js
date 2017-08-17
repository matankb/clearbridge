/*
  Treats /root/* as /root
*/

module.exports = function (req, res, next) {
  req.url = '/';
  req.path = '/';
  next();
};
