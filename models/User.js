const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please enter value for name field'],
    },
    password: {
        type: String, 
        required: [true, 'Please enter a value for password field'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String, 
        required: [true, 'Please enter value for email field']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User