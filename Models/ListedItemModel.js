const mongoose = require('mongoose')

const ListedItemSchema = mongoose.Schema({
    _id: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    owner: {
        required: true,
        type: String,
        ref: "Users"
    }
    
}, {timestamps: true})

module.exports = mongoose.model('ListedItems', ListedItemSchema)