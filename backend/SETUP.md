# Backend Setup and Installation Guide

## Prerequisites
- Node.js 18+ 
- MongoDB 5.0+ (local or cloud)
- npm or yarn

## Installation Steps

### 1. Install Node Modules
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file based on `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmyshow
JWT_SECRET=your_very_secure_jwt_secret_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
BCRYPT_ROUNDS=10
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Windows
mongod

# Linux/Mac
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in `.env`

### 4. Start Development Server
```bash
npm run dev
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
```
POST /api/auth/register
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9999999999"
}

POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
```

### Movies
```
GET /api/movies
GET /api/movies?genre=Action&language=Hindi
GET /api/movies/:movieId
POST /api/movies (requires auth)
PUT /api/movies/:movieId (requires auth)
DELETE /api/movies/:movieId (requires auth)
```

### Theaters
```
GET /api/theaters
GET /api/theaters?city=Mumbai
GET /api/theaters/:theaterId
POST /api/theaters (requires auth)
PUT /api/theaters/:theaterId (requires auth)
```

### Bookings
```
POST /api/bookings (requires auth)
GET /api/bookings/:bookingId (requires auth)
GET /api/bookings/user/:userId (requires auth)
DELETE /api/bookings/:bookingId (requires auth)
GET /api/bookings/show/:showId/available-seats
```

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── MovieController.js
│   │   ├── BookingController.js
│   │   └── TheaterController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Movie.js
│   │   ├── Theater.js
│   │   ├── Screen.js
│   │   ├── Show.js
│   │   ├── Booking.js
│   │   ├── Payment.js
│   │   └── Review.js
│   ├── services/
│   │   ├── AuthService.js
│   │   ├── MovieService.js
│   │   ├── BookingService.js
│   │   └── TheaterService.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── theaterRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   └── server.js                # Entry point
├── .env.example
├── package.json
└── README.md
```

## Common Issues & Solutions

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED
```
Solution: Ensure MongoDB is running. Check connection string.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Change PORT in `.env` or kill the process using port 5000.

### JWT Token Invalid
```
Error: Invalid token
```
Solution: Ensure JWT_SECRET is consistent. Generate new token after change.

## Development Commands

```bash
# Run with nodemon (auto-restart)
npm run dev

# Run production mode
npm start

# Run tests
npm test
```

## Testing with Postman

1. Download Postman
2. Import the API endpoints
3. Set `Authorization` header with token from login
4. Test each endpoint

## Performance Tips

- Add database indexes on frequently queried fields
- Implement pagination for large datasets
- Use connection pooling for MongoDB
- Cache frequently accessed data

