const Post = require('../Models/PostModel')
const Hashtag = require('../Models/HashtagModel')

const getHashtags = async (req, res) => {
    try{
        const hashtags = await Hashtag.find({}).sort({updatedAt: -1, posts: -1})
        return res.status(200).json({mssg: 'success', data: hashtags})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({ mssg: error.message })
    }
}

const getPostsForHashtag = async (req, res) => {
    try{
        const uid = req.user
        const { hashtag } = req.params
        const posts = await Post.find({ hashtags: `#${hashtag}` })
        .populate({path: 'comments', populate: {path: 'user'}})
        .populate('user')
        .sort({updatedAt: -1, likes: -1})
        return res.json({mssg: 'Success', data: posts})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    getHashtags,
    getPostsForHashtag
}