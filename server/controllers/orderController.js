const Order = require('../models/order');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, phone } = req.body; 

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products in the order." });
        }

        if (!phone || phone.trim() === "") {
            return res.status(400).json({ message: "Phone number is required." });
        }

        if (!req.user?._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const formattedProducts = products.map(p => ({
            productId: p.productId,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            image: p.image
        }));

        const newOrder = new Order({
            user: req.user._id,
            products: formattedProducts,
            totalAmount,
            phone, 
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order created successfully.",
            order: savedOrder
        });

    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Get orders for a user
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get single order by ID (user)
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return res.status(404).json({ message: "Order not found." });

        if (order.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "Access denied." });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// User cancels their own order
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return res.status(404).json({ message: "Order not found." });

        if (order.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "Access denied." });
        }

        if (order.status !== "Pending") {
            return res.status(400).json({ message: "Only pending orders can be cancelled." });
        }

        order.status = "Cancelled";
        await order.save();

        res.status(200).json({ message: "Order cancelled successfully.", order });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'user', select: 'name email', options: { lean: true } });

        // Safely handle deleted users
        const safeOrders = orders.map(order => ({
            ...order._doc,
            user: order.user || { name: "Deleted User", email: "N/A" },
        }));

        res.status(200).json({ orders: safeOrders });
    } catch (error) {
        console.error("Get all orders error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ["Pending", "Processing", "Shipped", "Delivered"];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found." });

        order.status = status;
        const updatedOrder = await order.save();

        res.status(200).json({ updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    getOrderById,
    cancelOrder
};
