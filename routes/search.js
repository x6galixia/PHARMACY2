const express = require('express');
const router = express.Router();
const pool = require('../models/databases/pg'); 

router.post('/search', async (req, res) => {
  try {
    const { search } = req.body; // Access the 'search' field from req.body
    console.log('Searching for item:', search); // Log the search term

    // Query to search the inventory
    const searchResult = await pool.query("SELECT * FROM inventory WHERE item_name ILIKE $1", [`%${search}%`]);

    let result = [];

    if (searchResult.rows.length > 0) {
      result = searchResult.rows.map(item => ({
        itemName: item.item_name,
        brand: item.brand,
        manufacturer: item.manufacturer,
        dosage: item.dosage,
        expiration: formatDate(item.expiration),
        quantity: item.quantity
      }));
    } else {
      console.log('No results found for:', search); // Log if no results are found
    }

    res.render('index', {
      username: req.user.name,
      userType: req.user.usertype,
      viewList: result
    });
    
  } catch (err) {
    console.error('Error searching inventory:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Helper function to format date
function formatDate(dateString) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

module.exports = router; 