const Post = require('../models/postModel')


exports.createPost = async (req, res, next) => {
    try {
        console.log(req.user);
        let { description, picturePath } = req.body;
        picturePath = req.file.path;
        const newPost = new Post({
            userId: req.user[0]._id,
            firstName: req.user[0].firstName,
            lastName: req.user[0].lastName,
            location: req.user[0].location,
            description,
            userPicturePath: req.user[0].picturePath,
            likes: {

            },
            comments: []

        });
        await newPost.save();
        const posts = await Post.find({});
        res.status(201).json({
            results: posts.length,
            posts
        });


    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

exports.getFeedPosts = async (req, res, next) => {
    try {

        const posts = await Post.find({});
        res.status(200).json({
            results: posts.length,
            posts
        });
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

exports.getUserPosts = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const posts = await Post.find({ userId });
        res.status(200).json({
            results: posts.length,
            posts
        });
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}



exports.likePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userId = req.user[0]._id;
        const post = await Post.findById(id);
    
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId)
        }
        else {
            post.likes.set(userId, true);
        }
        const updatePost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
        res.status(200).json({

            post: updatePost
        });


    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}