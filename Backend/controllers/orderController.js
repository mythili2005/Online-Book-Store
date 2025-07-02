const crypto = require("crypto");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount, // optional here
      userId,
      address,
    } = req.body;

    // Step 1: Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Step 2: Save the order
    const newOrder = new Order({
      userId,
      items: cartItems.map(item => ({
        bookId: item._id,
        quantity: item.quantity,
      })),
      address,
      paymentId: razorpay_payment_id,
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ success: false, message: "Server error while placing order" });
  }
};
