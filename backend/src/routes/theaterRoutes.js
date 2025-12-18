const express = require('express');
const theaterController = require('../controllers/TheaterController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => theaterController.getAllTheaters(req, res));
router.get('/:theaterId', (req, res) => theaterController.getTheaterById(req, res));
router.get('/shows/by-movie', (req, res) => theaterController.getShowsByMovieAndTheater(req, res));
router.get('/show/:showId/details', (req, res) => theaterController.getShowDetails(req, res));
router.post('/', authMiddleware, (req, res) => theaterController.addTheater(req, res));
router.put('/:theaterId', authMiddleware, (req, res) => theaterController.updateTheater(req, res));

module.exports = router;
