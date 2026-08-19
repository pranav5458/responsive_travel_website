const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully ✅",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Registration Error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get("/test", (req, res) => {
    res.json({
        message: "Auth route is working"
    });
});


// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

      // Create JWT token
const token = jwt.sign(
    {
        id: user._id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

// Login successful
res.status(200).json({
    message: "Login successful ✅",
    token: token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});

    } catch (error) {
        console.error("Login Error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;