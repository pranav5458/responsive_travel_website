const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes =require("./routes/adminRoutes");
dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

app.use("/api", protectedRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Travel Explorer Backend is Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://10.84.57.106:${PORT}`);
});