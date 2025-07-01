// controllers/orderController.js
const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, address, paymentId } = req.body;
    const order = new Order({ userId, items, address, paymentId });
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};
