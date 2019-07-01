const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Card', Schema)
