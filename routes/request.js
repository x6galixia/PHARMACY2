const express = require('express');
const router = express.Router();
const pool = require('../models/databases/pg');

router.get('/', checkAuthenticated, (req, res) => {
  res.render('request')
})

//route to request medicine
router.post('/requets', checkAuthenticated, (req, res) => {
  try {
    
    
  } catch (err) {
    console.log(err.messages)
  }
} )

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
} 

module.exports = router;