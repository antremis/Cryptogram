const Comment = require('../Models/CommentModel')
const Post = require('../Models/PostModel')
const User = require('../Models/UserModel')

const makeComment = async (req, res) => {
    const {id, comment} = req.body
    if(!id) return res.status(400).json({mssg: 'id missing'})
    if(!comment) return res.status(400).json({mssg: 'Comment missing'})
    try{
        const user = await User.findById(id)
        const newComment = await Comment.create({
            profilepic: user.profilepic,
            handle: user.handle,
            comment,
            replies: [],
            likes: 0
        })
        const post = await Post.findById(req.params.id)
        post.comments.push(newComment._id)
        post.save()
        res.json({mssg: "Success", data: {id: newComment._id}})
    }
    catch(error){
        console.log(error)
        res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    makeComment,
}