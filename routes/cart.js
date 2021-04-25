const express = require('express')

const cartController = require('../controllers/cart')
const isAuth = require('../middleware/auth-guard')

const router = express.Router()

router.get('/', isAuth, cartController.getCart)

router.post('/add/:itemId', isAuth, cartController.addItemToCart)

router.post('/delete/:itemId', isAuth, cartController.removeFromCart)

router.post('/clear', isAuth, cartController.clearCart)

router.get('/checkout', isAuth, cartController.checkout)

router.post('/order', isAuth, cartController.order)

module.exports = router