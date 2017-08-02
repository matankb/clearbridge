exports.notFound = (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
};

// all four arguments must be accepted for express to recognize it as internal error handler
exports.internalError = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({
    message: 'Internal Server Error',
    details: `${err}`, // stringify error
  });
};
