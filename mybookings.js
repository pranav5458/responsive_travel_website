// ==========================================
// MY BOOKINGS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadBookings();

});


// ==========================================
// LOAD BOOKINGS
// ==========================================

async function loadBookings() {

    const token = localStorage.getItem("token");

    const loadingMessage =
        document.getElementById("loadingMessage");

    const errorMessage =
        document.getElementById("errorMessage");

    const bookingsContainer =
        document.getElementById("bookingsContainer");

    const noBookings =
        document.getElementById("noBookings");


    // ------------------------------------------
    // CHECK LOGIN
    // ------------------------------------------

    if (!token) {

        window.location.href = "login.html";

        return;

    }


    try {

        const response = await fetch(
            "http://https://responsive-travel-website-wq53.onrender.com//api/bookings",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        // ------------------------------------------
        // CHECK RESPONSE
        // ------------------------------------------

        if (!response.ok) {

            throw new Error(
                data.message || "Unable to load bookings."
            );

        }


        // ------------------------------------------
        // HIDE LOADING
        // ------------------------------------------

        loadingMessage.style.display = "none";


        // ------------------------------------------
        // CHECK BOOKINGS
        // ------------------------------------------

        if (!data.bookings || data.bookings.length === 0) {

            noBookings.style.display = "block";

            return;

        }


        noBookings.style.display = "none";


        // ------------------------------------------
        // DISPLAY BOOKINGS
        // ------------------------------------------

        data.bookings.forEach(function (booking) {

            const card =
                createBookingCard(booking);

            bookingsContainer.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Load Bookings Error:",
            error
        );

        loadingMessage.style.display = "none";

        errorMessage.textContent =
            error.message ||
            "Unable to load your bookings.";

        errorMessage.style.display = "block";

    }

}


// ==========================================
// CREATE BOOKING CARD
// ==========================================

function createBookingCard(booking) {

    const card =
        document.createElement("div");

    card.className =
        "booking-card";


    // ------------------------------------------
    // FORMAT DATES
    // ------------------------------------------

    const departureDate =
        booking.travelDate
            ? new Date(
                booking.travelDate
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            )
            : "Not specified";


    const returnDate =
        booking.returnDate
            ? new Date(
                booking.returnDate
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            )
            : "Not specified";


    // ------------------------------------------
    // PLACES
    // ------------------------------------------

    let placesHTML =
        "Not selected";


    if (
        booking.placesToVisit &&
        booking.placesToVisit.length > 0
    ) {

        placesHTML =
            booking.placesToVisit
                .map(function (place) {

                    return `
                        <span class="place-tag">
                            ${place}
                        </span>
                    `;

                })
                .join("");

    }


    // ------------------------------------------
    // BUDGET
    // ------------------------------------------

    const budget =
        booking.budget !== undefined
            ? Number(
                booking.budget
            ).toLocaleString(
                "en-IN"
            )
            : "Not specified";


    // ------------------------------------------
    // CARD HTML
    // ------------------------------------------

    card.innerHTML = `

        <div class="booking-card-header">

            <div>

                <span class="booking-label">
                    DESTINATION
                </span>

                <h3>
                    ${booking.destination || "Unknown"}
                </h3>

            </div>

            <span class="booking-badge">
                Confirmed
            </span>

        </div>


        <div class="booking-card-body">


            <div class="booking-detail">

                <strong>
                    📍 City
                </strong>

                <span>
                    ${booking.city || "Not specified"}
                </span>

            </div>


            <div class="booking-detail">

                <strong>
                    🗺️ Places to Visit
                </strong>

                <div class="places-tags">

                    ${placesHTML}

                </div>

            </div>


            <div class="booking-detail">

                <strong>
                    🏨 Hotel
                </strong>

                <span>
                    ${booking.hotel || "Not specified"}
                </span>

            </div>


            <div class="booking-detail">

                <strong>
                    👥 Travelers
                </strong>

                <span>
                    ${booking.travelers || 1}
                </span>

            </div>


            <div class="booking-detail">

                <strong>
                    📅 Departure
                </strong>

                <span>
                    ${departureDate}
                </span>

            </div>


            <div class="booking-detail">

                <strong>
                    📅 Return
                </strong>

                <span>
                    ${returnDate}
                </span>

            </div>


            <div class="booking-detail">

                <strong>
                    💰 Budget
                </strong>

                <span>
                    ₹${budget}
                </span>

            </div>


            ${
                booking.specialRequests
                    ? `
                        <div class="booking-detail special-request">

                            <strong>
                                📝 Special Requests
                            </strong>

                            <span>
                                ${booking.specialRequests}
                            </span>

                        </div>
                    `
                    : ""
            }


        </div>


        <div class="booking-card-footer">

            <button
                class="cancel-booking-btn"
                onclick="cancelBooking('${booking._id}')"
            >
                Cancel Booking
            </button>

        </div>

    `;


    return card;

}


// ==========================================
// CANCEL BOOKING
// ==========================================

async function cancelBooking(bookingId) {

    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmCancel) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://https://responsive-travel-website-wq53.onrender.com//api/bookings/${bookingId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to cancel booking."
            );

        }


        alert(
            "Booking cancelled successfully."
        );


        // Reload bookings

        window.location.reload();


    } catch (error) {

        console.error(
            "Cancel Booking Error:",
            error
        );


        alert(
            error.message ||
            "Unable to cancel booking."
        );

    }

}