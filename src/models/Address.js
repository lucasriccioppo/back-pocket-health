const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    cep: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    complement: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Address', Schema)
