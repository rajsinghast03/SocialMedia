const mongoose = require('mongoose')
const validator = require('validator');
const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Provide your first name']
    },

    lastName: {
        type: String,
        require: [true, 'Please Provide your first name']
    }
    ,
    email: {
        type: String,
        required: [true, 'Please tell us your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid mail'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
        minlength: 8,
        select: false
    }


})