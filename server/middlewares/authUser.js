const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Access Denied, No token provided' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the full user from DB
        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user; 
        next();
    } catch (error) {
        console.error('authUser error:', error);
        res.status(401).json({ message: 'Invalid Token', error: error.message });
    }
};

module.exports = authUser;
