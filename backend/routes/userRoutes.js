const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', userCtrl.registerUser)
router.post('/login', userCtrl.authUser)
router.get('/users', protect, userCtrl.allUsers)

module.exports = router