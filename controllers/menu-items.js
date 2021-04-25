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

exports.addItemToCart = async (req, res, next) => {
    const itemId = req.params.itemId

    try {
        const user = await User.findById(req.userId)
        let item = await Item.findById(itemId) 

        const cartItemIndex = user.cart.items.findIndex(cp => {
            return cp.itemId.toString() === item._id.toString()
        })

        let newQuantity = 1
        const updatedCartItems = [...user.cart.items]

        if(cartItemIndex >= 0) {
            newQuantity = user.cart.items[cartItemIndex].quantity + 1
            updatedCartItems[cartItemIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({ itemId: item._id, quantity: newQuantity })
        }
        const updatedCart = {
            items: updatedCartItems
        }
        user.cart = updatedCart
        const result = await user.save()
        res.status(200).json(result)
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getCart = async (req, res, next) => {
    try {
        
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.clearCart = async (req, res, next) => {
    user.cart = {items: []}
    await user.save()
    res.status(200).json({
        message: 'Cart cleared'
    })
}