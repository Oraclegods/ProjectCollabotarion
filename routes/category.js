const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/category');

// Get all product categories
router.get('/', getAll);

// Create a new category
router.post('/', create);

module.exports = router;
