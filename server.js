const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PostRoute = require('./Routes/PostRoute')
const CommentRoute = require('./Routes/CommentRoute')
const UserRoute = require('./Routes/UserRoute')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()}  ${req.path}  ${req.method}`)
    next()
})

app.use('/api/post', PostRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/user', UserRoute)

const run = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb & listening on port', process.env.PORT)
        })
    } 
    catch(error) {
        console.log(error)
    }
}

run()