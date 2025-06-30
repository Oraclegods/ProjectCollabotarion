const express = require('express');
const router = express.Router();
const { place, getUserOrders } = require('../controllers/order');

// Place a new order
router.post('/', place);

// Get orders by user ID
router.get('/:userId', getUserOrders);

module.exports = router;
