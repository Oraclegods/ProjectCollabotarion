const { getDb } = require('../config/database');

exports.submit = async (req, res) => {
  try {
    const db = getDb();
    const review = req.body;
    const result = await db.collection('reviews').insertOne(review);
    res.status(201).json({ message: 'Review submitted', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
};

exports.getByProduct = async (req, res) => {
  try {
    const db = getDb();
    const reviews = await db.collection('reviews').find({ productId: req.params.productId }).toArray();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
