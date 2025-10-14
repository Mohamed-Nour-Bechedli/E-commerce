const router = require('express').Router();
const {login, register, verifyEmail, getAllUsers, getProfile, updateProfile} = require('../controllers/userController');
const {registerValidation, validateUser, loginValidation} = require('../controllers/userValidater');
const {updateValidation, validateUpdate} = require('../controllers/updateValidater');
const authUser = require('../middlewares/authUser');
const authRole = require('../middlewares/authRole');

// Register route
router.post('/register', registerValidation, validateUser, register);
router.get('/verify/:token', verifyEmail);

// Profile route
router.get('/profile', authUser, getProfile);
router.put('/profile', authUser,updateValidation, validateUpdate, updateProfile);

// Get all users (admin only)
router.get('/', authUser, authRole, getAllUsers);

// Login route
router.post('/login',loginValidation, validateUser, login);

module.exports = router;


