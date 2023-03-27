const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'Users',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comments',
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
    }
}, {timestamp: true})

module.exports = mongoose.model('Comments', CommentSchema)