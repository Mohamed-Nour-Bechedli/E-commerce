require('dotenv').config();
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


// Connect to database
db();

const port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})