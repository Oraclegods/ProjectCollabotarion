const express = require('express');
const router = express.Router();
const userController = require("../controllers/usersController");
const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware"); 

// Public Routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected Routes
router.get("/", userController.getAllUsers);      // Admin only
router.get("/:id", userController.getUserById);                   // Authenticated user or admin
router.put("/:id", userController.updateUser);                    // Authenticated user or admin
router.delete("/:id", userController.deleteUser); // Admin only

module.exports = router;