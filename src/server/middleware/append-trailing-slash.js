/*
*  Appends a trailing slash to the url, then redirects
*/

const url = require('url');

module.exports = function(req, res, next) {
  const urlObj = url.parse(req.originalUrl);
  if (!urlObj.pathname.endsWith('/')) {
    urlObj.pathname += '/';
    res.redirect(url.format(urlObj));
  } else {
    next();
  }
};
