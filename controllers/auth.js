const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator') // input validator

// import user model
const User = require('../models/user')
const secret = require('../.env/index')

exports.register = async (req, res, next) => {
    // TODO: validate the inputs first thing
    
    const email = req.body.email
    const name = req.body.name
    const phoneNo = req.body.phoneNo
    const password = req.body.password
    const status = req.body.status
    
    try {
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({
            name: name,
            email: email,
            status: status,
            phoneNo: '+254 ' + phoneNo,
            password: hashedPw,
            cart: { items: []}
        })
        const result = await user.save()
        res.status(201).json({
            message: "User created as " + result.status,
            userId: result._id
        })
    } catch(err) {
        if(!err.statusCode) { // use next() instead of throw
            err.statusCode = 500
        }
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    let loadedUser
    try {
        const user = await User.findOne({email: email})
        if(!user) {
            const error = new Error('User does not exist')
            error.statusCode = 401
            throw error
        }
        loadedUser = user
        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual) {
            const error = new Error('Wrong password!')
            error.statusCode = 401
            throw error
        }

        // create a jwt token and sign it
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 
            secret.SECRET, 
            { expiresIn: '1h' }
        )
        res.status(200).json({
            userId: loadedUser._id.toString(),
            token: token
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}