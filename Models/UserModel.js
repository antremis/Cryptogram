const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
    },
    posts: {
        type: Number,
        required: true,
    },
    NFTS: {
        type: Number,
        required: true,
    },
    followers: {
        type: [String],
        ref: 'Users',
        required: true,
    },
    following: {
        type: [String],
        ref: 'Users',
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Users', UserSchema)