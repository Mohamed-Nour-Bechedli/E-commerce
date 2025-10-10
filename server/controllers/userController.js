const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


// Nodemailer transpoter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// Register a new user
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message : "User already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn : '1h' });

        const newUser = await new User({
            name,
            email,
            password : hashedPassword,
            verified : false
        }).save();

        const verifyURL = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

        // Send verification email
        const sendVerificationEmail = async () => {
            await transporter.sendMail({
                from : process.env.EMAIL_USER,
                to : newUser.email,
                subject : "verify your email",
                html : `<h3>Click <a href="${verifyURL}">here</a> to verify your email</h3>` 
            })
        };

        sendVerificationEmail();

        res.status(201).json({ message : "User registered successfully! Please verify your email to login." });
    } catch (error) {
        res.status(500).json({ message : "Server error", error : error.message });
    }
};