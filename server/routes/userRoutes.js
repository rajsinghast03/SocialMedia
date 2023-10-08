const express = require('express');
const authControllers = require('../controllers/authControllers');
const userConrollers = require('../controllers/userControllers');
const router = express.Router();

/* Authentication
*/
router.post('/login', authControllers.login);
router.post('/signup', authControllers.uploadUserPhoto, authControllers.signup);



/* User Realted Routes */

router.route('/:id')
    .get(authControllers.protect, userConrollers.getUser)

router.get("/:id/friends", userConrollers.getUserFriends);

router.patch("/:id/:friendId", userConrollers.addRemoveFriend);

module.exports = router;