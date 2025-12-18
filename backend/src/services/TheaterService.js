const Theater = require('../models/Theater');

class TheaterService {
  async getAllTheaters(filters = {}) {
    const query = {};
    if (filters.city) {
      query.city = filters.city;
    }

    const theaters = await Theater.find(query).populate('screens');
    return theaters;
  }

  async getTheaterById(theaterId) {
    const theater = await Theater.findById(theaterId).populate('screens');
    if (!theater) {
      throw new Error('Theater not found');
    }
    return theater;
  }

  async addTheater(theaterData) {
    const theater = new Theater(theaterData);
    await theater.save();
    return theater;
  }

  async updateTheater(theaterId, updateData) {
    const theater = await Theater.findByIdAndUpdate(theaterId, updateData, { new: true });
    if (!theater) {
      throw new Error('Theater not found');
    }
    return theater;
  }
}

module.exports = new TheaterService();
