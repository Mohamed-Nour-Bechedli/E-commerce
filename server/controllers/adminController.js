const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

// Admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    // 1️Count totals
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // 2️Aggregate order statuses
    const statusStats = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // 3️Get 5 most recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email") 
      .select("totalAmount status createdAt");

    // Format recent orders
    const formattedRecentOrders = recentOrders.map((order) => ({
      _id: order._id,
      customerName: order.user?.name || "Unknown User",
      total: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    }));

    // Return everything
    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      statusStats,
      recentOrders: formattedRecentOrders,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getDashboardStats };
