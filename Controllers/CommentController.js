const Comment = require('../Models/CommentModel')
const Post = require('../Models/PostModel')
const User = require('../Models/UserModel')

const makeComment = async (req, res) => {
    const uid = req.user
    const {comment} = req.body
    if(!comment) return res.status(400).json({mssg: 'Comment missing'})
    try{
        const user = await User.findById(uid)
        const newComment = await Comment.create({
            user: user._id,
            comment,
            replies: [],
            likes: 0
        })
        const post = await Post.findById(req.params.id)
        post.comments.push(newComment._id)
        await post.save()
        return res.json({mssg: "Success", data: {id: newComment._id}})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    makeComment,
}