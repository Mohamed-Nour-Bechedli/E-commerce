const router = require('express').Router();
const { createOrder, getAllOrders, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const authRole = require('../middlewares/authRole');
const authUser = require('../middlewares/authUser');

// User routes
router.post('/', authUser, createOrder);
router.get('/', authUser, getUserOrders);

// Admin routes
router.get('/all', authUser, authRole, getAllOrders);
router.put('/:id/status', authUser, authRole, updateOrderStatus);

module.exports = router;
