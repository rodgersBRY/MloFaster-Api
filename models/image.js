const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    img: {
        data: Buffer,
        ContentType: String
    }
})

module.exports = mongoose.model('Image', imageSchema)