const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// Define routes
router.get('/movies', movieController.findAllMovies);
router.get('/movies/:id', movieController.findOne);
router.get('/movies/shows/:id', movieController.findShows);

module.exports = router;
