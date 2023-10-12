const mongoose = require('mongoose')

const isrcSchema = new mongoose.Schema({
    // ISRC
    isrc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Isrc', isrcSchema)