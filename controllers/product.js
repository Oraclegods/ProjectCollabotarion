const { getDb } = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.create = async (req, res) => {
  try {
    const db = getDb();
    const product = req.body;
    const result = await db.collection('products').insertOne(product);
    res.status(201).json({ message: 'Product added', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};
