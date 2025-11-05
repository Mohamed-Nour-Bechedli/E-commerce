require('dotenv').config();
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const adminRouter = require("./routes/adminRouter");
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

// middlewares
const allowedOrigins = [
    "http://localhost:5173", 
    "https://e-commerce-frontend-d2oc.onrender.com", 
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin', adminRouter);

// Connect to database
db();

const port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})