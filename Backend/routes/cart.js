// routes/cart.js
const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// Save cart
// POST /api/cart
router.post("/", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID missing" });

    await Cart.findOneAndUpdate(
      { userId },
      { items },
      { upsert: true, new: true } // ✅ Upsert to create if not exists
    );

    res.status(200).json({ message: "Cart saved successfully" });
  } catch (err) {
    console.error("❌ Error saving cart:", err);
    res.status(500).json({ message: "Failed to save cart" });
  }
});


// Load cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error("❌ Error loading cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
