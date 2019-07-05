const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    crm: {
        type: Number,
        required: true
    },
    work: {
        type: ObjectId,
        ref: 'Intitution',
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
