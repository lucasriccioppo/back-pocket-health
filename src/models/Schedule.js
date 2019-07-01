const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    medic: {
        type: ObjectId,
        required: true
    },
    patient: {
        type: ObjectId,
        required: true
    },
    avaible: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Schedule', Schema)
