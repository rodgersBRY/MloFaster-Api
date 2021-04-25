const express = require('express')

const cartController = require('../controllers/cart')
const isAuth = require('../middleware/auth-guard')

const router = express.Router()

router.get('/', isAuth, cartController.getCart)

router.post('/add-item/:itemId', isAuth, cartController.addItemToCart)

router.post('/delete-item/:itemId', isAuth, cartController.removeFromCart)

router.post('/clear', isAuth, cartController.clearCart)

module.exports = router