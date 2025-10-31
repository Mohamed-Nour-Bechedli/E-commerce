const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).json({ message: 'No token provided' });

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // support both id and _id in JWT
        const userId = decoded.id || decoded._id;
        const user = await User.findById(userId);
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user; // req.user.role now exists
        next();
    } catch (error) {
        console.error('authUser error:', error);
        res.status(401).json({ message: 'Invalid Token', error: error.message });
    }
};

module.exports = authUser;
