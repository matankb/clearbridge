const Analytic = require('../models/Analytic');

module.exports = (req, res, next) => {
  const a = new Analytic();
  a.user = req.user._id;
  a.path = req.originalUrl;
  a.timestamp = new Date().toUTCString();
  a.save();
  next();
};
