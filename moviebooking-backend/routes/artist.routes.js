const express = require('express');
const router = express.Router();
const {authenticateToken}= require('../middleware/authenticateUser');
const artistController = require('../controllers/artist.controller');

// Define routes
router.get('/artists',authenticateToken, artistController.findAllArtists);

module.exports = router;
