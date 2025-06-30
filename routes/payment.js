const express = require('express');
const router = express.Router();
const { create } = require('../controllers/payment');

// Create a new payment record (simulation)
router.post('/', create);

module.exports = router;
