const { getDb } = require('../config/database');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
  try {
    const db = getDb();
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('admins').insertOne({ name, email, password: hashedPassword, role: 'admin' });
    res.status(201).json({ message: 'Admin created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const admins = await db.collection('admins').find().toArray();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};
