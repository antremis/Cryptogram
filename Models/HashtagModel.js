const mongoose = require('mongoose')

const HashtagSchema = mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
    },
    posts: {
        type: Number,
        default: 0,
    },
    imgsrc: {
        type: String,
        required: true,
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Hashtags', HashtagSchema)