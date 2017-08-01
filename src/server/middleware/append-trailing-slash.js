/*
*  Appends a trailing slash to the url, then redirects
*/

module.exports = function(req, res, next) {
  const [url, query] = req.originalUrl.split('?');
  if (!url.endsWith('/')) {
    if (query) {
      res.redirect(`${url}/?${query}`);
    } else {
      res.redirect(`${url}/`);
    }
  } else {
    next();
  }
};
