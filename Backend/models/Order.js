const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  address: {
    name: String,
    phone: String,
    line: String,
    pincode: String,
  },
  paymentId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
