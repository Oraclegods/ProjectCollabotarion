const { getDb } = require('../config/database');

exports.getCart = async (req, res) => {
  try {
    const db = getDb();
    const cart = await db.collection('cart').findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const db = getDb();
    const { userId } = req.params;
    const cart = req.body;
    await db.collection('cart').updateOne(
      { userId },
      { $set: cart },
      { upsert: true }
    );
    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};
