// routes/OrderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrder,
  deleteOrder
} = require('../controllers/OrderController');

// Routes
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', getOrdersByUser);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
