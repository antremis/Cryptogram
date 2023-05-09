const axios = require('axios')
const mongoose = require('mongoose')
require('dotenv').config()
const ListedItems = require('./Models/ListedItemModel.js')
const user = {
    address: '0xCd3490C0c37aF8A834FC6244C5057ea25E0E4a07',
}
const run = async () => {
    try{
        // await mongoose.connect(process.env.MONGO_URL);
        await mongoose.connect("mongodb+srv://admin:3PWjPmpJ9eOYks5L@cryptogram.vbpcyzz.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to mongoose")
        const result = await ListedItems.create({
            _id: "CGM2",
            price: 0.3,
            owner: "yZZYD3DEOsRZgGKSGXanuGKnvXa2"
        })
        console.log(result)
    }
    catch(err){
        console.log(err.message)
    }
}
run()