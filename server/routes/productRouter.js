const router = require('express').Router();
const { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, uploadSingle} = require('../controllers/productController');
const upload = require('../middlewares/upload');

// Get all products
router.get('/', getAllProducts);

// Create a new product
router.post('/', upload.single('image') ,createProduct);

// Get product by ID
router.get('/:id', getProductById);

// Update product
router.put('/:id', upload.single('image'), updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

// File upload endpoint
router.post('/upload', upload.single('image'), uploadSingle);

module.exports = router;