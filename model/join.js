const mongoose = require('mongoose')
const Schema = mongoose.Schema

let joinSchema = new Schema({
    joinUser: String,
    quantity: Number
})

module.exports = mongoose.model('join', joinSchema)