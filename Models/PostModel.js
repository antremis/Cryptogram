const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        require: true,
    },
    profilePic: {
        type: String,
        require: true,
    },
    imgsrc: {
        type: String,
        require: true,
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
}, {timestamps: true})

module.exports = mongoose.model('Posts', PostSchema)