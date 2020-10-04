var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    id: String,
    date: String,
    quantity: Number
})

module.exports = mongoose.model('Counter', userSchema)