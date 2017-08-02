const passport = require('passport');

const serialize = require('./serialize');
const strategies = require('./strategies');

module.exports = function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  // apply serialize and strategies to passport
  serialize(passport);
  strategies(passport);

};
