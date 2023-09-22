import asyncHanlder from 'express-async-handler'
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

// Auth User/Set Token POST /api/users/auth
const authUser = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401)
        throw new Error("Invalid email or password");
    }
    // res.status(200).json({ msg: 'Authentication successful' });
});

// Register a new User - POST /api/users/
const registerUser = asyncHanlder(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error("User already exists");
    }

    const user = await User.create({ email, name, password });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400)
        throw new Error("Invalid User data");
    }
});

// Logout User - POST /api/users/logout
const logoutUser = asyncHanlder(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ msg: 'User Logged out' });
});

// Get user profile - GET /api/users/profile
const getUserProfile = asyncHanlder(async (req, res) => {
    const user = {
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
});

// Update User profile - PUT /api/users/profile
const updateUserProfile = asyncHanlder(async (req, res) => {
    const user = await User.findOne(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(401)
        throw new Error("User not found");
    }

});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}