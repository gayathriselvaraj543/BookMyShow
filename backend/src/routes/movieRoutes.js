const express = require('express');
const movieController = require('../controllers/MovieController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => movieController.getAllMovies(req, res));
router.get('/:movieId', (req, res) => movieController.getMovieById(req, res));
router.post('/', authMiddleware, (req, res) => movieController.addMovie(req, res));
router.put('/:movieId', authMiddleware, (req, res) => movieController.updateMovie(req, res));
router.delete('/:movieId', authMiddleware, (req, res) => movieController.deleteMovie(req, res));

module.exports = router;
