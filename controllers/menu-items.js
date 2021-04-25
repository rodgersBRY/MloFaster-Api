const Hotel = require('../models/hotel')
const Item = require('../models/menu-item')
const User = require('../models/user')

exports.getMenuItems = async (req, res, next) => {
    const hotelId = req.params.hotelId

    try {
        const menuItems = await Item.find({ hotelId: hotelId })
        res.status(201).json({
            menuItems: menuItems
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.addMenuItem = async (req, res, next) => {
    const hotelId = req.params.hotelId

    const name = req.body.name
    const desc = req.body.description
    const price = req.body.price

    const menuItem = new Item({
        name: name,
        description: desc,
        price: price,
        hotelId: hotelId
    })

    try {
        const user = await User.findById(req.userId)
        if(user.status !== 'admin') {
            const error = new Error('You don\'t have admin privileges')
            error.statusCode = 404
            throw error
        }
        const hotel = await Hotel.findById(hotelId)
        if(!hotel) {
            const error = new Error('Hotel doesn\'t exist')
            error.statusCode = 401
            throw error
        }
        const result = await menuItem.save()
        res.status(200).json({
            menuItem: result
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateMenuItem = async (req, res, next) => {
    const itemId = req.params.itemId

    const name = req.body.name
    const price = req.body.price
    const desc = req.body.description

    try {
        // check for admin privileges
        const user = await User.findById(req.userId)
        if(user.status !== 'admin') {
            const error = new Error('You don\'t have admin privileges')
            error.statusCode = 404
            throw error
        }

        const item = await Item.findById(itemId)
        item.name = name
        item.price = price
        item.description = desc

        const result = await item.save()
        res.status(200).json({
            message: 'Item has been updated',
            item: result
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
 
exports.deleteMenuItem = async (req, res, next) => {
    const itemId = req.params.itemId

    try {
        // check for admin privileges
        const user = await User.findById(req.userId)
        if(user.status !== 'admin') {
            const error = new Error('You don\'t have admin privileges')
            error.statusCode = 404
            throw error
        }
        await Item.findByIdAndRemove(itemId)
        res.status(200).json({ message: 'Item deleted from your menu'})
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}