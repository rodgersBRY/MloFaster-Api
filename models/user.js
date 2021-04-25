const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                itemId: {type: Schema.Types.ObjectId, ref: 'MenuItem', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }
})

userSchema.methods.removeFromCart = itemId => {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.itemId.toString() !== itemId.toString()
    })
    this.cart.items = updatedCartItems
    return this.save()
}

userSchema.methods.clearCart = () => {
    this.cart = {items: []}
    return this.save()
}

module.exports = mongoose.model('User', userSchema)