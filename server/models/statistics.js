const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    date: Date,
    info: { type: Array, "default": []},
    rejected: { type: Array, "default": []}
})

module.exports = statistics = mongoose.model('statistics', statSchema)