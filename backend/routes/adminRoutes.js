const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ==========================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// ==========================================

router.get(
    "/bookings",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const bookings = await Booking.find()
                .populate("user", "name email")
                .sort({
                    createdAt: -1
                });

            res.status(200).json({
                message: "All bookings fetched successfully",
                count: bookings.length,
                bookings
            });

        } catch (error) {

            console.error(
                "Admin Get Bookings Error:",
                error.message
            );

            res.status(500).json({
                message: "Server error"
            });
        }
    }
);


// ==========================================
// GET ALL USERS
// GET /api/admin/users
// ==========================================

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const users = await User.find()
                .select("-password")
                .sort({
                    createdAt: -1
                });

            res.status(200).json({
                message: "All users fetched successfully",
                count: users.length,
                users
            });

        } catch (error) {

            console.error(
                "Admin Get Users Error:",
                error.message
            );

            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

// ==========================================
// GET ALL USERS
// GET /api/admin/users
// ==========================================

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const users = await User.find()
                .select("-password")
                .sort({
                    createdAt: -1
                });


            res.status(200).json({

                message:
                    "Users fetched successfully",

                count: users.length,

                users

            });

        } catch (error) {

            console.error(
                "Admin Get Users Error:",
                error.message
            );


            res.status(500).json({

                message: "Server error"

            });

        }

    }
);

// ==========================================
// GET ADMIN STATISTICS
// GET /api/admin/statistics
// ==========================================

router.get(
    "/statistics",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const totalUsers =
                await User.countDocuments();


            const totalBookings =
                await Booking.countDocuments();


            const bookings =
                await Booking.find();


            const totalBudget =
                bookings.reduce(
                    (total, booking) => {

                        return total +
                            Number(
                                booking.budget || 0
                            );

                    },
                    0
                );


            const destinationCounts = {};


            bookings.forEach(
                booking => {

                    const destination =
                        booking.destination;

                    if (!destination) {
                        return;
                    }

                    if (
                        !destinationCounts[
                            destination
                        ]
                    ) {

                        destinationCounts[
                            destination
                        ] = 0;

                    }

                    destinationCounts[
                        destination
                    ]++;

                }
            );


            res.status(200).json({

                message:
                    "Statistics fetched successfully",

                totalUsers,

                totalBookings,

                totalBudget,

                destinationCounts

            });


        } catch (error) {

            console.error(
                "Admin Statistics Error:",
                error.message
            );


            res.status(500).json({

                message: "Server error"

            });

        }

    }
);

module.exports = router;