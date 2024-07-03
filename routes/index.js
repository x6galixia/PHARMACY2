const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { username: req.user.name, userType: req.user.usertype });
});

router.post('/', checkAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
