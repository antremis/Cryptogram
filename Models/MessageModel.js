const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats',
        required: true,
    },
    user: {
        type: String,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Messages', MessageSchema);

