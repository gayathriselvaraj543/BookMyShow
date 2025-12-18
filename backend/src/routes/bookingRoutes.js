const express = require('express');
const bookingController = require('../controllers/BookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, (req, res) => bookingController.createBooking(req, res));
router.get('/:bookingId', authMiddleware, (req, res) => bookingController.getBooking(req, res));
router.get('/user/:userId', authMiddleware, (req, res) => bookingController.getUserBookings(req, res));
router.delete('/:bookingId', authMiddleware, (req, res) => bookingController.cancelBooking(req, res));
router.get('/show/:showId/available-seats', (req, res) => bookingController.getAvailableSeats(req, res));

module.exports = router;
