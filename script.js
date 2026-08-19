// ==========================================
// BOOKING SYSTEM
// ==========================================






// ==========================================
// DESTINATION → CITY → HOTEL
// ==========================================

const destinationSelect =
    document.getElementById("destination");

const citySelect =
    document.getElementById("city");

const hotelSelect =
    document.getElementById("hotel");


// ==========================================
// CITY DATA
// ==========================================

const citiesByDestination = {

    "Rajasthan": [
        "Jaipur",
        "Jodhpur",
        "Udaipur",
        "Jaisalmer",
        "Mount Abu"
    ],

    "Uttar Pradesh": [
        "Agra",
        "Varanasi",
        "Lucknow",
        "Mathura",
        "Ayodhya"
    ],

    "Uttarakhand": [
        "Dehradun",
        "Mussoorie",
        "Nainital",
        "Rishikesh",
        "Haridwar"
    ],

    "Kashmir": [
        "Srinagar",
        "Gulmarg",
        "Pahalgam",
        "Sonamarg"
    ],

    "Assam": [
        "Guwahati",
        "Kaziranga",
        "Jorhat",
        "Majuli",
        "Tezpur"
    ],

    "Punjab": [
        "Amritsar",
        "Ludhiana",
        "Jalandhar",
        "Patiala"
    ]

};

// ==========================================
// PLACES TO VISIT BY CITY
// ==========================================

const placesByCity = {

    "Jaipur": [
        "Amber Fort",
        "Hawa Mahal",
        "City Palace",
        "Jal Mahal",
        "Jantar Mantar"
    ],

    "Jodhpur": [
        "Mehrangarh Fort",
        "Jaswant Thada",
        "Umaid Bhawan Palace",
        "Clock Tower",
        "Mandore Gardens"
    ],

    "Udaipur": [
        "City Palace",
        "Lake Pichola",
        "Jagdish Temple",
        "Fateh Sagar Lake",
        "Sajjangarh Palace"
    ],

    "Jaisalmer": [
        "Jaisalmer Fort",
        "Sam Sand Dunes",
        "Patwon Ki Haveli",
        "Gadisar Lake",
        "Kuldhara Village"
    ],

    "Mount Abu": [
        "Dilwara Temples",
        "Nakki Lake",
        "Guru Shikhar",
        "Sunset Point",
        "Achalgarh Fort"
    ],

    "Agra": [
        "Taj Mahal",
        "Agra Fort",
        "Mehtab Bagh",
        "Itmad-ud-Daulah",
        "Sadar Bazaar"
    ],

    "Varanasi": [
        "Dashashwamedh Ghat",
        "Kashi Vishwanath Temple",
        "Assi Ghat",
        "Sarnath",
        "Manikarnika Ghat"
    ],

    "Lucknow": [
        "Bara Imambara",
        "Chota Imambara",
        "Rumi Darwaza",
        "British Residency",
        "Hazratganj"
    ],

    "Mathura": [
        "Krishna Janmabhoomi",
        "Banke Bihari Temple",
        "Prem Mandir",
        "Vishram Ghat",
        "Govardhan Hill"
    ],

    "Ayodhya": [
        "Ram Mandir",
        "Hanuman Garhi",
        "Saryu Ghat",
        "Kanak Bhawan",
        "Dasharath Bhawan"
    ],

    "Dehradun": [
        "Robber's Cave",
        "Sahastradhara",
        "Forest Research Institute",
        "Tapkeshwar Temple",
        "Mindrolling Monastery"
    ],

    "Mussoorie": [
        "Mall Road",
        "Kempty Falls",
        "Gun Hill",
        "Lal Tibba",
        "Cloud's End"
    ],

    "Nainital": [
        "Naini Lake",
        "Naina Devi Temple",
        "Snow View Point",
        "Mall Road",
        "Eco Cave Gardens"
    ],

    "Rishikesh": [
        "Laxman Jhula",
        "Ram Jhula",
        "Triveni Ghat",
        "Beatles Ashram",
        "Neer Garh Waterfall"
    ],

    "Haridwar": [
        "Har Ki Pauri",
        "Mansa Devi Temple",
        "Chandi Devi Temple",
        "Ganga Aarti",
        "Bharat Mata Temple"
    ],

    "Srinagar": [
        "Dal Lake",
        "Mughal Gardens",
        "Shankaracharya Temple",
        "Hazratbal Shrine",
        "Pari Mahal"
    ],

    "Gulmarg": [
        "Gulmarg Gondola",
        "Apharwat Peak",
        "Gulmarg Biosphere Reserve",
        "St. Mary's Church",
        "Golf Course"
    ],

    "Pahalgam": [
        "Betaab Valley",
        "Aru Valley",
        "Baisaran Valley",
        "Lidder River",
        "Pahalgam Golf Course"
    ],

    "Sonamarg": [
        "Thajiwas Glacier",
        "Zoji La",
        "Sind River",
        "Baltal",
        "Sonamarg Valley"
    ],

    "Guwahati": [
        "Kamakhya Temple",
        "Umananda Island",
        "Assam State Museum",
        "Brahmaputra River Cruise",
        "Assam State Zoo"
    ],

    "Kaziranga": [
        "Kaziranga National Park",
        "Elephant Safari",
        "Jeep Safari",
        "Orchid Park",
        "Kohora Range"
    ],

    "Jorhat": [
        "Majuli Island",
        "Tea Gardens",
        "Jorhat Gymkhana Club",
        "Thengal Manor",
        "Cinnamora Tea Estate"
    ],

    "Majuli": [
        "Satras",
        "Kamalabari Satra",
        "Auniati Satra",
        "Mask Making Villages",
        "Majuli River Island"
    ],

    "Tezpur": [
        "Agnigarh",
        "Cole Park",
        "Bhairabi Temple",
        "Chitralekha Udyan",
        "Nameri National Park"
    ],

    "Amritsar": [
        "Golden Temple",
        "Jallianwala Bagh",
        "Wagah Border",
        "Partition Museum",
        "Durgiana Temple"
    ],

    "Ludhiana": [
        "Nehru Rose Garden",
        "Punjab Agricultural University Museum",
        "Rakh Bagh",
        "Lodhi Fort",
        "Hardy's World"
    ],

    "Jalandhar": [
        "Devi Talab Mandir",
        "Wonderland Theme Park",
        "Pushpa Gujral Science City",
        "Rangla Punjab Haveli",
        "Sadar Bazaar"
    ],

    "Patiala": [
        "Qila Mubarak",
        "Sheesh Mahal",
        "Moti Bagh Palace",
        "Baradari Gardens",
        "Patiala Heritage Walk"
    ]

};


// ==========================================
// HOTELS BY CITY
// ==========================================

const hotelsByCity = {

    "Jaipur": [
        "Rambagh Palace",
        "ITC Rajputana",
        "Fairmont Jaipur"
    ],

    "Jodhpur": [
        "Umaid Bhawan Palace",
        "RAAS Jodhpur",
        "Indana Palace Jodhpur"
    ],

    "Udaipur": [
        "Taj Lake Palace",
        "The Oberoi Udaivilas",
        "Trident Udaipur"
    ],

    "Jaisalmer": [
        "Suryagarh Jaisalmer",
        "Jaisalmer Marriott Resort",
        "Hotel Rang Mahal"
    ],

    "Mount Abu": [
        "The Jaipur House",
        "Hotel Hillock",
        "Rajasthan Bungalow"
    ],

    "Agra": [
        "Taj Hotel & Convention Centre Agra",
        "ITC Mughal",
        "The Oberoi Amarvilas"
    ],

    "Varanasi": [
        "Taj Ganges",
        "BrijRama Palace",
        "Radisson Hotel Varanasi"
    ],

    "Lucknow": [
        "Taj Mahal Lucknow",
        "Renaissance Lucknow",
        "Hyatt Regency Lucknow"
    ],

    "Mathura": [
        "Nidhivan Sarovar Portico",
        "Brijwasi Lands Inn",
        "The Radha Ashok"
    ],

    "Ayodhya": [
        "Park Inn by Radisson Ayodhya",
        "Ramada Plaza Ayodhya",
        "Cygnett Collection KK Hotel"
    ],

    "Dehradun": [
        "Hyatt Centric Rajpur Road",
        "Seyfert Sarovar Premiere",
        "Lemon Tree Hotel Dehradun"
    ],

    "Mussoorie": [
        "JW Marriott Mussoorie",
        "The Savoy",
        "Jaypee Residency Manor"
    ],

    "Nainital": [
        "The Naini Retreat",
        "Shervani Hilltop",
        "The Manu Maharani"
    ],

    "Rishikesh": [
        "Taj Rishikesh Resort",
        "Aloha on the Ganges",
        "The Roseate Ganges"
    ],

    "Haridwar": [
        "Radisson Blu Haridwar",
        "Pilibhit House",
        "Ganga Kinare"
    ],

    "Srinagar": [
        "Vivanta Dal View",
        "The Lalit Grand Palace Srinagar",
        "Radisson Srinagar"
    ],

    "Gulmarg": [
        "The Khyber Himalayan Resort",
        "Gulmarg Resorts",
        "Pine Palace Resort"
    ],

    "Pahalgam": [
        "Pahalgam Hotel",
        "Welcomhotel by ITC",
        "Radisson Golf Resort Pahalgam"
    ],

    "Sonamarg": [
        "Hotel Snow Land",
        "Namrose Resort",
        "Hotel Glacier Heights"
    ],

    "Guwahati": [
        "Radisson Blu Guwahati",
        "Vivanta Guwahati",
        "Novotel Guwahati"
    ],

    "Kaziranga": [
        "Diphlu River Lodge",
        "IORA The Retreat",
        "Borgos Resort"
    ],

    "Jorhat": [
        "Hotel Jironi",
        "The Manor",
        "Hotel MD's Continental"
    ],

    "Majuli": [
        "La Maison de Ananda",
        "Dekasang Majuli",
        "Okegiga Homes"
    ],

    "Tezpur": [
        "Hotel KRC Palace",
        "Hotel Pine Yard",
        "Hotel Centre Point"
    ],

    "Amritsar": [
        "Taj Swarna",
        "Hyatt Regency Amritsar",
        "Ramada Encore Amritsar"
    ],

    "Ludhiana": [
        "Hyatt Regency Ludhiana",
        "Park Plaza Ludhiana",
        "Radisson Blu Ludhiana"
    ],

    "Jalandhar": [
        "Ramada by Wyndham Jalandhar",
        "Radisson Hotel Jalandhar",
        "Sarovar Portico Jalandhar"
    ],

    "Patiala": [
        "Neemrana's Baradari Palace",
        "Hotel Narain Continental",
        "Clarion Inn Amps"
    ]

};


// ==========================================
// DESTINATION → CITY → PLACES → HOTEL
// ==========================================

if (destinationSelect && citySelect) {

    // ==============================
    // DESTINATION CHANGE
    // ==============================

    destinationSelect.addEventListener("change", function () {

        const destination = destinationSelect.value;

        // Clear city
        citySelect.innerHTML = "";

        // Clear hotel
        if (hotelSelect) {
            hotelSelect.innerHTML =
                "<option value=''>Choose a city first</option>";
        }

        // Clear places
        const placesContainer =
            document.getElementById("placesContainer");

        if (placesContainer) {
            placesContainer.innerHTML = "";
        }

        // No destination selected
        if (!destination) {

            citySelect.innerHTML =
                "<option value=''>Choose a destination first</option>";

            return;
        }

        // Default city option
        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";
        defaultOption.textContent = "Choose City / Place";

        citySelect.appendChild(defaultOption);


        // Get cities
        const cities =
            citiesByDestination[destination] || [];


        // Add cities
        cities.forEach(function (city) {

            const option =
                document.createElement("option");

            option.value = city;
            option.textContent = city;

            citySelect.appendChild(option);

        });

    });


    // ==============================
    // CITY CHANGE
    // ==============================

    citySelect.addEventListener("change", function () {

        const city = citySelect.value;


        // Clear hotel
        if (hotelSelect) {

            hotelSelect.innerHTML =
                "<option value=''>Choose Hotel</option>";

        }


        // Places container
        const placesContainer =
            document.getElementById("placesContainer");


        // Clear places
        if (placesContainer) {

            placesContainer.innerHTML = "";

        }


        // No city selected
        if (!city) {
            return;
        }


        // ==============================
        // SHOW PLACES
        // ==============================

        const places =
            placesByCity[city] || [];


        if (placesContainer && places.length > 0) {

            const heading =
                document.createElement("h3");

            heading.textContent =
                "Places to Visit";

            placesContainer.appendChild(heading);


            places.forEach(function (place) {

                const label =
                    document.createElement("label");

                label.className =
                    "place-option";


                const checkbox =
                    document.createElement("input");

                checkbox.type = "checkbox";

                checkbox.name = "placesToVisit";

                checkbox.value = place;


                const text =
                    document.createElement("span");

                text.textContent = place;


                label.appendChild(checkbox);

                label.appendChild(text);

                placesContainer.appendChild(label);

            });

        }


        // ==============================
        // SHOW HOTELS
        // ==============================

        if (hotelSelect) {

            const hotels =
                hotelsByCity[city] || [];


            hotels.forEach(function (hotel) {

                const option =
                    document.createElement("option");

                option.value = hotel;

                option.textContent = hotel;

                hotelSelect.appendChild(option);

            });

        }

    });

}

// ==========================================
// BOOKING FORM
// ==========================================

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ==================================
            // JWT TOKEN
            // ==================================

            const token =
                localStorage.getItem("token");


            if (!token) {

                showBookingMessage(
                    "Please login first to book your trip.",
                    "error"
                );

                return;

            }


            // ==================================
            // GET FORM DATA
            // ==================================

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const destination =
                document.getElementById("destination").value;
            
            const city =
                document.getElementById("city").value;

            const travelers =
                document.getElementById("travelers").value;

            const travelDate =
                document.getElementById("travelDate").value;

            const returnDate =
                document.getElementById("returnDate").value;

            const hotel =
                document.getElementById("hotel").value;

            const budget =
                document.getElementById("budget").value;

            const specialRequests =
                document.getElementById("specialRequests").value.trim();


            const selectedPlaces =
                Array.from(
                    document.querySelectorAll(
                        'input[name="placesToVisit"]:checked'
                    )
                ).map(function (checkbox) {
                    return checkbox.value;
               });

            // ==================================
            // VALIDATION
            // ==================================

            if (
                !fullName ||
                !email ||
                !phone ||
                !destination ||
                !city ||
                !travelers ||
                !travelDate ||
                !returnDate ||
                !hotel ||
                !budget
            ) {

                showBookingMessage(
                    "Please fill in all required fields.",
                    "error"
                );

                return;

            }


            // ==================================
            // DATE VALIDATION
            // ==================================

            if (
                new Date(returnDate) <=
                new Date(travelDate)
            ) {

                showBookingMessage(
                    "Return date must be after departure date.",
                    "error"
                );

                return;

            }


            // ==================================
            // BUTTON
            // ==================================

            const submitButton =
                bookingForm.querySelector(
                    "button[type='submit']"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Booking...";


            // ==================================
            // SEND TO BACKEND
            // ==================================

            try {

                const response = await fetch(
                    "http://10.84.57.106:5000/api/bookings",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            fullName: fullName,

                            email: email,

                            phone: phone,

                            destination: destination,

                            city: city,

                            travelDate: travelDate,

                            returnDate: returnDate,

                            travelers: Number(travelers),

                            hotel: hotel,

                            budget: Number(budget),

                            placesToVisit: selectedPlaces,

                            specialRequests:
                                specialRequests

                        })

                    }
                );


                const data =
                    await response.json();


                // ==================================
                // BACKEND ERROR
                // ==================================

                if (!response.ok) {

                    showBookingMessage(
                        data.message ||
                        "Booking failed.",
                        "error"
                    );

                    return;

                }


                // ==================================
                // SUCCESS
                // ==================================

                showBookingMessage(
                    "🎉 Your trip has been booked successfully!",
                    "success"
                );


                console.log(
                    "Booking created:",
                    data.booking
                );


                // Reset form
bookingForm.reset();

// Reset city dropdown
if (citySelect) {
    citySelect.innerHTML =
        "<option value=''>Choose a destination first</option>";
}

// Reset hotel dropdown
if (hotelSelect) {
    hotelSelect.innerHTML =
        "<option value=''>Select a destination first</option>";
}

// Clear Places to Visit
const placesContainer =
    document.getElementById("placesContainer");

if (placesContainer) {
    placesContainer.innerHTML = "";
}


               

            } catch (error) {

                console.error(
                    "Booking Error:",
                    error
                );


                showBookingMessage(
                    "Unable to connect to the server. Please try again.",
                    "error"
                );


            } finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Book My Trip";

            }

        }
    );

}


// ==========================================
// BOOKING MESSAGE
// ==========================================

function showBookingMessage(message, type) {

    const messageBox =
        document.getElementById("successMessage");


    if (!messageBox) {
        return;
    }


    messageBox.textContent =
        message;


    messageBox.style.display =
        "block";


    messageBox.classList.remove(
        "success",
        "error"
    );


    messageBox.classList.add(
        type
    );


    setTimeout(function () {

        messageBox.style.display =
            "none";

    }, 5000);

}
// ==========================================
// LOGIN FORM
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const loginButton =
            loginForm.querySelector("button[type='submit']");

        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";

        try {

            const response = await fetch(
                "http://10.84.57.106:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                showLoginMessage(
                    data.message || "Login failed.",
                    "error"
                );

                return;
            }

            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            showLoginMessage(
                "Login successful! Redirecting...",
                "success"
            );

            setTimeout(function () {

                if (data.user.role === "admin"){
                    window.location.href = "admin.html";

                } else {

                window.location.href = "booking.html";
                }
            }, 1000);

        } catch (error) {

            console.error("Login Error:", error);

            showLoginMessage(
                "Unable to connect to server.",
                "error"
            );

        } finally {

            loginButton.disabled = false;
            loginButton.textContent = "Login";

        }

    });

}


// ==========================================
// LOGIN MESSAGE
// ==========================================

function showLoginMessage(message, type) {

    const messageBox =
        document.getElementById("loginMessage");

    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;

    messageBox.style.display = "block";

    messageBox.classList.remove(
        "success",
        "error"
    );

    messageBox.classList.add(type);
}

// ==========================================
// REGISTER FORM
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check passwords
        if (password !== confirmPassword) {

            showRegisterMessage(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        const registerButton =
            registerForm.querySelector("button[type='submit']");

        registerButton.disabled = true;
        registerButton.textContent = "Creating Account...";


        try {

            const response = await fetch(
                "http://10.84.57.106:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                showRegisterMessage(
                    data.message || "Registration failed.",
                    "error"
                );

                return;
            }


            // Registration successful
            showRegisterMessage(
                "Account created successfully! Redirecting to login...",
                "success"
            );


            // Redirect to login
            setTimeout(function () {

                window.location.href = "login.html";

            }, 1500);


        } catch (error) {

            console.error("Registration Error:", error);

            showRegisterMessage(
                "Unable to connect to server.",
                "error"
            );

        } finally {

            registerButton.disabled = false;
            registerButton.textContent = "Create Account";

        }

    });

}


// ==========================================
// REGISTER MESSAGE
// ==========================================

function showRegisterMessage(message, type) {

    const messageBox =
        document.getElementById("registerMessage");

    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;

    messageBox.style.display = "block";

    messageBox.classList.remove(
        "success",
        "error"
    );

    messageBox.classList.add(type);
}