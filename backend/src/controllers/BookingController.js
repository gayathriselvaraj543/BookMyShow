const bookingService = require('../services/BookingService');

class BookingController {
  async createBooking(req, res) {
    try {
      const { userId, showId, seats } = req.body;
      const booking = await bookingService.createBooking(userId, showId, seats);
      res.status(201).json({
        success: true,
        data: booking
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const booking = await bookingService.getBooking(bookingId);
      res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getUserBookings(req, res) {
    try {
      const { userId } = req.params;
      const bookings = await bookingService.getUserBookings(userId);
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const booking = await bookingService.cancelBooking(bookingId);
      res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAvailableSeats(req, res) {
    try {
      const { showId } = req.params;
      const seats = await bookingService.getAvailableSeats(showId);
      res.status(200).json({
        success: true,
        data: seats
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new BookingController();
