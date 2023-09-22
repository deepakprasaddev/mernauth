import jwt from "jsonwebtoken";
import asyncHanlder from 'express-async-handler'
import User from "../models/userModels.js";

const protect = asyncHanlder(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized Invalid JWT token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized token not found');
    }
});

export { protect }