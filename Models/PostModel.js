const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    // displayName: {
    //     type: String,
    //     required: true,
    // },
    // handle: {
    //     type: String,
    //     required: true,
    // },
    // profilePic: {
    //     type: String,
    //     required: true,
    // },
    user: {
        type: String,
        ref: 'Users',
        required: true,
    },
    imgsrc: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comments',
        required: true,
    },
    NFT: {
        type: Boolean,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Posts', PostSchema)