const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) {
        const error = new Error('Unauthorized Operation!')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch(err) {
        err.statusCode = 500
        next(err)
    }

    if(!decodedToken) {
        const error = new Error('Unauthorized Operation!')
        error.statusCode = 401
        throw error
    }

    // store the userId inside the request
    req.userId = decodedToken.userId
    next()
}