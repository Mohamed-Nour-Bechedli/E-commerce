const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const path = require('path');


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
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imagePath = req.file ? path.join('uploads', req.file.filename).replace(/\\/g, '/') : null;

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const newUser = await new User({
            name,
            email,
            role,
            image: imagePath,
            password: hashedPassword,
            verified: false
        }).save();

        const verifyURL = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

        // Send verification email
        const sendVerificationEmail = async () => {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: newUser.email,
                subject: "verify your email",
                html: `<h3>Click <a href="${verifyURL}">here</a> to verify your email</h3>`
            })
        };

        sendVerificationEmail();

        res.status(201).json({ message: "User registered successfully! Please verify your email to login." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Verify user email
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by email
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // If already verified
        if (user.verified) {
            // Generate new auth token for login
            const authToken = user.generateAuthToken();
            return res.status(200).json({
                success: true,
                message: "Email already verified. Logged in automatically.",
                token: authToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                    verified: user.verified
                }
            });
        }

        // Mark as verified
        user.verified = true;
        await user.save();

        // Generate JWT for login
        const authToken = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            token: authToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                verified: user.verified
            }
        });
    } catch (error) {
        console.error("Verification error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ success: false, message: "Verification link expired" });
        }
        res.status(400).json({ success: false, message: "Invalid verification token" });
    }
};


// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: "Login sucessful" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const updateData = {};
        const image = req.file ? path.join('uploads', req.file.filename).replace(/\\/g, '/') : null;

        if (name) updateData.name = name;

        if (email) {
            const existingEmail = await User.findOne({ email, _id: { $ne: req.user._id } });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already in use" });
            }
            updateData.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        if (phone) updateData.phone = phone; 

        if (image) updateData.image = image;

        const update = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({ user: update, message: "User updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




module.exports = { register, login, verifyEmail, getAllUsers, getProfile, updateProfile };