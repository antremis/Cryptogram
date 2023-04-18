const express = require('express')
const mongoose = require('mongoose')
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const fbadmin = require('./config/firebase-config')
const PostRoute = require('./Routes/PostRoute')
const CommentRoute = require('./Routes/CommentRoute')
const UserRoute = require('./Routes/UserRoute')
const ChatRoute = require('./Routes/ChatRoute')
const HashtagRoute = require('./Routes/HashtagRoute')
const LikeRoute = require('./Routes/LikeRoute')
const MarketRoute = require('./Routes/MarketRoute')
require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
app.use(require('cors')())
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
app.use('/api/market', MarketRoute)

const run = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL);
        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY,
        });
        server.listen(process.env.PORT, () => {
            console.log('connected to MongoDB, Moralis & listening on port', process.env.PORT)
        })
    } 
    catch(error) {
        console.log(error)
    }
}
// io.engine.generateId = (req, res) => {
//     return req.user
// }

io.on('connect', (socket) => {
    socket.on('join', (chatUser) => {
        socket.join(chatUser)
    })
    socket.on('leave', (chatUser) => {
        socket.leave(chatUser)
    })
    socket.on('message', (chatid, message_obj) => {
        socket.to(chatid).emit('message', message_obj)
    })
})
run()