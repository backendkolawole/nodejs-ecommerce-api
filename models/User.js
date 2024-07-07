const mongoose = require('mongoose')
const validator = require('validator');

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
        required: [true, 'Please enter value for email field'],
        validate: {
            validator: validator.isEmail
        },
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User