const Comment = require('../Models/CommentModel')
const Post = require('../Models/PostModel')

const makeComment = async (req, res) => {
    const profilePic = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    const handle = req.body.handle
    const comment = req.body.comment
    try{
        const newComment = await Comment.create({
            profilePic,
            handle,
            comment,
            replies: [],
            likes: 0
        })
        const post = await Post.findById(req.params.id)
        post.comments.push(newComment._id)
        post.save()
        res.json({mssg: "Success"})
    }
    catch(error){
        console.log(error)
        res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    makeComment,
}