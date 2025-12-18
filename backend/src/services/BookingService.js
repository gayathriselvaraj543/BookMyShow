const Booking = require('../models/Booking');
const Show = require('../models/Show');

class BookingService {
  async createBooking(userId, showId, seats) {
    const show = await Show.findById(showId);
    if (!show) {
      throw new Error('Show not found');
    }

    if (show.availableSeats < seats.length) {
      throw new Error('Not enough seats available');
    }

    const totalAmount = seats.length * 100; // Example price

    const booking = new Booking({
      userId,
      showId,
      movieId: show.movieId,
      seats,
      totalAmount,
      showDate: show.startTime
    });

    await booking.save();

    // Update show available seats
    show.availableSeats -= seats.length;
    for (const seat of seats) {
      show.bookedSeats.set(seat, {
        bookingId: booking._id,
        bookedAt: new Date()
      });
    }
    await show.save();

    return booking;
  }

  async getBooking(bookingId) {
    const booking = await Booking.findById(bookingId).populate('userId').populate('movieId');
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async getUserBookings(userId) {
    const bookings = await Booking.find({ userId }).populate('movieId').populate('showId');
    return bookings;
  }

  async cancelBooking(bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status === 'cancelled') {
      throw new Error('Booking is already cancelled');
    }

    booking.status = 'cancelled';
    booking.cancellationDate = new Date();
    booking.refundAmount = booking.totalAmount;
    await booking.save();

    // Release seats
    const show = await Show.findById(booking.showId);
    for (const seat of booking.seats) {
      show.bookedSeats.delete(seat);
      show.availableSeats += 1;
    }
    await show.save();

    return booking;
  }

  async getAvailableSeats(showId) {
    const show = await Show.findById(showId);
    if (!show) {
      throw new Error('Show not found');
    }

    const bookedSeats = Array.from(show.bookedSeats.keys());
    return {
      totalSeats: show.totalSeats,
      availableSeats: show.availableSeats,
      bookedSeats
    };
  }
}

module.exports = new BookingService();
