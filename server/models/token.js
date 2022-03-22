const mongoose = require('mongoose')

const tokenData = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
        index: true
    }
}, {
    timestamps: false
})
tokenData.index({ createdAt: 1 }, { expires: '6d' })
module.exports = token = mongoose.model('token', tokenData)