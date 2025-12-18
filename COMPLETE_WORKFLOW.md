# BookMyShow - Complete Booking Workflow

## 📽️ Application Overview

This is a fully functional BookMyShow-like movie booking application built with:
- **Frontend**: React 18+ with Redux Toolkit for state management
- **Backend**: Node.js with Express and Mongoose
- **Styling**: Bootstrap 5 and custom CSS

## 🎬 Complete Booking Workflow

### Step 1: Home Page - View Available Movies
- Navigate to `http://localhost:3000`
- See all available movies displayed in a grid layout
- Movies are **publicly visible** - no login required yet

**Available Movies:**
1. **Inception** - ₹200-₹300 per seat
2. **The Dark Knight** - ₹200-₹250 per seat  
3. **Interstellar** - ₹200-₹300 per seat

### Step 2: Movie Details - Select Theater & Show
1. Click **"Book Tickets"** on any movie card
2. Redirected to Movie Detail Page showing:
   - Movie poster and information
   - Ratings, genre, and description
3. **Select a Theater** from the accordion list:
   - **PVR Cinemas** - Mumbai
   - **Inox** - Mumbai
   - **IMAX** - Delhi
4. Click **"View Shows"** to see available showtimes
5. Each show displays:
   - Show time (e.g., 2:00 PM)
   - Ticket price (₹150-₹250)
   - Available seats count
6. Click **"Select Seats"** to proceed

### Step 3: Seat Selection - Choose Your Seats
1. **Login Required**: If not logged in, redirected to login page
   - Use demo credentials or register a new account
2. **Seat Selection Interface**:
   - Visual seat grid showing all rows (A-I) and columns (1-8)
   - Color coding:
     - 🟨 **Premium Seats** (Rows A-B): ₹300 each
     - 🟦 **Standard Seats** (Rows C-I): ₹200 each
     - 🔴 **Booked Seats**: Disabled (already reserved)
     - 🟩 **Selected Seats**: Highlighted in green
3. Click seats to select/deselect (max multiple seats allowed)
4. **Booking Summary** (right sidebar):
   - Shows selected seats in real-time
   - Updates total amount dynamically
5. Click **"Proceed to Payment"** to confirm selection

### Step 4: Booking Confirmation - Review & Pay
1. **Booking Summary Card** shows:
   - Movie details (title, duration, rating, poster)
   - Theater and show information
   - Selected seats list
   - Passenger details (name, email, phone)
2. **Price Breakdown**:
   - Seat charge (₹200-₹300 per seat)
   - Booking fee: ₹50
   - GST (5%): Calculated automatically
   - **Total Amount**: Final price
3. Click **"Confirm & Pay"** to complete booking
4. **Success Screen**: Shows booking confirmation ID
   - Example: `BMS1704067890123`
   - Confirmation email notification
5. Auto-redirects to "My Bookings" page after 3 seconds

### Step 5: My Bookings - View Your Tickets
- Access from user profile menu in header
- Shows all past and upcoming bookings
- Each booking displays:
  - Movie name
  - Theater and show details
  - Booked seats
  - Booking date and ID
  - Status (Confirmed/Pending)

---

## 🔐 Authentication

### Register
1. Click **"Register"** in header
2. Enter:
   - Full Name
   - Email
   - Password
   - Confirm Password
3. Click "Register" to create account
4. Auto-redirects to login page

### Login
1. Click **"Login"** in header
2. Enter email and password
3. Click "Login"
4. JWT token stored in Redux and browser
5. Auto-redirects to home page

### Logout
- Click user name/profile icon in header
- Click "Logout"
- Returns to home page as anonymous user

---

## 📱 Key Features

### ✅ Public Features (No Login Required)
- Browse all movies
- View movie details
- Search and filter movies by theater/city
- See theater information

### 🔒 Authenticated Features (Login Required)
- Select seats
- Create bookings
- View booking history
- Download/view tickets

### 💰 Pricing & Availability
| Seat Type | Price | Rows |
|-----------|-------|------|
| Premium | ₹300 | A-B |
| Standard | ₹200 | C-I |
| Booking Fee | ₹50 | All |
| GST | 5% | All |

### 🎭 Mock Shows Available
Each movie has multiple shows across theaters:
- **Morning Show**: 10:00 AM - ₹150 (off-peak)
- **Afternoon Show**: 2:00 PM - ₹200
- **Evening Show**: 6:00 PM - ₹250 (peak)
- **Night Show**: 10:00 PM - ₹200

---

## 🚀 Running the Application

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

### API Endpoints Used
**Movies:**
- `GET /api/movies` - Get all movies
- `GET /api/movies/:movieId` - Get movie details

**Theaters:**
- `GET /api/theaters` - Get all theaters
- `GET /api/theaters/shows/by-movie?movieId=&theaterId=` - Get shows
- `GET /api/theaters/show/:showId/details` - Get show details with seats

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Bookings:**
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:bookingId` - Get booking details

---

## 📊 Database Models

The application uses these MongoDB collections:

```
Users
├── name, email, password
├── phone, address
└── createdAt

Movies
├── title, genre, duration
├── description, rating
├── language, releaseDate
└── posterUrl

Theaters
├── name, city
├── address, screens
└── contact

Screens
├── theaterId, name
├── rows, columns
└── seatConfiguration

Shows
├── movieId, theaterId, screenId
├── startTime, endTime
├── price, availableSeats
└── bookedSeats[]

Bookings
├── userId, showId
├── seats[], totalAmount
├── status, paymentId
└── createdAt, updatedAt

Payments
├── bookingId, userId
├── amount, status
└── transactionId

Reviews
├── movieId, userId
├── rating, comment
└── createdAt
```

---

## 🎨 Frontend Structure

```
frontend/src/
├── components/
│   ├── Header.jsx      - Navigation bar with login/logout
│   └── Footer.jsx      - Application footer
├── pages/
│   ├── HomePage.jsx              - Movie listing
│   ├── MovieDetailPage.jsx       - Movie details & theater selection
│   ├── SeatSelectionPage.jsx     - Interactive seat booking (NEW)
│   ├── BookingConfirmationPage.jsx - Payment confirmation (NEW)
│   ├── LoginPage.jsx             - User login
│   ├── RegisterPage.jsx          - User registration
│   └── MyBookingsPage.jsx        - Booking history
├── redux/
│   ├── authSlice.js              - User authentication state
│   ├── movieSlice.js             - Movie browsing state
│   ├── bookingSlice.js           - Booking process state
│   └── store.js                  - Redux store configuration
├── services/
│   ├── api.js                    - Axios instance
│   └── services.js               - API methods
└── styles/
    ├── App.css                   - Global styles
    ├── SeatSelection.css         - Seat grid styles (NEW)
    └── BookingConfirmation.css   - Confirmation page styles (NEW)
```

---

## 🧪 Testing the Workflow

### Demo Credentials
Create a test account with:
- **Email**: `user@example.com`
- **Password**: `password123`

### Test Scenarios
1. **Browse Movies**: Home page shows all 3 movies
2. **View Details**: Click movie → See theaters and shows
3. **Select Theater**: Click "View Shows" → See available times
4. **Select Seats**: Click "Select Seats" → Choose multiple seats
5. **Confirm Booking**: Review details → Click "Confirm & Pay"
6. **Check Bookings**: View your bookings in "My Bookings" page

---

## 🔧 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000 and restart
lsof -ti:3000 | xargs kill -9
npm start
```

### Port 5000 already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
npm start
```

### Blank page or 404 errors
1. Check browser console (F12) for errors
2. Verify backend is running on port 5000
3. Clear browser cache: Ctrl+Shift+Delete

### Can't login
1. Register a new account first
2. Check email format is valid
3. Verify password has at least 6 characters

### Seats not showing
1. Make sure you clicked "View Shows" for a theater
2. Reload the page
3. Check browser console for API errors

---

## 📝 Notes

- **Offline Mode**: Application works without MongoDB using mock data
- **Authentication**: Uses JWT tokens stored in Redux
- **Real-time Updates**: Seat availability updates immediately
- **Responsive Design**: Works on mobile, tablet, and desktop

---

## 🎯 Next Steps

To extend this application:
1. Add payment gateway integration (Stripe/PayPal)
2. Implement email notifications for confirmations
3. Add admin dashboard for theater/movie management
4. Integrate real database (MongoDB Atlas)
5. Add seat availability real-time sync
6. Implement cancellation and refunds

---

**Enjoy booking your movies! 🍿🎭**
