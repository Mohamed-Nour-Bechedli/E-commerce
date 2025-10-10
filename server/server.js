require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

// middlewares
app.use(cors());
app.use(express.json());




// Connect to database
db()

port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})