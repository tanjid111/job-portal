const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    user: {
        email: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    },

    candidate: [{
        type: ObjectId,
        ref: "User",
        unique: true
    }],

    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a brand name'],
        maxLength: 100,
        unique: true,
        lowercase: true
    },

    description: String,

    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    }
}, {
    timestamps: true
})

const Brand = mongoose.model("Job", jobSchema);
module.exports = Brand;
