const express = require('express')
const mongoose = require('mongoose')
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const cors = require('cors')
const fbadmin = require('./config/firebase-config')
const PostRoute = require('./Routes/PostRoute')
const CommentRoute = require('./Routes/CommentRoute')
const UserRoute = require('./Routes/UserRoute')
const ChatRoute = require('./Routes/ChatRoute')
const HashtagRoute = require('./Routes/HashtagRoute')
const LikeRoute = require('./Routes/LikeRoute')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    next()
    console.log(`${new Date().toLocaleTimeString()} ${req.path} ${req.method} ${res.statusCode}`)
})

app.use(async (req, res, next) => {
    try{
        let USER_TOKEN = req.headers.authorisation.split(" ")[1]
        const USER = await fbadmin.auth().verifyIdToken(USER_TOKEN)
        if(!USER) return res.status(400).json({mssg: "Unauthorised"})
        req.user = USER.uid
        next()
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({mssg: "Invalid Auth Bearer Provided"})
    }
})

app.use('/api/post', PostRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/user', UserRoute)
app.use('/api/chat', ChatRoute)
app.use('/api/hashtag', HashtagRoute)
app.use('/api/like', LikeRoute)

const run = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL);
        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY,
        });
        app.listen(process.env.PORT, () => {
            console.log('connected to MongoDB, Moralis & listening on port', process.env.PORT)
        })
    } 
    catch(error) {
        console.log(error)
    }
}

run()