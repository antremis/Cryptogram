const User = require('../Models/UserModel')
const Post = require('../Models/PostModel')

const makePost = async (req, res) => {
    const imgsrc = 'https://i.postimg.cc/GtN913JX/stockimg.png'
    const {uid, handle, displayName, caption, profilepic} = req.body
    if(!uid) return res.status(400).json({mssg: 'UID Missing'})
    if(!caption) return res.status(400).json({mssg: 'Caption Missing'})

    try{
        let user = await User.findById(uid)
        const newPost = await Post.create({
            imgsrc,
            profilepic: user.profilepic,
            handle: user.handle,
            displayName: user.displayName,
            caption,
            likes: 0,
            comments: []
        })
        user.posts = [newPost._id, ...user.posts]
        user.save()
        return res.json({mssg: 'Success', data: {id: newPost._id, imgsrc}})
    }
    catch(error){
        console.log(error)
        res.status(400).json({mssg: error.message})
    }
}

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find({}).populate('comments').sort({createdAt: -1})
        res.json({mssg: 'Success', data: posts})
    }
    catch(error){
        console.log(error)
        res.status(400).json({mssg: error.message})
    }
}

const getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('comments')
        res.json({mssg: 'Success', data: post})
    }
    catch(error){
        console.log(error)
        res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    makePost,
    getPosts,
    getPost,
}