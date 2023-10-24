const User = require('../models/userModel');
var mongoose = require('mongoose');
exports.getUser = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            user
        })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

exports.getUserFriends = async (req, res, next) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id).populate({
            path: 'friends',
            select: '_id firstName lastName occupation location picturePath'
        });

        res.status(200).json({

            freinds: user.friends
        })
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

exports.addRemoveFriend = async (req, res, next) => {
    try {
        const { id, friendId } = req.params


        const user = await User.findById(id)
        const friend = await User.findById(friendId)
        console.log(user.friends.includes(friendId))
        if (user.friends.includes(friendId)) {
            const index = user.friends.indexOf(friendId);

            user.friends.splice(index, 1);

            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            const friendID = new mongoose.Types.ObjectId(friendId);
            const ID = new mongoose.Types.ObjectId(id)
            user.friends = user.friends.push(friendID);
            friend.friends = friend.friends.push(ID);
        }

        await user.save({ validateBeforeSave: false });
        await friend.save({ validateBeforeSave: false });
        res.status(200).json({

            friends: user.friends
        })

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}