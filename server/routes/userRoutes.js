const express = require('express');
const router = express.Router();
const { getProfile, getProgress } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/profile', getProfile);
router.get('/progress', getProgress);

module.exports = router;
