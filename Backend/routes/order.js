const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const Order = require('../models/Order');
router.post('/place', orderController.placeOrder);

// GET /api/orders/:userId
router.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Failed to get orders:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;
