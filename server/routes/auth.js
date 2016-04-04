const express = require('express');
const passport = require('passport');

module.exports = function(app) {

  app.use('/login/', express.static('client/login'));

  app.get('/auth/', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/callback', passport.authenticate('google', {
    successRedirect: '/dashboard/',
    failureRedirect: '/login/',
  }));

  app.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
