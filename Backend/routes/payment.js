const express = require('express');
const crypto = require('crypto');
const razorpay = require('../utils/razorpay');
const Order = require('../models/Order');

const router = express.Router();

// ✅ Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // in paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// ✅ Verify Razorpay payment and save order
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      cartItems,
      totalAmount,
      address,
    } = req.body;

    // Check Razorpay Signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Save order to MongoDB
    const newOrder = new Order({
      userId,
      cartItems,
      totalAmount,
      address,
      razorpay_order_id,
      razorpay_payment_id,
    });

    await newOrder.save();

    res.json({ message: "Payment verified & order saved!" });
  } catch (err) {
    console.error("Verification error:", err.message);
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
});

module.exports = router;
