const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
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
    },

    picturePath: { type: String },

    location: { type: String },

    occupation: { type: String },

    viewedProfile: { type: Number },

    impression: { type: Number },

    friends: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});
/* Schmea Middlewares*/

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})




const User = mongoose.model('User', userSchema);

module.exports = User;