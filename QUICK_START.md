# 🎬 BookMyShow - Quick Start Guide

## ⚡ Start the Application (5 minutes)

### Option 1: Run Both Servers
```bash
# Terminal 1: Start Backend
cd backend
npm install
npm start

# Terminal 2: Start Frontend
cd frontend
npm install
npm start
```

Open browser: `http://localhost:3000`

### Option 2: Using npm concurrently (if installed)
```bash
npm install -g concurrently
concurrently "cd backend && npm start" "cd frontend && npm start"
```

---

## 🎯 Complete Booking Workflow in 5 Steps

### 1️⃣ Browse Movies (No Login)
- Go to home page
- See **Inception**, **The Dark Knight**, **Interstellar**
- Click **"Book Tickets"** on any movie

### 2️⃣ Select Theater & Show
- Expand theater accordion (PVR, Inox, IMAX)
- Click **"View Shows"**
- See available showtimes with prices

### 3️⃣ Select Seats (Login Required)
- Login/Register if needed
- Click **"Select Seats"**
- See interactive seat grid
- Click seats to select (🟩 = selected)
- Check price in sidebar

### 4️⃣ Confirm Booking
- Review all details
- Click **"Confirm & Pay"**
- Get booking confirmation ID

### 5️⃣ View Booking
- Go to **"My Bookings"** in menu
- See your reservation
- Print or download ticket

---

## 🔑 Test Credentials

**Create your own account:**
1. Click **"Register"** in header
2. Enter name, email, password
3. Click **"Register"**
4. Login with your credentials

**Or use any email/password when registering** - app works in offline mode!

---

## 💡 Key Features

✅ **Public Movies** - Browse without login
✅ **Theater Selection** - Multiple cities & screens
✅ **Seat Selection** - Interactive grid with pricing
✅ **Instant Booking** - No payment gateway needed
✅ **Booking History** - View all your reservations
✅ **Mobile Responsive** - Works on all devices

---

## 🎨 Seat Pricing

| Type | Price | Rows |
|------|-------|------|
| Premium | ₹300 | A-B |
| Standard | ₹200 | C-I |
| Booking Fee | ₹50 | - |
| Tax (5%) | Auto | - |

---

## 🆘 Quick Troubleshooting

**Port already in use?**
```bash
# Kill port and restart
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill -9
```

**Movies not showing?**
- Refresh page (Ctrl+R)
- Clear cache (Ctrl+Shift+Delete)
- Check backend console for errors

**Can't select seats?**
- Must be logged in
- Movie must have available shows
- Theater must be selected first

**Booking not saving?**
- Check browser DevTools → Network tab
- Verify backend is running on port 5000
- Check Redux DevTools for state

---

## 📂 File Structure

```
bookmyshow/
├── backend/
│   ├── src/
│   │   ├── controllers/ (business logic)
│   │   ├── models/ (database schemas)
│   │   ├── routes/ (API endpoints)
│   │   ├── middleware/ (auth, errors)
│   │   └── server.js (entry point)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/ (movie, seat, booking pages)
│   │   ├── components/ (header, footer)
│   │   ├── redux/ (state management)
│   │   ├── services/ (API calls)
│   │   ├── styles/ (CSS files)
│   │   └── App.jsx (routing)
│   └── package.json
│
├── SETUP.md (installation guide)
└── COMPLETE_WORKFLOW.md (full documentation)
```

---

## 🚀 What's New in This Version

✨ **Full Booking Workflow Implemented:**
- ✅ SeatSelectionPage.jsx - Interactive seat booking interface
- ✅ BookingConfirmationPage.jsx - Review & confirm booking
- ✅ Updated MovieDetailPage.jsx - Theater & show selection
- ✅ Mock shows & seats data in backend
- ✅ Seat pricing configuration (Premium/Standard)
- ✅ Redux state management for booking flow

---

## 📱 Responsive Design

- **Desktop** (1200px+): Full layout with sidebars
- **Tablet** (768px - 1199px): Adjusted grid layout
- **Mobile** (< 768px): Single column, touch-friendly

---

## 🎯 Next: Advanced Features

Want to add more? Try these:
1. Real payment gateway (Stripe/Razorpay)
2. Email confirmations
3. Admin dashboard
4. Seat availability sync
5. Cancel/refund system
6. Rating & reviews

---

**Happy Booking! 🍿**

For complete documentation, see `COMPLETE_WORKFLOW.md`
