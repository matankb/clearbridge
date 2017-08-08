exports.getFullUrl = function(req) {
  return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
};
