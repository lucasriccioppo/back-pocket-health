const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Agreement', Schema)
