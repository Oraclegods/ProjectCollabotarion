const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({token,name: user.name,role: user.role});
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
};
// Update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    let updateFields = {
      name: req.body.name,
      email: req.body.email
    };
    if (req.body.role && req.user?.role === 'admin') {
      updateFields.role = req.body.role;
    }
    if (req.body.password) {
      updateFields.password = await bcrypt.hash(req.body.password, 10);
    }
    const result = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Update failed" });
  }
};
// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Get users error:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
// (admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Get user error:", err.message);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
// (admin only)
const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {register, login, updateUser, getAllUsers, getUserById, deleteUser};