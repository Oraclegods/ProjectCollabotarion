const express = require('express');
const router = express.Router();
const { submit, getByProduct } = require('../controllers/review');

// Submit a product review
router.post('/', submit);

// Get reviews for a specific product
router.get('/:productId', getByProduct);

module.exports = router;
