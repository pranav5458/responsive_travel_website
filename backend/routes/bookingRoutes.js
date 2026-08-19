const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================

router.post("/", authMiddleware, async (req, res) => {
    try {

        const {
            fullName,
            email,
            phone,
            destination,
            city,
            placesToVisit,
            travelDate,
            returnDate,
            travelers,
            hotel,
            budget,
            specialRequests
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !fullName ||
            !email ||
            !phone ||
            !destination ||
            !city ||
            !placesToVisit ||
            !travelDate ||
            !returnDate ||
            !travelers ||
            budget === undefined
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields"
            });
        }


        // ==========================================
        // CHECK DATES
        // ==========================================

        if (new Date(returnDate) <= new Date(travelDate)) {

            return res.status(400).json({
                message: "Return date must be after departure date"
            });

        }


        // ==========================================
        // CREATE BOOKING
        // ==========================================

        const booking = await Booking.create({

            user: req.user.id,

            fullName,
            email,
            phone,

            destination,
            city,
            placesToVisit,
            travelDate,
            returnDate,

            travelers,

            hotel,

            budget,

            specialRequests

        });


        // ==========================================
        // SUCCESS RESPONSE
        // ==========================================

        res.status(201).json({

            message: "Booking created successfully ✅",

            booking

        });


    } catch (error) {

        console.error(
            "Create Booking Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }
});


// ==========================================
// GET MY BOOKINGS
// GET /api/bookings
// ==========================================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });


        res.status(200).json({

            message: "Bookings fetched successfully ✅",

            count: bookings.length,

            bookings

        });


    } catch (error) {

        console.error(
            "Get Bookings Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
// ==========================================

router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const booking = await Booking.findOne({

            _id: req.params.id,

            user: req.user.id

        });


        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }


        res.status(200).json({

            message: "Booking fetched successfully ✅",

            booking

        });


    } catch (error) {

        console.error(
            "Get Single Booking Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ==========================================
// DELETE / CANCEL BOOKING
// DELETE /api/bookings/:id
// ==========================================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const booking = await Booking.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id

        });


        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }


        res.status(200).json({

            message: "Booking cancelled successfully ✅"

        });


    } catch (error) {

        console.error(
            "Delete Booking Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;