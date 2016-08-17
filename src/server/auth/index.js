module.exports = function(app) {

  const passport = require('passport');

  const serialize = require('./serialize');
  const strategies = require('./strategies');

  app.use(passport.initialize());
  app.use(passport.session());

  serialize(passport);
  strategies(passport);

};
