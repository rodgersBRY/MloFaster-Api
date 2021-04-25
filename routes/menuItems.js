const express = require('express')

const menuController = require('../controllers/menu-items')
const isAuth = require('../middleware/auth-guard')

const router = express.Router()

router.get('/:hotelId', isAuth, menuController.getMenuItems)

router.post('/add-menu-item/:hotelId', isAuth, menuController.addMenuItem)

router.put('/menu-item/:itemId', isAuth, menuController.updateMenuItem)

router.delete('/menu-item/:itemId', isAuth, menuController.deleteMenuItem)

// router.get('/cart', menuController.getCart)

module.exports = router