const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const dotenv = require("dotenv").config();

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
        id: userInfo._id
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "7days"
    });

    return token;
};