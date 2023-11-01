
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/userModel');
const bcrypt = require("bcrypt")
const { promisify } = require('util');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/assests');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assests')
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname);
    }

});


const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Something Went wrong'), false)
    }
}
const upload = multer({
    storage: multerStorage
});


exports.uploadUserPhoto = upload.single('picture');


exports.signup = async (req, res, next) => {

    try {

        const newUser = new User(req.body);

        newUser.picturePath = `${req.file.originalname}`;
        await newUser.save();
        res.status(200).json({
            data: newUser,
            message: 'User Signed Up'
        })

    } catch (err) {
        res.status(201).json({
            message: err.message,
            error: err
        })
    }

}

exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password)
            throw new Error("Please provide email and password");
        const user = await User.findOne({ email }).select('+password');


        const isCorrect = await bcrypt.compare(password, user.password)
        if (!user || !isCorrect)
            throw new Error("Incorrect credentials");
        const id = user._id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,

        })
        const sent_user = await User.findOne({ email }).select("-_v");
        res.status(400).json({
            message: 'Loggedin',
            token,
            user: sent_user
        })

    }
    catch (err) {
        res.status(401).json({
            message: err.message,
            error: err
        })
    }
}


exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else if (req.cookie.jwt)
            token = req.cookies.jwt;
        if (!token)
            throw new Error('Not authorized to access this route', 401);

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const newUser = await User.find({ _id: decoded.id });
        if (!newUser)
            throw new Error('The user belonging to token doesnt exists', 401)

        req.user = newUser;
        next();

    }
    catch (err) {
        res.status(201).json({
            message: err.message,
            error: err
        })
    }

}