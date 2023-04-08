const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
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
        type: [String],
        default: [],
        ref: 'Users'
    },
    caption: {
        type: String,
        default: '',
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comments',
        default: [],
    },
    NFT: {
        type: Boolean,
        default: false,
    },
    hashtags: {
        type: [String],
        default: [],
    }
}, {timestamps: true})

module.exports = mongoose.model('Posts', PostSchema)