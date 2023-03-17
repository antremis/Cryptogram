const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    users: {
        type: [String],
        ref: 'Users',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    displayPic: {
        type: String,
        required: true,
    },
    latest: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Chats', ChatSchema)