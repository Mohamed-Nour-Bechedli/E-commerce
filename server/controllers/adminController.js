const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const mongoose = require("mongoose");

// Admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    // Count totals
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Aggregate order statuses
    const statusStats = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .select("totalAmount status createdAt");

    const formattedRecentOrders = recentOrders.map((order) => ({
      _id: order._id,
      customerName: order.user?.name || "Unknown User",
      total: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    }));

    // Revenue only from delivered orders
    const deliveredOrders = await Order.find({ status: "Delivered" });

    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Last 30 days revenue
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);

    const last30DaysOrders = deliveredOrders.filter(
      (o) => o.createdAt >= thirtyDaysAgo
    );
    const prev30DaysOrders = deliveredOrders.filter(
      (o) => o.createdAt >= sixtyDaysAgo && o.createdAt < thirtyDaysAgo
    );

    const current30DaysRevenue = last30DaysOrders.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    );
    const previous30DaysRevenue = prev30DaysOrders.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    );

    // Yearly revenue
    const yearlyRevenue = await Order.aggregate([
      { $match: { status: "Delivered" } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    // Monthly revenue (last 12 months)
    const firstMonth = new Date(today.getFullYear(), today.getMonth() - 11, 1);
    const monthlyRevenue = await Order.aggregate([
      { $match: { status: "Delivered", createdAt: { $gte: firstMonth } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      statusStats,
      recentOrders: formattedRecentOrders,
      totalRevenue,
      current30DaysRevenue,
      previous30DaysRevenue,
      yearlyRevenue,
      monthlyRevenue,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Update order status & adjust stock
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const previousStatus = order.status;
    order.status = status;
    await order.save();

    // Decrease stock if delivered
    if (status === "Delivered" && previousStatus !== "Delivered") {
      for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (!product) continue;
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
      }
    }

    // Restore stock if cancelled after being delivered
    if (status === "Cancelled" && previousStatus === "Delivered") {
      for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (!product) continue;
        product.stock += item.quantity;
        await product.save();
      }
    }

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getDashboardStats, updateOrderStatus };
