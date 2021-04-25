// 3rd party packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// hide critical info from public
const config = require('./.env/index')
const User = require('./models/user')

// import the routes
const authRoutes = require('./routes/auth')
const hotelRoutes = require('./routes/hotels')
const imageRoutes = require('./routes/multer')
const menuRoutes = require('./routes/menuItems')
const cartRoutes = require('./routes/cart')

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const port = process.env.PORT || 4000

// Add the routes
app.use('/auth', authRoutes)
app.use('/hotels', hotelRoutes)
app.use('/images', imageRoutes)
app.use('/menu-items', menuRoutes)
app.use('/cart', cartRoutes)

// error handling middleware
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data: data
    })
})

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    app.listen(port, () => {
        console.log('MloFaster, Chakula fika faster')
    })
}).catch(err => {
    console.log(err)
})
