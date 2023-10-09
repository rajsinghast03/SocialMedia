const express = require('express');
const authControllers = require('../controllers/authControllers');
const postConrollers = require('../controllers/postControllers');
const router = express.Router();

router.use(authControllers.protect);
router.route('/')
    .get(postConrollers.getFeedPosts)
    .post(authControllers.uploadUserPhoto, postConrollers.createPost);

router.get('/:userId', postConrollers.getUserPosts);

router.patch('/:id/like', postConrollers.likePost);

module.exports = router;