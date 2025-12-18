const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  screenName: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  seatLayout: {
    rows: [String],
    columns: Number,
    seatConfiguration: mongoose.Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Screen', screenSchema);
