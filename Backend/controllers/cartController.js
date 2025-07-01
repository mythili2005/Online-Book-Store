// controllers/cartController.js
const Cart = require('../models/Cart');

exports.saveCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const existing = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true }
    );
    res.json(existing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save cart' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.bookId');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load cart' });
  }
};
