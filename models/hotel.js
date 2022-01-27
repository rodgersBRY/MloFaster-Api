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
    // imageUrl: {
    //     type: String,
    //     required: true
    // },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Hotel', hotelSchema)