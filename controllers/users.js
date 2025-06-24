const { getDb } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const db = getDb();
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const result = await db.collection('users').insertOne({ name, email, password: hashedPassword, role: 'user' });
    res.status(201).json({ message: 'User registered', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
