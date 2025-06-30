const express = require('express');
const router = express.Router();
const { create, getAll } = require('../controllers/admin');

// Create a new admin user
router.post('/', create);

// Get all admin users
router.get('/', getAll);

module.exports = router;
