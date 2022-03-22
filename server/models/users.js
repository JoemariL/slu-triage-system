const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const hdfData = mongoose.Schema({
    entry_date: {
        type: Date
    },
    entry_campus: {
        type: String
    },
    gate_info: {
        type: String
    },
    allowed: {
        type: Boolean
    },
    is_expired: {
        type: Boolean
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
        type: String
    },
    pregnant: {
        type: String
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
    id_number: {
        type: String
    },
    username: {
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