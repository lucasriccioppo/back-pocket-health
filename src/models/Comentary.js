const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: Date,
        required: true
    },
    author: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Comentary', Schema)
