const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const consultSchema = new mongoose.Schema({
    medic: {
        type: ObjectId,
        ref: 'Medic',
        required: true
    },
    institution: {
        type: ObjectId,
        ref: 'Institution',
        required: true 
    },
    Date: {
        type: Date,
        required: true
    },
    patient: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

module.exports = mongoose.model('Consult', consultSchema)
