const router = require('express').Router();
const {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    getOrderById,
    cancelOrder
} = require('../controllers/orderController');
const authRole = require('../middlewares/authRole');
const authUser = require('../middlewares/authUser');

// Admin route 
router.get('/all', authUser, authRole, getAllOrders);
router.put('/:id/status', authUser, authRole, updateOrderStatus);

// User routes
router.post('/', authUser, createOrder);
router.get('/', authUser, getUserOrders);
router.get('/:id', authUser, getOrderById);
router.put('/:id/cancel', authUser, cancelOrder);

module.exports = router;
