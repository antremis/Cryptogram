const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comments',
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    }
}, {timestamp: true})

module.exports = mongoose.model('Comments', CommentSchema)