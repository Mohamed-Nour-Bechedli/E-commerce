const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');
const deleteFromCloudinary = require('../utils/cloudinaryDelete');
const fs = require('fs');
const path = require('path');

// Create a new product (upload image to Cloudinary)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, stock, brand, salePrice, isNew, isFeatured } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        let imageUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads/products',
                transformation: [{ width: 800, height: 800, crop: "limit" }]
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path); 
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            subCategory,
            stock,
            brand,
            salePrice,
            isNew,
            isFeatured,
            image: imageUrl
        });

        res.status(201).json({
            ...newProduct.toObject(),
            image: newProduct.image
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update product (replace image in Cloudinary if new one uploaded)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const { name, description, price, category, subCategory, stock, brand, salePrice, isNew, isFeatured } = req.body;

        if (req.file) {
            // Delete old Cloudinary image
            if (product.image) await deleteFromCloudinary(product.image);

            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads/products',
                transformation: [{ width: 800, height: 800, crop: "limit" }]
            });
            product.image = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (subCategory !== undefined) product.subCategory = subCategory;
        if (stock) product.stock = stock;
        if (brand) product.brand = brand;
        if (salePrice) product.salePrice = salePrice;
        if (isNew !== undefined) product.isNew = isNew;
        if (isFeatured !== undefined) product.isFeatured = isFeatured;

        await product.save();

        res.status(200).json({
            ...product.toObject(),
            image: product.image
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to update product" });
    }
};

// Delete product (remove from Cloudinary + DB)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        if (product.image) await deleteFromCloudinary(product.image);

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Delete product failed" });
    }
};

// Upload endpoint 
const uploadSingle = async (req, res) => {
    try {
        res.json({ file: req.file, body: req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadSingle
};
