const router = require("express").Router();
const { getDashboardStats } = require("../controllers/adminController");
const authUser = require("../middlewares/authUser");
const authRole = require("../middlewares/authRole");

router.get("/dashboard-stats", authUser, authRole, getDashboardStats);

module.exports = router;
