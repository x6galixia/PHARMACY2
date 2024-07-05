const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../models/databases/pg'); // Make sure to properly import your database pool

// Helper function to format date
function formatDate(dateString) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

// Middleware to check if user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Middleware to set user data in res.locals
function setUserData(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.username = req.user.name;
    res.locals.userType = req.user.usertype;
  } else {
    res.locals.username = null;
    res.locals.userType = null;
  }
  next();
}

router.use(setUserData);

// Route for the home page
router.get('/', checkAuthenticated, async (req, res) => {
  try {
    const viewItems = await pool.query("SELECT item_name, brand, manufacturer, dosage, expiration, quantity FROM inventory");
    let viewAll = [];
    
    if (viewItems.rows.length > 0) {
      viewAll = viewItems.rows.map(item => ({
        itemName: item.item_name,
        brand: item.brand,
        manufacturer: item.manufacturer,
        dosage: item.dosage,
        expiration: formatDate(item.expiration),
        quantity: item.quantity
      }));
      console.log(viewAll);
    }

    res.render('index', {
      viewList: viewAll
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for the login page
router.post('/', checkAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Route for adding stocks
router.get('/addstocks', checkAuthenticated, (req, res) => {
  res.render('inventory-add-stocks');
});

module.exports = router;
