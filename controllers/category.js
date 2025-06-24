const { getDb } = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const categories = await db.collection('categories').find().toArray();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.create = async (req, res) => {
  try {
    const db = getDb();
    const category = req.body;
    const result = await db.collection('categories').insertOne(category);
    res.status(201).json({ message: 'Category added', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};
