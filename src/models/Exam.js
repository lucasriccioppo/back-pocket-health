const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    comentary: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Exam', Schema)
