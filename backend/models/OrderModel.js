// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order_type: {
    type: String,
    enum: ['market'], // extend later if needed
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  isAsk: {
    type: String,
    enum: ['long', 'short'], // clearer than boolean
    required: true,
  },
  orderIndex: {
    type: Number,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  marketIndex: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  leverage: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'cancelled'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
