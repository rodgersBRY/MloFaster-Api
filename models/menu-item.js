const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
})

module.exports = mongoose.model('MenuItem', itemSchema)