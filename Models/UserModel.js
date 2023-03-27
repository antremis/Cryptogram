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
        default: 0,
    },
    NFTS: {
        type: Number,
        default: 0,
    },
    followers: {
        type: [String],
        ref: 'Users',
        default: [],
    },
    following: {
        type: [String],
        ref: 'Users',
        default: [],
    },
}, {timestamps: true})

module.exports = mongoose.model('Users', UserSchema)