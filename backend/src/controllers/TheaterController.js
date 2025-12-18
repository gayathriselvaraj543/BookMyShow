const theaterService = require('../services/TheaterService');

// Mock theaters data
const mockTheaters = [
  {
    _id: 'theater_1',
    name: 'PVR Cinemas',
    city: 'Mumbai',
    location: {
      latitude: 19.0760,
      longitude: 72.8777,
      address: 'High Street Phoenix, Mumbai'
    },
    screens: ['screen_1', 'screen_2', 'screen_3']
  },
  {
    _id: 'theater_2',
    name: 'Inox Cinemas',
    city: 'Mumbai',
    location: {
      latitude: 19.1136,
      longitude: 72.8697,
      address: 'Oberoi Mall, Mumbai'
    },
    screens: ['screen_4', 'screen_5']
  },
  {
    _id: 'theater_3',
    name: 'IMAX Cinema',
    city: 'Delhi',
    location: {
      latitude: 28.5244,
      longitude: 77.2066,
      address: 'Connaught Place, Delhi'
    },
    screens: ['screen_6']
  }
];

// Mock screens data with seat layout
const mockScreens = {
  'screen_1': {
    _id: 'screen_1',
    theaterId: 'theater_1',
    screenName: 'Screen 1',
    totalSeats: 48,
    seatLayout: {
      rows: ['A', 'B', 'C', 'D', 'E', 'F'],
      columns: 8,
      seatConfiguration: generateSeats(6, 8)
    }
  },
  'screen_2': {
    _id: 'screen_2',
    theaterId: 'theater_1',
    screenName: 'Screen 2',
    totalSeats: 72,
    seatLayout: {
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      columns: 8,
      seatConfiguration: generateSeats(9, 8)
    }
  }
};

// Mock shows data
const mockShows = [
  {
    _id: 'show_1',
    movieId: '1',
    screenId: 'screen_1',
    theaterId: 'theater_1',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    availableSeats: 30,
    totalSeats: 48,
    bookedSeats: {},
    price: 200
  },
  {
    _id: 'show_2',
    movieId: '1',
    screenId: 'screen_1',
    theaterId: 'theater_1',
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    availableSeats: 42,
    totalSeats: 48,
    bookedSeats: {},
    price: 200
  },
  {
    _id: 'show_3',
    movieId: '1',
    screenId: 'screen_2',
    theaterId: 'theater_2',
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    availableSeats: 55,
    totalSeats: 72,
    bookedSeats: {},
    price: 250
  },
  {
    _id: 'show_4',
    movieId: '2',
    screenId: 'screen_1',
    theaterId: 'theater_1',
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    availableSeats: 45,
    totalSeats: 48,
    bookedSeats: {},
    price: 200
  }
];

// Helper function to generate seat configuration
function generateSeats(rows, cols) {
  const config = {};
  let seatNumber = 1;
  const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const seatId = `${rowLabels[i]}${j + 1}`;
      config[seatId] = {
        row: rowLabels[i],
        column: j + 1,
        type: i < 2 ? 'premium' : 'standard',
        price: i < 2 ? 300 : 200,
        available: true
      };
      seatNumber++;
    }
  }
  return config;
}

class TheaterController {
  async getAllTheaters(req, res) {
    try {
      const filters = req.query;
      let theaters = await theaterService.getAllTheaters(filters);
      
      // Return mock data if no theaters found
      if (!theaters || theaters.length === 0) {
        let filteredTheaters = mockTheaters;
        if (filters.city) {
          filteredTheaters = mockTheaters.filter(t => t.city.toLowerCase() === filters.city.toLowerCase());
        }
        return res.status(200).json({
          success: true,
          data: filteredTheaters
        });
      }
      
      res.status(200).json({
        success: true,
        data: theaters
      });
    } catch (error) {
      // Return mock data on error
      let filteredTheaters = mockTheaters;
      if (req.query.city) {
        filteredTheaters = mockTheaters.filter(t => t.city.toLowerCase() === req.query.city.toLowerCase());
      }
      res.status(200).json({
        success: true,
        data: filteredTheaters
      });
    }
  }

  async getTheaterById(req, res) {
    try {
      const { theaterId } = req.params;
      let theater = await theaterService.getTheaterById(theaterId);
      
      // Try mock data if not found
      if (!theater) {
        theater = mockTheaters.find(t => t._id === theaterId);
      }
      
      if (!theater) {
        return res.status(404).json({
          success: false,
          message: 'Theater not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: theater
      });
    } catch (error) {
      // Return from mock data on error
      const theater = mockTheaters.find(t => t._id === req.params.theaterId);
      if (theater) {
        return res.status(200).json({
          success: true,
          data: theater
        });
      }
      
      res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }
  }

  // New endpoint to get shows for a movie and theater
  async getShowsByMovieAndTheater(req, res) {
    try {
      const { movieId, theaterId } = req.query;
      let shows = mockShows.filter(s => s.movieId === movieId);
      
      if (theaterId) {
        shows = shows.filter(s => s.theaterId === theaterId);
      }
      
      res.status(200).json({
        success: true,
        data: shows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get show details with screen info
  async getShowDetails(req, res) {
    try {
      const { showId } = req.params;
      let show = mockShows.find(s => s._id === showId);
      
      if (!show) {
        return res.status(404).json({
          success: false,
          message: 'Show not found'
        });
      }
      
      const screen = mockScreens[show.screenId];
      
      res.status(200).json({
        success: true,
        data: {
          ...show,
          screen
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async addTheater(req, res) {
    try {
      const theater = await theaterService.addTheater(req.body);
      res.status(201).json({
        success: true,
        data: theater
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateTheater(req, res) {
    try {
      const { theaterId } = req.params;
      const theater = await theaterService.updateTheater(theaterId, req.body);
      res.status(200).json({
        success: true,
        data: theater
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TheaterController();
