// ==========================================
// TRAVEL EXPLORER - ADMIN DASHBOARD
// ==========================================


// ==========================================
// API URL
// ==========================================

const API_URL = "https://responsive-travel-website-wq53.onrender.com";


// ==========================================
// GET TOKEN
// ==========================================

const token = localStorage.getItem("token");


// ==========================================
// CHECK LOGIN + ADMIN ROLE
// ==========================================

function checkAdminAccess() {

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return false;
    }


    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );


        if (payload.role !== "admin") {

            alert("Access denied. Admin only.");

            window.location.href = "index.html";

            return false;
        }


        return true;

    } catch (error) {

        console.error(
            "Token verification error:",
            error
        );

        alert("Invalid login session.");

        localStorage.removeItem("token");

        window.location.href = "login.html";

        return false;
    }
}


// ==========================================
// FETCH ALL BOOKINGS
// ==========================================

async function fetchAdminBookings() {

    try {

        const response = await fetch(
            `${API_URL}/api/admin/bookings`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Unable to fetch bookings"
            );
        }


        console.log(
            "Admin Bookings:",
            data
        );


        displayBookings(data.bookings);


        updateBookingStats(data.bookings);

       


    } catch (error) {

        console.error(
            "Fetch Admin Bookings Error:",
            error
        );


        const recentBookings =
            document.getElementById("recentBookings");


        const allBookings =
            document.getElementById("allBookings");


        if (recentBookings) {

            recentBookings.innerHTML = `
                <p class="loading-text">
                    Unable to load bookings.
                </p>
            `;
        }


        if (allBookings) {

            allBookings.innerHTML = `
                <p class="loading-text">
                    Unable to load bookings.
                </p>
            `;
        }
    }
}


// ==========================================
// DISPLAY BOOKINGS
// ==========================================

function displayBookings(bookings) {

    const recentContainer =
        document.getElementById("recentBookings");


    const allContainer =
        document.getElementById("allBookings");


    if (!bookings || bookings.length === 0) {

        const emptyHTML = `
            <div class="empty-state">

                <div class="empty-state-icon">
                    📋
                </div>

                <h3>
                    No bookings found
                </h3>

                <p>
                    Customer bookings will appear here.
                </p>

            </div>
        `;


        if (recentContainer) {

            recentContainer.innerHTML =
                emptyHTML;
        }


        if (allContainer) {

            allContainer.innerHTML =
                emptyHTML;
        }


        return;
    }


    // --------------------------------------
    // RECENT BOOKINGS
    // --------------------------------------

    const recentBookings =
        bookings.slice(0, 5);


    if (recentContainer) {

        recentContainer.innerHTML =
            createBookingTable(
                recentBookings,
                true
            );
    }


    // --------------------------------------
    // ALL BOOKINGS
    // --------------------------------------

    if (allContainer) {

        allContainer.innerHTML =
            createBookingTable(
                bookings,
                false
            );
    }
}


// ==========================================
// CREATE BOOKING TABLE
// ==========================================

function createBookingTable(
    bookings,
    isRecent
) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>Customer</th>

                    <th>Destination</th>

                    <th>Travel Date</th>

                    <th>Travelers</th>

                    <th>Hotel</th>

                    <th>Budget</th>

                    ${isRecent ? "" : "<th>Action</th>"}

                </tr>

            </thead>

            <tbody>
    `;


    bookings.forEach(booking => {

        const customerName =
            booking.user?.name || "Unknown";


        const customerEmail =
            booking.user?.email || "N/A";


        const travelDate =
            booking.travelDate
                ? new Date(
                    booking.travelDate
                ).toLocaleDateString("en-IN")
                : "N/A";


        const budget =
            Number(
                booking.budget || 0
            ).toLocaleString("en-IN");


        html += `

            <tr>

                <td>

                    <strong>
                        ${escapeHTML(customerName)}
                    </strong>

                    <br>

                    <small>
                        ${escapeHTML(customerEmail)}
                    </small>

                </td>


                <td>
                    ${escapeHTML(
                        booking.destination || "N/A"
                    )}
                </td>


                <td>
                    ${travelDate}
                </td>


                <td>
                    ${booking.travelers || 0}
                </td>


                <td>
                    ${escapeHTML(
                        booking.hotel || "Not selected"
                    )}
                </td>


                <td>
                    ₹${budget}
                </td>


                ${
                    isRecent
                        ? ""
                        : `
                            <td>

                                <button
                                    class="delete-booking-btn"
                                    onclick="deleteBooking('${booking._id}')"
                                >
                                    Delete
                                </button>

                            </td>
                        `
                }

            </tr>

        `;
    });


    html += `

            </tbody>

        </table>

    `;


    return html;
}


// ==========================================
// UPDATE BOOKING STATISTICS
// ==========================================

function updateBookingStats(bookings) {

    const totalBookings =
        document.getElementById(
            "totalBookings"
        );


    const totalBudget =
        document.getElementById(
            "totalBudget"
        );


    const totalDestinations =
        document.getElementById(
            "totalDestinations"
        );


    if (totalBookings) {

        totalBookings.textContent =
            bookings.length;
    }

    // ==========================================
    // DESTINATION STATISTICS
    // ==========================================

    const destinationStats =
        document.getElementById(
            "destinationStats"
        );

    if (destinationStats) {

        if (!bookings || bookings.length === 0) {

            destinationStats.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        📊
                    </div>

                    <h3>
                        No statistics available
                    </h3>

                    <p>
                        Booking data will appear here.
                    </p>
                </div>
            `;

        } else {

            const destinationCounts = {};

            bookings.forEach(booking => {

                const destination =
                    booking.destination || "Unknown";

                destinationCounts[destination] =
                    (destinationCounts[destination] || 0) + 1;
            });


            let statisticsHTML = `
                <div class="statistics-list">
            `;


            Object.entries(destinationCounts)
                .sort((a, b) => b[1] - a[1])
                .forEach(([destination, count]) => {

                    statisticsHTML += `
                        <div class="stat-row">

                            <span class="stat-destination">
                                ${escapeHTML(destination)}
                            </span>

                            <span class="stat-count">
                                ${count} booking${count !== 1 ? "s" : ""}
                            </span>

                        </div>
                    `;
                });


            statisticsHTML += `
                </div>
            `;


            destinationStats.innerHTML =
                statisticsHTML;
        }
    }
    const total =
        bookings.reduce(
            (sum, booking) => {

                return sum +
                    Number(
                        booking.budget || 0
                    );

            },
            0
        );


    if (totalBudget) {

        totalBudget.textContent =
            `₹${total.toLocaleString("en-IN")}`;
    }


    const destinations =
        new Set(
            bookings.map(
                booking =>
                    booking.destination
            )
        );


    if (totalDestinations) {

        totalDestinations.textContent =
            destinations.size;
    }

        // ==========================================
    // FULL STATISTICS
    // ==========================================

    const statisticsBookings =
        document.getElementById(
            "statisticsBookings"
        );

    const statisticsTravelers =
        document.getElementById(
            "statisticsTravelers"
        );

    const statisticsBudget =
        document.getElementById(
            "statisticsBudget"
        );

    const statisticsAverageBudget =
        document.getElementById(
            "statisticsAverageBudget"
        );

    const statisticsDestinations =
        document.getElementById(
            "statisticsDestinations"
        );


    // ------------------------------------------
    // TOTAL BOOKINGS
    // ------------------------------------------

    if (statisticsBookings) {

        statisticsBookings.textContent =
            bookings.length;
    }


    // ------------------------------------------
    // TOTAL TRAVELERS
    // ------------------------------------------

    const totalTravelers =
        bookings.reduce(
            (sum, booking) => {

                return sum +
                    Number(
                        booking.travelers || 0
                    );

            },
            0
        );


    if (statisticsTravelers) {

        statisticsTravelers.textContent =
            totalTravelers;
    }


    // ------------------------------------------
    // TOTAL BUDGET
    // ------------------------------------------

    const totalBookingBudget =
        bookings.reduce(
            (sum, booking) => {

                return sum +
                    Number(
                        booking.budget || 0
                    );

            },
            0
        );


    if (statisticsBudget) {

        statisticsBudget.textContent =
            `₹${totalBookingBudget.toLocaleString("en-IN")}`;
    }


    // ------------------------------------------
    // AVERAGE BUDGET
    // ------------------------------------------

    const averageBudget =
        bookings.length > 0
            ? totalBookingBudget / bookings.length
            : 0;


    if (statisticsAverageBudget) {

        statisticsAverageBudget.textContent =
            `₹${Math.round(
                averageBudget
            ).toLocaleString("en-IN")}`;
    }


    // ------------------------------------------
    // UNIQUE DESTINATIONS
    // ------------------------------------------

    if (statisticsDestinations) {

        statisticsDestinations.textContent =
            destinations.size;
    }
    // ==========================================
// MOST POPULAR DESTINATION
// ==========================================

const popularDestination =
    document.getElementById(
        "popularDestination"
    );


const destinationCounts = {};


bookings.forEach(booking => {

    const destination =
        booking.destination || "Unknown";

    destinationCounts[destination] =
        (destinationCounts[destination] || 0) + 1;

});


let mostPopularDestination = "N/A";
let highestDestinationCount = 0;


Object.entries(destinationCounts).forEach(
    ([destination, count]) => {

        if (count > highestDestinationCount) {

            highestDestinationCount = count;

            mostPopularDestination =
                destination;
        }
    }
);


if (popularDestination) {

    popularDestination.innerHTML = `

        <div class="statistics-highlight-content">

            <strong>
                ${escapeHTML(
                    mostPopularDestination
                )}
            </strong>

            <span>
                ${highestDestinationCount}
                booking${highestDestinationCount !== 1 ? "s" : ""}
            </span>

        </div>

    `;
}



// ==========================================
// MOST SELECTED HOTEL
// ==========================================

const popularHotel =
    document.getElementById(
        "popularHotel"
    );


const hotelCounts = {};


bookings.forEach(booking => {

    const hotel =
        booking.hotel || "Not selected";

    if (hotel !== "Not selected") {

        hotelCounts[hotel] =
            (hotelCounts[hotel] || 0) + 1;
    }

});


let mostPopularHotel = "N/A";
let highestHotelCount = 0;


Object.entries(hotelCounts).forEach(
    ([hotel, count]) => {

        if (count > highestHotelCount) {

            highestHotelCount = count;

            mostPopularHotel =
                hotel;
        }
    }
);


if (popularHotel) {

    popularHotel.innerHTML = `

        <div class="statistics-highlight-content">

            <strong>
                ${escapeHTML(
                    mostPopularHotel
                )}
            </strong>

            <span>
                ${highestHotelCount}
                booking${highestHotelCount !== 1 ? "s" : ""}
            </span>

        </div>

    `;
}
// ==========================================
// HOTEL ANALYSIS
// ==========================================

const hotelStats =
    document.getElementById(
        "hotelStats"
    );


if (hotelStats) {

    if (
        Object.keys(hotelCounts).length === 0
    ) {

        hotelStats.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🏨
                </div>

                <h3>
                    No hotel data available
                </h3>

                <p>
                    Hotel selections will appear here.
                </p>

            </div>

        `;

    } else {

        let hotelHTML = `

            <div class="statistics-list">

        `;


        Object.entries(hotelCounts)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .forEach(
                ([hotel, count]) => {

                    hotelHTML += `

                        <div class="stat-row">

                            <span class="stat-destination">

                                ${escapeHTML(
                                    hotel
                                )}

                            </span>

                            <span class="stat-count">

                                ${count}
                                booking${count !== 1 ? "s" : ""}

                            </span>

                        </div>

                    `;
                }
            );


        hotelHTML += `

            </div>

        `;


        hotelStats.innerHTML =
            hotelHTML;
    }
}
// ==========================================
// BUDGET ANALYSIS
// ==========================================

const budgetStats =
    document.getElementById(
        "budgetStats"
    );


if (budgetStats) {

    if (!bookings || bookings.length === 0) {

        budgetStats.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    💰
                </div>

                <h3>
                    No budget data available
                </h3>

                <p>
                    Booking budget information will appear here.
                </p>

            </div>

        `;

    } else {

        const budgets =
            bookings
                .map(
                    booking =>
                        Number(
                            booking.budget || 0
                        )
                )
                .filter(
                    budget =>
                        budget > 0
                );


        if (budgets.length === 0) {

            budgetStats.innerHTML = `

                <div class="empty-state">

                    <div class="empty-state-icon">
                        💰
                    </div>

                    <h3>
                        No budget data available
                    </h3>

                    <p>
                        No valid booking budgets found.
                    </p>

                </div>

            `;

        } else {

            const total =
                budgets.reduce(
                    (sum, budget) =>
                        sum + budget,
                    0
                );


            const average =
                total / budgets.length;


            const minimum =
                Math.min(...budgets);


            const maximum =
                Math.max(...budgets);


            budgetStats.innerHTML = `

                <div class="budget-stat-grid">


                    <div class="budget-stat-item">

                        <span>
                            Total Budget
                        </span>

                        <strong>
                            ₹${total.toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div class="budget-stat-item">

                        <span>
                            Average Budget
                        </span>

                        <strong>
                            ₹${Math.round(
                                average
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div class="budget-stat-item">

                        <span>
                            Lowest Budget
                        </span>

                        <strong>
                            ₹${minimum.toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div class="budget-stat-item">

                        <span>
                            Highest Budget
                        </span>

                        <strong>
                            ₹${maximum.toLocaleString("en-IN")}
                        </strong>

                    </div>


                </div>

            `;
        }
    }
}
}


// ==========================================
// DELETE BOOKING
// ==========================================

async function deleteBooking(
    bookingId
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this booking?"
        );


    if (!confirmed) {

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/bookings/${bookingId}`,
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
                "Unable to delete booking"
            );
        }


        alert(
            "Booking deleted successfully."
        );


        fetchAdminBookings();


    } catch (error) {

        console.error(
            "Delete Booking Error:",
            error
        );


        alert(
            "Unable to delete booking."
        );
    }
}




// ==========================================
// FETCH ALL USERS
// ==========================================

async function fetchAdminUsers() {

    try {

        const response = await fetch(
            `${API_URL}/api/admin/users`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to fetch users"
            );
        }


        console.log(
            "Admin Users:",
            data
        );


        displayUsers(data.users);

        const totalUsers =
            document.getElementById("totalUsers");

        if (totalUsers) {
           totalUsers.textContent = data.users.length;
}
const statisticsUsers =
    document.getElementById(
        "statisticsUsers"
    );

if (statisticsUsers) {

    statisticsUsers.textContent =
        data.users.length;
}

    } catch (error) {

        console.error(
            "Fetch Admin Users Error:",
            error
        );


        const container =
            document.getElementById(
                "allUsers"
            );


               if (container) {

            container.innerHTML = `
                <p class="loading-text">
                    Unable to load users.
                </p>
            `;
        }

    }

}

// ==========================================
// DISPLAY USERS
// ==========================================

function displayUsers(users) {

    const container =
        document.getElementById(
            "allUsers"
        );


    if (!container) {
        return;
    }


    if (!users || users.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    👥
                </div>

                <h3>
                    No users found
                </h3>

                <p>
                    Registered users will appear here.
                </p>

            </div>

        `;

        return;
    }


    let html = `

        <table>

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Role</th>

                    <th>Registered</th>

                </tr>

            </thead>

            <tbody>

    `;


    users.forEach(user => {

        const registeredDate =
            user.createdAt
                ? new Date(
                    user.createdAt
                ).toLocaleDateString("en-IN")
                : "N/A";


        const role =
            user.role || "user";


        html += `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(
                            user.name || "N/A"
                        )}
                    </strong>
                </td>


                <td>
                    ${escapeHTML(
                        user.email || "N/A"
                    )}
                </td>


                <td>

                    <span class="role-badge">
                        ${escapeHTML(role)}
                    </span>

                </td>


                <td>
                    ${registeredDate}
                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

    `;


    container.innerHTML = html;
}
        
// ==========================================
// LOAD STATISTICS
// ==========================================

function loadStatistics(bookings) {

    const container =
        document.getElementById("destinationStats");

    if (!container) {
        return;
    }

    if (!bookings || bookings.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-state-icon">
                    📊
                </div>

                <h3>
                    No statistics available
                </h3>

                <p>
                    Booking statistics will appear here.
                </p>

            </div>
        `;

        return;
    }

    const destinationCounts = {};

    bookings.forEach(booking => {

        const destination =
            booking.destination || "Unknown";

        destinationCounts[destination] =
            (destinationCounts[destination] || 0) + 1;
    });


    let statisticsHTML = `
        <div class="statistics-grid">

            <div class="stat-box">
                <h3>Total Bookings</h3>
                <p>${bookings.length}</p>
            </div>

            <div class="stat-box">
                <h3>Total Travelers</h3>
                <p>
                    ${bookings.reduce(
                        (total, booking) =>
                            total + Number(booking.travelers || 0),
                        0
                    )}
                </p>
            </div>

            <div class="stat-box">
                <h3>Total Budget</h3>
                <p>
                    ₹${bookings.reduce(
                        (total, booking) =>
                            total + Number(booking.budget || 0),
                        0
                    ).toLocaleString("en-IN")}
                </p>
            </div>

        </div>

        <h3 class="statistics-subtitle">
            Destination Statistics
        </h3>

        <div class="destination-statistics">
    `;


    Object.entries(destinationCounts)
        .forEach(([destination, count]) => {

            statisticsHTML += `
                <div class="destination-stat">

                    <span>
                        ${escapeHTML(destination)}
                    </span>

                    <strong>
                        ${count}
                    </strong>

                </div>
            `;
        });


    statisticsHTML += `
        </div>
    `;


    container.innerHTML =
        statisticsHTML;
}

// ==========================================
// NAVIGATION
// ==========================================

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".admin-nav-item"
        );


    const sections = {

        dashboard:
            document.getElementById(
                "dashboardSection"
            ),

        bookings:
            document.getElementById(
                "bookingsSection"
            ),

        users:
            document.getElementById(
                "usersSection"
            ),

        statistics:
            document.getElementById(
                "statisticsSection"
            )
    };


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const sectionName =
                    item.dataset.section;


                navItems.forEach(
                    nav =>
                        nav.classList.remove(
                            "active"
                        )
                );


                item.classList.add(
                    "active"
                );


                Object.values(
                    sections
                ).forEach(section => {

                    if (section) {

                        section.classList.remove(
                            "active-section"
                        );
                    }
                });


                if (
                    sections[sectionName]
                ) {

                    sections[
                        sectionName
                    ].classList.add(
                        "active-section"
                    );
                }


                const pageTitle =
                    document.getElementById(
                        "pageTitle"
                    );


                const titles = {

                    dashboard:
                        "Dashboard",

                    bookings:
                        "All Bookings",

                    users:
                        "Users",

                    statistics:
                        "Statistics"
                };


                if (pageTitle) {

                    pageTitle.textContent =
                        titles[
                            sectionName
                        ];
                }
            }
        );
    });


    // --------------------------------------
    // VIEW ALL BUTTON
    // --------------------------------------

    const viewAllButton =
        document.querySelector(
            ".view-all-btn"
        );


    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            () => {

                const bookingNav =
                    document.querySelector(
                        '[data-section="bookings"]'
                    );


                if (bookingNav) {

                    bookingNav.click();
                }
            }
        );
    }
}

// ==========================================
// VISIT WEBSITE
// ==========================================

function setupVisitWebsite() {

    const visitWebsiteButton =
        document.getElementById(
            "visitWebsiteBtn"
        );


    if (!visitWebsiteButton) {

        return;
    }


    visitWebsiteButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );
}

// ==========================================
// LOGOUT
// ==========================================

function setupLogout() {

    const logoutButton =
        document.getElementById(
            "adminLogoutBtn"
        );


    if (!logoutButton) {

        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) {

                return;
            }


            localStorage.removeItem(
                "token"
            );


            window.location.href =
                "login.html";
        }
    );
}


// ==========================================
// HTML SECURITY HELPER
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==========================================
// INITIALIZE ADMIN DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const isAdmin =
            checkAdminAccess();


        if (!isAdmin) {

            return;
        }


        setupNavigation();
        setupVisitWebsite();
        setupLogout();

        fetchAdminBookings();
        fetchAdminUsers();
    }
);