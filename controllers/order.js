const { getDb } = require('../config/database');

exports.place = async (req, res) => {
  try {
    const db = getDb();
    const order = req.body;
    order.status = 'pending';
    const result = await db.collection('orders').insertOne(order);
    res.status(201).json({ message: 'Order placed', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const db = getDb();
    const orders = await db.collection('orders').find({ userId: req.params.userId }).toArray();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
