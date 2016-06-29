// handles errors from mongoose query
// to be used in .catch()
function handleErrors(res) {
  return function(err) {
    if (err) {
      return res
              .status(500)
              .json(err);
    } else {
      return;
    }
  };
}

function handleNotFound(res) {
  return res.status(404).json({
    message: 'Not Found',
  });
}

module.exports.handleErrors = handleErrors;
module.exports.handleNotFound = handleNotFound;
