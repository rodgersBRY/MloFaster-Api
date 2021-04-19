const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phoneNo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Object,
    }
})

module.exports = mongoose.model('Hotel', hotelSchema)