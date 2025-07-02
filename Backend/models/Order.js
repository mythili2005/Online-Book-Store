const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      _id: String,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  address: {
    name: String,
    phone: String,
    line: String,
    pincode: String,
  },
  razorpay_order_id: String,
  razorpay_payment_id: String,
}, {
  timestamps: true, // 👈 this gives you createdAt field!
});

module.exports = mongoose.model("Order", orderSchema);
