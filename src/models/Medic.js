const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    description: {
        type: ObjectId,
        required: true
    },
    register: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    autonomous: {
        type: String,
        required: true
    },
    consultValue: {
        type: String,
        required: true
    },
    address: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Medic', Schema)
