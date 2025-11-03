const Product = require("../models/product");

const adjustStock = async (order, previousStatus, newStatus) => {
    for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (!product) continue;

        // Delivered: decrease stock if previously not delivered
        if (newStatus === "Delivered" && previousStatus !== "Delivered") {
            product.stock = Math.max(0, product.stock - item.quantity);
        }

        // Cancelled after being delivered: restore stock
        if (newStatus === "Cancelled" && previousStatus === "Delivered") {
            product.stock += item.quantity;
        }

        await product.save();
    }
};

module.exports = adjustStock;