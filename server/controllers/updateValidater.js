const { check, validationResult } = require('express-validator');

const updateValidation = [
    check('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name must contain only letters, spaces, or hyphens'),

    check('email')
        .optional()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Invalid email format'),

    check('password')
        .optional()
        .isStrongPassword().withMessage(
            "Password must be at least 8 characters long and include 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol"
        ),

    check('image')
        .optional()
        .isString().withMessage("Image must be a valid string URL or path")
];

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { updateValidation, validate };
