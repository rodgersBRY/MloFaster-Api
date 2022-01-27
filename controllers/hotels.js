const Hotel = require('../models/hotel')
const User = require('../models/user')
const Item = require('../models/menu-item')

exports.getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        if(hotels.length > 0) {
            res.status(200).json({
                hotels: hotels
            })
        } else {
            res.status(200).json({
                message: 'There are no hotels yet'
            })
        }
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.addHotel = async (req, res, next) => {
    // const image  = req.file
    const name = req.body.name
    const email = req.body.email
    const phoneNo = req.body.phoneNo
    
    try {
        const hotelExists = await Hotel.findOne({email: email})
        if(hotelExists) {
            const error = new Error('There is a hotel with the same E-Mail')
            error.statusCode = 401
            throw error
        }

        const hotel = new Hotel({
            name: name,
            email: email,
            // imageUrl: image,
            userId: req.userId,
            phoneNo: phoneNo
        })
        const result = await hotel.save()
        res.status(201).json({
            hotel: result
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId

    const name = req.body.name
    const email = req.body.email
    const phoneNo = req.body.phoneNo

    try {

        const hotel = await Hotel.findById(hotelId)
        hotel.name = name
        hotel.email = email
        hotel.phoneNo = phoneNo

        const result = await hotel.save()
        res.status(200).json({
            hotel: result
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.removeHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId

    try {
        // check for admin privileges
        /*const user = await User.findById(req.userId)
        if(user.status !== 'admin') {
            const error = new Error('You don\'t have admin privileges')
            error.statusCode = 404
            throw error
        }*/
        const hotel = await Hotel.findById(hotelId)
        if(!hotel) {
            const error = new Error('Delete operation not possible!')
            error.statusCode = 404
            throw error
        }
        await hotel.remove()
        await Item.find({ hotelId: hotelId }).remove()
        res.status(200).json({ message: 'Hotel removed from database'})
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

