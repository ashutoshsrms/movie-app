const express = require('express');
const router = express.Router();
const authController = require('../../controllers/user/auth.controller');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout/:userId', authController.logout);

module.exports = router;