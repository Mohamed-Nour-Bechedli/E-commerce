const router = require('express').Router();
const {login, register, verifyEmail} = require('../controllers/userController');
const {registerValidation, validate} = require('../controllers/userValidater');
const authUser = require('../middlewares/authUser');
const authRole = require('../middlewares/authRole');

// Register route
router.post('/register', registerValidation, validate, register);
router.get('/verify/:token', verifyEmail);

// Login route
router.post('/login', login);


