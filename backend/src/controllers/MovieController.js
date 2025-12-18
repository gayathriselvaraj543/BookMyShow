const movieService = require('../services/MovieService');

// Mock movies for offline mode
const mockMovies = [
  {
    _id: '1',
    title: 'Inception',
    description: 'A skilled thief who steals corporate secrets through dream-sharing technology.',
    genre: ['Sci-Fi', 'Thriller'],
    duration: 148,
    releaseDate: new Date('2010-07-16'),
    language: ['English', 'Hindi'],
    rating: 4.5,
    posterUrl: 'https://via.placeholder.com/300x400?text=Inception',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Ellen Page']
  },
  {
    _id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 152,
    releaseDate: new Date('2008-07-18'),
    language: ['English', 'Hindi'],
    rating: 4.8,
    posterUrl: 'https://via.placeholder.com/300x400?text=The+Dark+Knight',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger']
  },
  {
    _id: '3',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    duration: 169,
    releaseDate: new Date('2014-11-07'),
    language: ['English', 'Hindi'],
    rating: 4.7,
    posterUrl: 'https://via.placeholder.com/300x400?text=Interstellar',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway']
  }
];

class MovieController {
  async getAllMovies(req, res) {
    try {
      const filters = req.query;
      let movies = await movieService.getAllMovies(filters);
      
      // Return mock data if no movies found
      if (!movies || movies.length === 0) {
        movies = mockMovies;
      }
      
      res.status(200).json({
        success: true,
        data: movies
      });
    } catch (error) {
      // Return mock data on error (offline mode)
      res.status(200).json({
        success: true,
        data: mockMovies
      });
    }
  }

  async getMovieById(req, res) {
    try {
      const { movieId } = req.params;
      let movie = await movieService.getMovieById(movieId);
      
      // Try mock data if not found
      if (!movie) {
        movie = mockMovies.find(m => m._id === movieId);
      }
      
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: movie
      });
    } catch (error) {
      // Return from mock data on error
      const movie = mockMovies.find(m => m._id === req.params.movieId);
      if (movie) {
        return res.status(200).json({
          success: true,
          data: movie
        });
      }
      
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async addMovie(req, res) {
    try {
      const movie = await movieService.addMovie(req.body);
      res.status(201).json({
        success: true,
        data: movie
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateMovie(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await movieService.updateMovie(movieId, req.body);
      res.status(200).json({
        success: true,
        data: movie
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteMovie(req, res) {
    try {
      const { movieId } = req.params;
      await movieService.deleteMovie(movieId);
      res.status(200).json({
        success: true,
        message: 'Movie deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new MovieController();
