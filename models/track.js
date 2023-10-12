const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    // Image URI
    image_uri: {
        type: String,
        required: true
    },
    // Title
    title: {
        type: String,
        required: true
    },
    // Artist Name 
    artist: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Track', trackSchema)