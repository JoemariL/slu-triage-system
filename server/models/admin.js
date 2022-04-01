const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    }, 
    isDeactivated: {
        type: Boolean
    }
})

module.exports = admin = mongoose.model('admin', adminSchema)