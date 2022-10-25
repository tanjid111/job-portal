const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const candidateSchema = mongoose.Schema(
    {
        users: [{
            type: ObjectId,
            ref: "User",
            unique: true,
        }],
        jobs: [{
            type: ObjectId,
            ref: "Job"
        }],
        skills: String,
        experience: String
    },
    {
        timestamps: true,
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
