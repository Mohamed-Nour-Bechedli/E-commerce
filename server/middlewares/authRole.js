
const authRole = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = authRole;

