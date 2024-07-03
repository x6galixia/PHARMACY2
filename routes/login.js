const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

router.post('/', checkNotAuthenticated, passport.authenticate('local', 
  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }
))

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router
