const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);  // ✅ This line fails if loginUser is undefined or not a function

module.exports = router;
