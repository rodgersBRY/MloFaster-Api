const express = require('express')
const { body } = require('express-validator')

const authController = require('../controllers/auth')
const User = require('../models/user')

const router = express.Router()

router.put('/register',[
    body('name', 'Name should be more than 5 characters').trim().not().isEmpty(),
    body('email', 'Enter a valid email').isEmail().custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-Mail already exists')
            }
        })
    }).normalizeEmail(),
    body('password', 'Password should be more than 5 characters').trim().isLength({ min: 5 }),
], authController.register)

router.post('/login', authController.login)

module.exports = router