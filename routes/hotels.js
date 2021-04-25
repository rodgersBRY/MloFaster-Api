const express = require('express')

const hotelController = require('../controllers/hotels')
const isAuth = require('../middleware/auth-guard')

const router = express.Router()

router.get('/', hotelController.getHotels)

router.post('/add', isAuth, hotelController.addHotel)

router.get('/hotel/:hotelId', isAuth, hotelController.getHotel)

router.put('/hotel/:hotelId', isAuth, hotelController.updateHotel)

router.delete('/delete/:hotelId', isAuth, hotelController.removeHotel)

module.exports = router