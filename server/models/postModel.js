const mongoose = require('mongoose')
const validator = require('validator');

const postSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Provide your first name']
    },
    userId: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: [true, 'Please Provide your first name']
    },

    picturePath: { type: String },
    userPicturePath: { type: String },
    location: { type: String },

    description: { type: String },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }


}, { timestamps: true });



const Post = mongoose.model('Post', postSchema);

module.exports = Post;