const express = require('express');
const router = express.Router();
const { getCart, updateCart } = require('../controllers/cart');

// Get a user's cart
router.get('/:userId', getCart);

// Update or create a user's cart
router.put('/:userId', updateCart);

module.exports = router;
