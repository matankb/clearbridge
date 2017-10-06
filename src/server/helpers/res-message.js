function unauthenticated(res) {
  res.status(403).json({ message: 'Requires authentication' });
}

module.exports.unauthenticated = unauthenticated;
