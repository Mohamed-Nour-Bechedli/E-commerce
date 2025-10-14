const Product = require('../models/product');
const path = require('path');
const fs = require('fs');


// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, brand, salePrice, isNew, isFeatured } = req.body;

        const imagePath = req.file ? path.join('uploads', req.file.filename).replace(/\\/g, '/') : null;

        if (!name || !description || !price || !category || !stock || !imagePath) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            brand,
            salePrice,
            isNew,
            isFeatured,
            image: imagePath
        });

        res.status(201).json({
            ...newProduct.toObject(),
            image: newProduct.image ? `${process.env.BASE_URL}${newProduct.image}` : null
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message });

    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const formattedProducts = products.map(product => ({
            ...product.toObject(),
            image: product.image ? `${process.env.BASE_URL}${product.image}` : null
        }));

        res.status(200).json(formattedProducts);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200); json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // If new image uploaded → delete old file
        if (req.file && product.image) {
            const oldPath = path.join(__dirname, "../", product.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            product.image = path.join("uploads", req.file.filename).replace(/\\/g, "/");
        }

        const { name, description, price, category, stock, brand, salePrice, isNew, isFeatured } = req.body;

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (stock) product.stock = stock;
        if (brand) product.brand = brand;
        if (salePrice) product.salePrice = salePrice;
        if (isNew !== undefined) product.isNew = isNew;
        if (isFeatured !== undefined) product.isFeatured = isFeatured;

        await product.save();

        res.status(200).json({
            ...product.toObject(),
            image: product.image ? `${process.env.BASE_URL}${product.image}` : null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "failed to update product" });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Delete image file if exists
        if (product.image) {
            const imagePath = path.join(__dirname, "../", product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete product from DB
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Delete product failed" });
    }
};

// file upload endpoint
const uploadSingle = async (req, res) => {
    try {
        res.json({ file: req.file, body: req.body })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, uploadSingle };
