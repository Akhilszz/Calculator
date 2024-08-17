const mongoose = require('mongoose')

const calculations = new mongoose.Schema({
    Data: { type: String, required: true },
    Result: { type: String, required: true },
    Date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('calculations', calculations)
