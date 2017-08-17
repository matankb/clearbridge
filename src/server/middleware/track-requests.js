const Analytic = require('../models/Analytic');

module.exports = (req, res, next) => {
  const a = new Analytic();

  if (req.user) {
    a.user = req.user._id;
  } else {
    a.user = null;
  }
  a.path = req.originalUrl;
  a.timestamp = new Date().toUTCString();

  a.save();

  next();
};
