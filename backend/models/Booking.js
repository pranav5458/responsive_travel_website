const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },
        placesToVisit: {
            type: [String],
            default: []
        },

        travelDate: {
            type: Date,
            required: true
        },

        returnDate: {
            type: Date,
            required: true
        },

        travelers: {
            type: Number,
            required: true,
            min: 1
        },

        hotel: {
            type: String,
            trim: true
        },

        budget: {
            type: Number,
            required: true,
            min: 0
        },

        specialRequests: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;