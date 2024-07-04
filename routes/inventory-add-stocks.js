const express = require('express');
const router = express.Router();
const pool = require('../models/databases/pg'); // Ensure the path is correct

// Middleware to check if user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
} 

// Route to render the inventory-add-stocks page
router.get('/addstocks', checkAuthenticated, (req, res) => {
  res.render('inventory-add-stocks');
});

// POST method to handle adding new stocks
router.post('/addstocks', checkAuthenticated, async (req, res) => { // Updated to match form action
  const { itemName, brand, manufacturer, dosage, expiration, quantity } = req.body;

  try {
    await pool.query(
      "INSERT INTO inventory (item_name, brand, manufacturer, dosage, expiration, quantity) VALUES ($1, $2, $3, $4, $5, $6)",
      [itemName, brand, manufacturer, dosage, expiration, quantity]
    );
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
