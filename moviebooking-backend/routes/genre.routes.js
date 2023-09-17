const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');
const {authenticateToken}= require('../middleware/authenticateUser');

// Define routes
router.get('/genres',authenticateToken, genreController.findAllGenres);

module.exports = router;
