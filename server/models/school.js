const mongoose = require('mongoose')

const gateSchema = mongoose.Schema({
    gate: {
        type: String,
        uppercase: true
    },
    raw_code: String,
    generated_code: String
})

const schoolSchema = mongoose.Schema({
    school: {
        type: String,
        unique: true,
        uppercase: true
    },
    gate_info: [gateSchema]
})

module.exports = school = mongoose.model('school', schoolSchema)