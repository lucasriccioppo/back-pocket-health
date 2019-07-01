const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: ObjectId,
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

module.exports = mongoose.model('Lab', Schema)
