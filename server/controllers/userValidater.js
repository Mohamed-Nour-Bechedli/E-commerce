const { check, validationResult } = require('express-validator');

const registerValidation = [
    check('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Name must contain only letters, spaces, hyphens, or accents'),

    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    check('password')
        .notEmpty().withMessage("Password is required")
        .isStrongPassword().withMessage(
            "Password must be at least 8 characters long and include 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol"
        )
];

const loginValidation = [
    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    check('password')
        .notEmpty().withMessage("Password is required")
];

const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { registerValidation, loginValidation, validateUser };
