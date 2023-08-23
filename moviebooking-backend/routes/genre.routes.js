const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

// Define routes
router.get('/genres', genreController.findAllGenres);

module.exports = router;
