const express = require('express');
const passport = require('passport');

module.exports = function(app) {

  app.use('/', express.static('src/client/home'));

  app.get('/auth/', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/callback/', passport.authenticate('google', {
    successRedirect: '/auth/success/',
    failureRedirect: '/',
  }));

  app.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
