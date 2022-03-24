const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const hdfData = mongoose.Schema({
    entry_date: {
        type: Date,
        default: null
    },
    entry_campus: {
        type: String,
        default: null
    },
    gate_info: {
        type: String,
        default: null
    },
    allowed: {
        type: Boolean
    },
    is_expired: {
        type: Boolean,
        default: false
    },
    dept_destination: {
        type: String
    },
    covid_exposure: {
        type: Boolean
    },
    covid_positive: {
        type: Boolean
    },
    fever: {
        type: Boolean
    },
    cough: {
        type: Boolean
    },
    cold: {
        type: Boolean
    },
    sore_throat: {
        type: Boolean
    },
    diff_breathing: {
        type: Boolean
    },
    diarrhea: {
        type: Boolean
    },
    others: {
        type: String,
        default: null
    },
    pregnant: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: false })

const vaccinationSchema = mongoose.Schema({
    vaccine_status: {
        type: String
    },
    vaccine_name: {
        type: String
    },
    vaccine_serial_no: {
        type: String
    },
}, { timestamps: false })

const userSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    contact_number: {
        type: String
    },
    home_address: {
        type: String
    },
    email_address: {
        type: String,
        unique: true
    },
    user_type: {
        type: String
    },
    vaccination_details: [vaccinationSchema],
    hdf_data: [hdfData]
}, { timestamps: true })

module.exports = user = mongoose.model('user', userSchema)