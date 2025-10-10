require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const app = express();




// Connect to database
db()

port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})