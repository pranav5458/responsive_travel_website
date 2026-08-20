# 🌍 Travel Explorer

A modern, responsive **full-stack travel booking web application** built with **HTML, CSS, JavaScript, Node.js, Express.js and MongoDB**.

Travel Explorer allows users to explore destinations, create accounts, securely log in, make travel bookings and manage their bookings. The application also includes a dedicated **Admin Dashboard** with role-based authorization, booking management and travel statistics.

🔗 **Live Website:** https://pranav5458.github.io/responsive_travel_website/
🔗 **Backend API:** https://responsive-travel-website-wq53.onrender.com
🔗 **GitHub Repository:** https://github.com/pranav5458/responsive_travel_website

---

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Secure password hashing with bcrypt
* Responsive desktop, tablet and mobile design
* Explore travel destinations
* Travel booking form
* View personal bookings
* Delete personal bookings
* Dynamic navigation based on authentication status
* Logout functionality

### 🛠️ Admin Features

* Dedicated Admin Dashboard
* Admin-only authentication
* Role-based authorization
* View total registered users
* View total bookings
* View total booking budget
* View number of destinations
* View all registered users
* View all customer bookings
* Delete bookings
* Recent bookings section
* Destination statistics
* Most popular destinations
* Most selected hotels
* Hotel analysis
* Budget analysis

---

## 🔐 Authentication & Security

The application uses **JWT (JSON Web Tokens)** for authentication and authorization.

### Authentication Flow

1. User registers an account.
2. Password is securely hashed using bcrypt.
3. User logs in using email and password.
4. Backend generates a JWT token.
5. Token is stored in the browser's local storage.
6. Protected API requests send the token using the `Authorization` header.
7. Admin routes additionally verify the user's admin role.
8. Unauthorized users are prevented from accessing protected resources.

Sensitive environment variables such as MongoDB credentials and JWT secrets are stored in `.env` files and excluded from Git using `.gitignore`.

---

## 🧰 Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Flexbox
* CSS Grid
* Responsive Design
* Local Storage
* Fetch API

### Backend

* Node.js
* Express.js
* REST APIs
* JWT
* bcrypt.js
* Middleware

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* Nodemon

### Deployment

* GitHub Pages — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

## 📁 Project Structure

```text
responsive_travel_website/
│
├── index.html
├── booking.html
├── login.html
├── register.html
├── mybookings.html
│
├── style.css
├── script.js
├── auth.js
├── mybookings.js
│
├── admin.html
├── admin.css
├── admin.js
│
├── hero.jpg
├── img1.jpg
├── img2.jpg
├── img3.jpg
├── img4.jpg
├── img5.jpg
├── img6.jpg
├── img7.jpg
├── img8.jpg
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Booking.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── protectedRoutes.js
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── .gitignore
```

---

## 🔄 Application Flow

```text
                         TRAVEL EXPLORER
                                │
                ┌───────────────┴───────────────┐
                │                               │
              USER                            ADMIN
                │                               │
          Register / Login                  Admin Login
                │                               │
                ↓                               ↓
          JWT Authentication              JWT + Admin Role
                │                               │
                ↓                               ↓
        Explore Destinations             Admin Dashboard
                │                               │
                ↓                       ┌───────┼────────┐
          Create Booking                │       │        │
                │                    Users   Bookings  Statistics
                ↓
          MongoDB Atlas
                │
                ↓
          My Bookings
                │
          View / Delete
```

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/pranav5458/responsive_travel_website.git
```

### 2. Open the project

```bash
cd responsive_travel_website
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

### 5. Start the backend

```bash
npm run dev
```

The backend will run locally at:

```text
http://localhost:5000
```

### 6. Run the frontend

Open the frontend using a local development server such as **VS Code Live Server**.

---

## 🗄️ Database

Travel Explorer uses **MongoDB Atlas** as its cloud database.

### Users Collection

The application stores:

* Name
* Email
* Password
* Role

### Bookings Collection

The application stores:

* User
* Destination
* Travel Date
* Number of Travelers
* Hotel
* Budget

---

## 📊 Admin Dashboard

The Admin Dashboard provides a centralized interface for managing the travel platform.

It includes:

* User management
* Booking management
* Booking deletion
* Total users
* Total bookings
* Total booking budget
* Destination count
* Popular destination analysis
* Hotel selection analysis
* Budget analysis
* Recent bookings

The dashboard is protected using **JWT authentication** and **admin-role authorization**.

---

## 📱 Responsive Design

Travel Explorer is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The navigation, booking forms, dashboard and content sections adapt to smaller screen sizes.

The application was also tested using a mobile device while communicating with the deployed backend.

---

## 🧪 API Testing

The backend APIs were tested using **Postman** during development.

The following functionality was tested:

* User registration
* User login
* JWT authentication
* Protected routes
* Booking creation
* Booking retrieval
* Booking deletion
* Admin routes
* Admin authorization

---

## 🚀 Deployment

Travel Explorer is deployed as a full-stack application.

### Frontend

Hosted using **GitHub Pages**:

**https://pranav5458.github.io/responsive_travel_website/**

### Backend

Hosted using **Render**:

**https://responsive-travel-website-wq53.onrender.com**

### Database

Hosted using **MongoDB Atlas**.

### Deployment Architecture

```text
                         USER
                          │
                          ↓
                 GitHub Pages
                  Frontend UI
                          │
                          │ HTTPS API Requests
                          ↓
                    Render
               Node.js + Express
                          │
                          │ Mongoose
                          ↓
                  MongoDB Atlas
                     Database
```

---

## 🔗 Project Links

| Resource             | Link                                                    |
| -------------------- | ------------------------------------------------------- |
| 🌐 Live Website      | https://pranav5458.github.io/responsive_travel_website/ |
| ⚙️ Backend API       | https://responsive-travel-website-wq53.onrender.com     |
| 💻 GitHub Repository | https://github.com/pranav5458/responsive_travel_website |

---

## 🔮 Future Improvements

Possible future improvements include:

* Online payment integration
* Email booking confirmation
* Advanced admin analytics
* Booking status management
* Search and filter destinations
* User profile management
* Image upload for destinations
* Password reset functionality
* Better admin charts and visualizations
* Production-level security improvements

---

## 👨‍💻 Developer

**Pranav Chawla**

Full Stack Web Developer

### Connect

* GitHub: https://github.com/pranav5458
* LinkedIn: https://www.linkedin.com/in/pranav-chawla-5458

---

## ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**Travel Explorer — Explore. Book. Travel.**
