const Order = require('../models/OrderModel');

// Create new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, updatedOrder });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
};
