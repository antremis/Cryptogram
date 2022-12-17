const Post = require('../Models/PostModel')

const makePost = async (req, res) => {
    const imgsrc = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    const profilePic = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    const handle = req.body.handle
    const displayName = req.body.displayName
    const caption = req.body.caption
    if(!handle) res.status(400).json({mssg: 'Handle Missing'})
    if(!displayName) res.status(400).json({mssg: 'Display Name Missing'})
    if(!caption) res.status(400).json({mssg: 'Caption Missing'})

    try{
        const newPost = await Post.create({
            imgsrc,
            profilePic,
            handle,
            displayName,
            caption,
            likes: 0,
            comments: []
        })
    }
    catch(error){
        console.log(error)
        res.status(400).json({mssg: error.message})
    }

    res.json({mssg: 'Success'})
}

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find({}).populate('comments')
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