const Movie = require('../models/Movie');

class MovieService {
  async getAllMovies(filters = {}) {
    const query = {};

    if (filters.genre) {
      query.genre = filters.genre;
    }
    if (filters.language) {
      query.language = filters.language;
    }
    if (filters.search) {
      query.title = { $regex: filters.search, $options: 'i' };
    }

    const movies = await Movie.find(query).sort({ releaseDate: -1 });
    return movies;
  }

  async getMovieById(movieId) {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  async addMovie(movieData) {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
  }

  async updateMovie(movieId, updateData) {
    const movie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  async deleteMovie(movieId) {
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }
}

module.exports = new MovieService();
