// ==========================================
// AUTHENTICATION / NAVBAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    updateNavbar();
    setupMobileMenu();

});


// ==========================================
// UPDATE NAVBAR
// ==========================================

function updateNavbar() {

    const token = localStorage.getItem("token");

    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }


    // Remove old authentication links

    const oldAuthLinks =
        navLinks.querySelectorAll(".auth-link");

    oldAuthLinks.forEach(function (link) {
        link.remove();
    });


    if (token) {

        // ==========================================
        // LOGGED IN
        // ==========================================

        const myBookings =
            document.createElement("li");

        myBookings.className =
            "auth-link";

        myBookings.innerHTML =
            `<a href="mybookings.html">My Bookings</a>`;


        const logout =
            document.createElement("li");

        logout.className =
            "auth-link";

        logout.innerHTML =
            `<a href="#" id="logoutLink">Logout</a>`;


        navLinks.appendChild(myBookings);

        navLinks.appendChild(logout);


        // Logout event

        document
            .getElementById("logoutLink")
            .addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    logoutUser();

                }
            );

    } else {

        // ==========================================
        // LOGGED OUT
        // ==========================================

        const login =
            document.createElement("li");

        login.className =
            "auth-link";

        login.innerHTML =
            `<a href="login.html">Login</a>`;


        const register =
            document.createElement("li");

        register.className =
            "auth-link";

        register.innerHTML =
            `<a href="register.html">Register</a>`;


        navLinks.appendChild(login);

        navLinks.appendChild(register);

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem("token");

    alert("You have been logged out successfully.");

    window.location.href = "index.html";

}
// ==========================================
// MOBILE NAVIGATION
// ==========================================

function setupMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (!menuToggle || !navLinks) {

        return;

    }


    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );


    // Close menu after clicking a link

    const links =
        navLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "active"
                );

            }
        );

    });

}
