const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const {authenticateToken}= require('../middleware/authenticateUser');


// Define routes
router.get('/movies',authenticateToken, movieController.findAllMovies);
router.get('/movies/:id',authenticateToken, movieController.findOne);
router.get('/movies/shows/:id',authenticateToken, movieController.findShows);

module.exports = router;
