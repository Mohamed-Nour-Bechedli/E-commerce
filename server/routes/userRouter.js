const router = require('express').Router();
const { login, register, verifyEmail, getAllUsers, getProfile, updateProfile, updateProfileImage } = require('../controllers/userController');
const { registerValidation, validateUser, loginValidation } = require('../controllers/userValidater');
const { updateValidation, validateUpdate } = require('../controllers/updateValidater');
const upload = require('../middlewares/upload');
const authUser = require('../middlewares/authUser');
const authRole = require('../middlewares/authRole');

// Register route
router.post('/register', upload.single('image'), registerValidation, validateUser, register);
router.get('/verify/:token', verifyEmail);

// Profile routes
router.get('/profile', authUser, getProfile);
router.put('/profile', authUser, upload.single('image'), updateValidation, validateUpdate, updateProfile);

// route for profile image only
router.put('/profile/image', authUser, upload.single('image'), updateProfileImage);

// Get all users (admin only)
router.get('/', authUser, authRole, getAllUsers);

// Login route
router.post('/login', loginValidation, validateUser, login);

module.exports = router;
