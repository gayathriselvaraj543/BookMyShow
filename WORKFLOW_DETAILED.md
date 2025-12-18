# 🎬 BookMyShow - Complete End-to-End Booking Workflow

## 📺 Visual Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     BOOKMYSHOW APPLICATION                      │
│                    (Complete User Journey)                      │
└─────────────────────────────────────────────────────────────────┘

         ┌──────────────────┐
         │   HOME PAGE      │
         │  (No Login)      │
         │  View 3 Movies   │
         └────────┬─────────┘
                  │ Click "Book Tickets"
                  ▼
         ┌──────────────────────────┐
         │  MOVIE DETAIL PAGE       │
         │  (No Login Required)     │
         │  Show theaters by city   │
         └────────┬─────────────────┘
                  │ Click "View Shows"
                  ▼
         ┌──────────────────────────┐
         │  THEATER & SHOW          │
         │  (No Login Required)     │
         │  Display show times      │
         │  Display available seats │
         └────────┬─────────────────┘
                  │ Click "Select Seats"
                  ▼
         ┌──────────────────────────┐
         │  LOGIN/REGISTER PAGE     │ ◄──── AUTHENTICATION REQUIRED
         │  (Redirected if not auth)│
         └────────┬─────────────────┘
                  │ After login/register
                  ▼
         ┌──────────────────────────┐
         │  SEAT SELECTION PAGE     │
         │  (Interactive Grid)      │
         │  ┌──┬──┬──┬──┐          │
         │  │🟨│🟨│🟦│🟦│ Row A    │
         │  ├──┼──┼──┼──┤          │
         │  │🟨│🟩│🟩│🟦│ Row B    │  ← User selects seats
         │  ├──┼──┼──┼──┤          │
         │  │🟦│🟦│🟦│🔴│ Row C    │  🟨=Premium ₹300
         │  └──┴──┴──┴──┘          │  🟦=Standard ₹200
         │  Selected: B2, B3       │  🟩=Selected
         │  Total: ₹650            │  🔴=Booked
         └────────┬─────────────────┘
                  │ Click "Proceed to Payment"
                  ▼
         ┌──────────────────────────┐
         │  BOOKING CONFIRMATION    │
         │  (Review All Details)    │
         │                          │
         │  Movie: Inception        │
         │  Theater: PVR Cinemas    │
         │  Show: 2:00 PM           │
         │  Seats: B2, B3           │
         │  Total: ₹645 (₹600+      │
         │          ₹50 fee + ₹-5   │  ← Review before paying
         │          GST adjustment) │
         └────────┬─────────────────┘
                  │ Click "Confirm & Pay"
                  ▼
         ┌──────────────────────────┐
         │  SUCCESS PAGE            │
         │                          │
         │      ✅ CONFIRMED        │
         │                          │
         │  Booking ID:             │
         │  BMS1704067890123        │
         │                          │
         │  Redirecting to          │
         │  My Bookings...          │
         └────────┬─────────────────┘
                  │ (Auto-redirect after 3 seconds)
                  ▼
         ┌──────────────────────────┐
         │  MY BOOKINGS PAGE        │
         │  (Show all bookings)     │
         │                          │
         │  ✅ Inception            │
         │     PVR Cinemas - B2,B3  │
         │     Booking ID: BMS...   │
         │     Status: Confirmed    │
         └──────────────────────────┘
```

---

## 🎯 Step-by-Step Detailed Workflow

### STEP 1: HOME PAGE - Movie Discovery

**URL**: `http://localhost:3000/`

**What User Sees**:
```
┌─────────────────────────────────────────────┐
│              BOOKMYSHOW                     │
│  ┌──────────┬──────────┬──────────┐        │
│  │ Inception│   Dark   │Interstellar       │
│  │          │  Knight  │          │        │
│  │ Rating   │ Rating   │ Rating   │        │
│  │ ⭐ 8.8   │ ⭐ 9.0   │ ⭐ 8.6   │        │
│  │ [Book]   │ [Book]   │ [Book]   │        │
│  └──────────┴──────────┴──────────┘        │
└─────────────────────────────────────────────┘
```

**Data Loaded**:
- API Call: `GET /api/movies`
- Redux: `dispatch(setMovies(movieList))`
- No authentication required
- Movies publicly visible

**User Action**: Click "Book Tickets" button on Inception

---

### STEP 2: MOVIE DETAIL PAGE - Theater Selection

**URL**: `http://localhost:3000/movie/1`

**What User Sees**:
```
┌─────────────────────────────────────────────┐
│           MOVIE: INCEPTION                  │
│  ┌────────┐                                 │
│  │        │  Duration: 148 min              │
│  │ Poster │  Genre: Sci-Fi, Thriller       │
│  │        │  Rating: ⭐ 8.8/10              │
│  │        │  Description: A skilled thief   │
│  └────────┘  who steals corporate secrets..│
│                                             │
│  ▼ THEATERS                                │
│  ┌─ PVR Cinemas - Mumbai (5 screens) ──┐  │
│  │  [View Shows]                        │  │
│  └─────────────────────────────────────┘  │
│  ┌─ Inox - Mumbai (4 screens) ──────────┐ │
│  │  [View Shows]                        │ │
│  └─────────────────────────────────────┘  │
│  ┌─ IMAX - Delhi (3 screens) ───────────┐ │
│  │  [View Shows]                        │ │
│  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Data Loaded**:
- API Call: `GET /api/movies/1` (movie details)
- API Call: `GET /api/theaters` (all theaters)
- Redux: `dispatch(setSelectedMovie(movie))`
- No authentication required yet

**User Action**: Click "View Shows" for PVR Cinemas

---

### STEP 3: SHOW SELECTION - Available Showtimes

**Displayed in MovieDetailPage.jsx Accordion**

**What User Sees**:
```
┌─────────────────────────────────────────────┐
│  PVR Cinemas - Mumbai (5 screens)          │
│  123 Main Street, Mumbai                    │
│                                             │
│  AVAILABLE SHOWS:                          │
│  ┌──────────────┬──────────────┐           │
│  │ 02:00 PM     │ 06:00 PM     │           │
│  │ 2 Feb 2024   │ 2 Feb 2024   │           │
│  │ Price: ₹200  │ Price: ₹250  │           │
│  │ Seats: 30/48 │ Seats: 42/48 │           │
│  │ [Select]     │ [Select]     │           │
│  └──────────────┴──────────────┘           │
└─────────────────────────────────────────────┘
```

**Data Loaded**:
- API Call: `GET /api/theaters/shows/by-movie?movieId=1&theaterId=theater_1`
- Returns array of shows with:
  - Show ID (show_1, show_2, etc.)
  - Start time & end time
  - Price per ticket
  - Available seats count
  - Total seats in theater

**User Action**: Click "Select Seats" for 02:00 PM show

---

### STEP 4A: AUTHENTICATION CHECK

**If User Not Logged In**:

**Redirect to**: `http://localhost:3000/login`

**What User Sees**:
```
┌─────────────────────────────────────────────┐
│              LOGIN                          │
│                                             │
│  Email: [___________________]               │
│  Password: [___________________]            │
│                                             │
│  [LOGIN]  [Don't have account? Register]   │
└─────────────────────────────────────────────┘
```

**User Options**:
1. Login with existing account
2. Register new account

**Backend Processing**:
- API Call: `POST /api/auth/login`
- Validates email & password
- Generates JWT token
- Returns: `{ user: { name, email }, token }`

**Redux State Updated**:
```javascript
auth: {
  user: { name: "John Doe", email: "john@example.com" },
  token: "eyJhbGc...",
  isAuthenticated: true
}
```

---

### STEP 4B: SEAT SELECTION PAGE

**URL**: `http://localhost:3000/seat-selection/show_1`

**What User Sees**:
```
┌────────────────────────────────────────────────────┐
│         SELECT YOUR SEATS                          │
│    Show Time: 2:00 PM, 2 Feb 2024                 │
│                                                    │
│    ┌─────────────────────────────┐  ┌──────────┐ │
│    │      SCREEN                 │  │ BOOKING  │ │
│    │                             │  │ SUMMARY  │ │
│    │  A  🟨🟨🟦🟦🟦🟦🟦🟦      │  │          │ │
│    │  B  🟨🟩🟩🟦🟦🟦🟦🟦      │  │ Selected:│ │
│    │  C  🟦🟦🟦🔴🟦🟦🟦🟦      │  │ B2, B3   │ │
│    │  D  🟦🟦🟦🟦🟦🟦🟦🟦      │  │          │ │
│    │  E  🟦🟦🟦🟦🟦🟦🟦🟦      │  │ Prices:  │ │
│    │  F  🟦🟦🟦🟦🟦🟦🟦🟦      │  │ ₹300 x2  │ │
│    │  G  🟦🟦🟦🟦🟦🟦🟦🟦      │  │ = ₹600   │ │
│    │  H  🟦🟦🟦🟦🟦🟦🟦🟦      │  │          │ │
│    │  I  🟦🟦🟦🟦🟦🟦🟦🟦      │  │ Total:   │ │
│    │                             │  │ ₹600     │ │
│    │ Legend:                     │  │          │ │
│    │ 🟨=Premium ₹300  🟦=Standard│  │[Proceed] │ │
│    │ 🟩=Selected  🔴=Booked     │  └──────────┘ │
│    └─────────────────────────────┘              │
└────────────────────────────────────────────────────┘
```

**Interactive Features**:
- Click seat to select (changes to green 🟩)
- Click again to deselect
- Real-time price calculation
- Can select multiple seats
- Booked seats are disabled (gray 🔴)

**Data Loaded**:
- API Call: `GET /api/theaters/show/show_1/details`
- Returns:
  ```javascript
  {
    showId: "show_1",
    startTime: "2024-02-02T14:00:00",
    price: 200,
    screen: {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      columns: 8,
      seatConfiguration: {
        "A1": { row: "A", column: 1, type: "premium", price: 300, available: true },
        "A2": { row: "A", column: 2, type: "premium", price: 300, available: true },
        // ... more seats
        "B4": { row: "B", column: 4, type: "standard", price: 200, available: false },
        // ... more seats
      }
    }
  }
  ```

**Redux State Updated**:
```javascript
booking: {
  selectedSeats: ['B2', 'B3'],
  selectedShow: { _id: 'show_1', price: 200, ... },
  bookingData: null,
  isLoading: false,
  error: null
}
```

**User Action**: Click "Proceed to Payment" button

---

### STEP 5: BOOKING CONFIRMATION PAGE

**URL**: `http://localhost:3000/booking-confirmation`

**What User Sees**:
```
┌─────────────────────────────────────────────────────┐
│         CONFIRM YOUR BOOKING                        │
│                                                     │
│  ┌──────────────────┐  ┌─────────────────────────┐│
│  │  MOVIE DETAILS   │  │   PRICE BREAKDOWN       ││
│  │                  │  │                         ││
│  │ [Poster]         │  │ Seat Charge:   ₹600     ││
│  │ Inception        │  │ Booking Fee:   ₹50      ││
│  │ Duration: 148 min│  │ GST (5%):      ₹32.50  ││
│  │ Rating: 8.8/10   │  │ ─────────────────────── ││
│  └──────────────────┘  │ TOTAL: ₹682.50          ││
│                        │                         ││
│  ┌──────────────────┐  │ [CONFIRM & PAY]         ││
│  │ THEATER & SHOW   │  │ [BACK]                  ││
│  │                  │  └─────────────────────────┘│
│  │ PVR Cinemas      │                             │
│  │ Mumbai           │                             │
│  │ Show: 2:00 PM    │                             │
│  │ 2 Feb 2024       │                             │
│  └──────────────────┘                             │
│                                                     │
│  ┌──────────────────┐                             │
│  │ SELECTED SEATS   │                             │
│  │                  │                             │
│  │ B2  B3           │                             │
│  └──────────────────┘                             │
│                                                     │
│  ┌──────────────────┐                             │
│  │ YOUR DETAILS     │                             │
│  │                  │                             │
│  │ Name: John Doe   │                             │
│  │ Email: john@...  │                             │
│  │ Phone: 98...     │                             │
│  └──────────────────┘                             │
└─────────────────────────────────────────────────────┘
```

**Data Displayed**:
- Movie details from Redux/API
- Theater and show information
- Selected seats with individual prices
- Price breakdown with taxes
- User profile information

**User Action**: Click "Confirm & Pay" button

---

### STEP 6: BOOKING CONFIRMATION - PROCESSING

**Backend Processing**:
- API Call: `POST /api/bookings`
- Request Body:
  ```javascript
  {
    userId: "user_123",
    showId: "show_1",
    seats: ['B2', 'B3'],
    totalAmount: 682.50,
    status: "confirmed"
  }
  ```
- Response:
  ```javascript
  {
    bookingId: "BMS1704067890123",
    status: "confirmed",
    createdAt: "2024-02-02T14:30:00"
  }
  ```

**Redux State Updated**:
```javascript
booking: {
  selectedSeats: [],  // Reset
  selectedShow: null, // Reset
  bookingData: {
    bookingId: "BMS1704067890123",
    status: "confirmed",
    totalAmount: 682.50
  },
  isLoading: false,
  error: null
}
```

---

### STEP 7: SUCCESS PAGE

**What User Sees**:
```
┌─────────────────────────────────────────────┐
│                                             │
│              ✅ BOOKING CONFIRMED           │
│                                             │
│                                             │
│         Your booking has been               │
│         successfully completed              │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │                                     │  │
│  │  Booking ID: BMS1704067890123       │  │
│  │                                     │  │
│  │  Confirmation email sent to:        │  │
│  │  john@example.com                   │  │
│  │                                     │  │
│  │  Redirecting to My Bookings...      │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                             │
│        ⏳ (Redirecting in 3 seconds)       │
│                                             │
└─────────────────────────────────────────────┘
```

**Auto-Redirect**: After 3 seconds to `/my-bookings`

---

### STEP 8: MY BOOKINGS PAGE

**URL**: `http://localhost:3000/my-bookings`

**What User Sees**:
```
┌─────────────────────────────────────────────────┐
│           MY BOOKINGS                           │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │ ✅ CONFIRMED                            │  │
│  │                                         │  │
│  │ Movie: Inception                        │  │
│  │ Theater: PVR Cinemas, Mumbai            │  │
│  │ Show: 2:00 PM, 2 Feb 2024              │  │
│  │ Seats: B2, B3                           │  │
│  │ Total: ₹682.50                          │  │
│  │ Booking ID: BMS1704067890123            │  │
│  │                                         │  │
│  │ [View Ticket]  [Cancel]  [Download]    │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  (More bookings below...)                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Data Loaded**:
- API Call: `GET /api/bookings/user_123`
- Displays all user's bookings (past and upcoming)
- Each booking shows full details

---

## 📊 Data Flow Summary

```
┌─────────────────────────────────────────────────┐
│         USER INTERACTION FLOW                   │
└─────────────────────────────────────────────────┘

1. HOME PAGE
   └─→ GET /api/movies
       └─→ dispatch(setMovies(data))
           └─→ Redux: movies.movieList

2. MOVIE DETAIL
   └─→ GET /api/movies/:movieId
   └─→ GET /api/theaters
       └─→ dispatch(setSelectedMovie(movie))
           └─→ Redux: movies.selectedMovie

3. SHOW SELECTION
   └─→ GET /api/theaters/shows/by-movie?movieId=&theaterId=
       └─→ Display shows with times and prices

4. LOGIN (if needed)
   └─→ POST /api/auth/login
       └─→ dispatch(setUser(user, token))
           └─→ Redux: auth.user, auth.token

5. SEAT SELECTION
   └─→ GET /api/theaters/show/:showId/details
       └─→ dispatch(selectSeats(selectedSeats))
           └─→ Redux: booking.selectedSeats

6. BOOKING CONFIRMATION
   └─→ Review all Redux state
       └─→ User confirms

7. CREATE BOOKING
   └─→ POST /api/bookings
   └─→ { userId, showId, seats, totalAmount }
       └─→ dispatch(bookingSuccess(bookingData))
           └─→ Redux: booking.bookingData

8. MY BOOKINGS
   └─→ GET /api/bookings/:userId
       └─→ Display all user bookings
```

---

## 🔐 Authentication Flow

```
UNAUTHENTICATED USER
│
├─→ Can access:
│   ├─ Home page
│   ├─ Movie details
│   └─ Theater/show information
│
└─→ Cannot access:
    ├─ Seat selection
    ├─ Booking confirmation
    └─ My bookings
        ↓
        Redirected to Login

AUTHENTICATED USER
│
├─→ Can access:
│   ├─ Everything above
│   ├─ Seat selection
│   ├─ Booking confirmation
│   ├─ Create bookings
│   └─ My bookings
│
└─→ JWT token stored in:
    ├─ Redux state (auth.token)
    ├─ Browser localStorage
    └─ Request headers (Authorization: Bearer token)
```

---

## 💰 Pricing Calculation

```
SEAT SELECTION:
─────────────────
Seat B2 (Premium): ₹300
Seat B3 (Premium): ₹300
Subtotal: ₹600

CONFIRMATION PAGE:
──────────────────
Seat Charge: ₹600
Booking Fee: ₹50
Subtotal: ₹650

GST (5%): ₹650 × 0.05 = ₹32.50

TOTAL: ₹682.50
```

---

## 🎯 Key Features Demonstrated

✅ **Public Access** - Movies visible without login
✅ **Authentication** - Login required for booking
✅ **Dynamic Theater Selection** - Multiple theaters with different screens
✅ **Show Availability** - Real-time seat counts
✅ **Interactive Seats** - Visual seat selection with pricing
✅ **Price Calculation** - Dynamic price updates
✅ **Booking Confirmation** - Review before payment
✅ **Booking History** - View all past bookings
✅ **Responsive Design** - Works on all devices
✅ **Error Handling** - Graceful fallbacks

---

## ⚙️ Technical Stack

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 18 |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| API Client | Axios |
| Styling | Bootstrap 5 + Custom CSS |
| Backend | Express.js + Node.js |
| Database | MongoDB (with offline mock fallback) |
| Authentication | JWT Tokens |

---

This complete workflow demonstrates a fully functional movie booking system from browsing to confirmation. The application handles all steps seamlessly with proper authentication, state management, and error handling.

**🎬 Ready to Book Your Movie! 🍿**
