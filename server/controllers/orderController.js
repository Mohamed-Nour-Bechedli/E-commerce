const Order = require('../models/order');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const userId = req.user._id;

        if(!products || products.length === 0) {
            return res.status(400).json({ message : "No products in the order." });
        };

        const newOrder = new Order({
            user : userId,
            products,
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message : "Order created successfully.", order : savedOrder });

    } catch (error) {
        res.status(500).json({ message : "Server Error", error : error.message });
    }
};

// Get orders for a user
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user : req.user._id }).sort({ createAt : -1 });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message : "Server Error", error : error.message });
    }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt : -1 }).populate('user', 'name email');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message : "Server Error", error : error.message });
    }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = [ "Pending", "Processing", "Shipped", "Delivered" ];
        if(!validStatus.includes(status)) {
            return res.status(400).json({ message : "Invalid status value." }); 
        }

        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).json({ message : "Order not found."});
        }

        order.status = status;
        const updatedOrder = await Order.save();

        res.status(200).json({ updatedOrder });

    } catch (error) {
        res.status(500).json({ message : "Server Error", error : error.message });
    }
};

module.exports = { createOrder, getAllOrders, getUserOrders, updateOrderStatus};