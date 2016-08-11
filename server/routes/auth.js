const express = require('express');
const passport = require('passport');

module.exports = function(app) {

  app.use('/', express.static('client/home'));

  app.get('/auth/', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/callback/', passport.authenticate('google', {
    successRedirect: '/dashboard/',
    failureRedirect: '/',
  }));

  app.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
