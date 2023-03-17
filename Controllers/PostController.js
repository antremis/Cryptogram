const User = require('../Models/UserModel')
const Post = require('../Models/PostModel')

const makePost = async (req, res) => {
    const imgsrc = 'https://i.postimg.cc/GtN913JX/stockimg.png'
    const {uid, caption} = req.body
    if(!uid) return res.status(400).json({mssg: 'UID Missing'})
    if(!caption) return res.status(400).json({mssg: 'Caption Missing'})

    try{
        const user = await User.findById(uid)
        if(!user) return res.status(404).json({mssg: 'User Not Found'})
        const newPost = await Post.create({
            imgsrc,
            user: uid,
            caption,
            likes: 0,
            comments: []
        })
        user.posts = user.posts + 1
        user.save()
        return res.json({mssg: 'Success', data: {id: newPost._id, imgsrc}})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

const getPostsByUser = async (req, res) => {
    try{
        const { uid } = req.body
        const { handle } = req.params
        const user = await User.findOne({handle})
        const posts = await Post.find({user: user._id}).populate({path: 'comments', populate: {path: 'user'}}).populate('user').sort({createdAt: -1})
        return res.json({mssg: 'Success', data: {posts, NFTS: []}})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

const getPostsForUser = async (req, res) => {
    try{
        const { uid } = req.body
        const { hashtag } = req.params
        const user = await User.findById(uid)
        let posts
        if(!hashtag){
            posts = await Post.find({ $or: [{user: uid}, {user: {$in: user.following}}] })
                .populate({path: 'comments', populate: {path: 'user'}})
                .populate('user')
                .sort({createdAt: -1})
        }
        else{
            posts = []
        }
        return res.json({mssg: 'Success', data: posts})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

const getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('comments').populate('user')
        return res.json({mssg: 'Success', data: post})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    makePost,
    getPostsByUser,
    getPostsForUser,
    getPost,
}