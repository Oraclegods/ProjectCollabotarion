const { getDb } = require('../config/database');

exports.create = async (req, res) => {
  try {
    const db = getDb();
    const payment = req.body;
    const result = await db.collection('payments').insertOne(payment);
    res.status(201).json({ message: 'Payment recorded', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record payment' });
  }
};
