const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        required: true,
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        required: true,
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Posts',
        required: true,
    },
    NFTS: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Posts',
        required: true,
    }
})

module.exports = mongoose.model('Users', UserSchema)