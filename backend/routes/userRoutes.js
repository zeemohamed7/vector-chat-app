const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/userControllers')


router.post('/register', userCtrl.registerUser)
router.post('/login', userCtrl.authUser)

module.exports = router