const User = require('../Models/UserModel')
const Post = require('../Models/PostModel')
const Hashtag = require('../Models/HashtagModel')
const admin = require('../config/firebase-config')
const {v4} = require('uuid')

const uploadImage = async (file) => {
    try {
        const bucket = admin.storage().bucket();
        const imageBuffer = Buffer.from(file.buffer, "base64");
        const imageByteArray = new Uint8Array(imageBuffer);
        const options = {
            resumable: false,
            metadata: { contentType: file.mimetype },
            predefinedAcl: "publicRead",
            public: true,
        };
        const file_path = `img/${file.originalname}-${v4()}`
        const files = bucket.file(file_path);
        await files.save(imageByteArray, options);
        const field = await files.getMetadata();
        return field[0].mediaLink
    }
    catch (e) {
        throw new Error(e);
    }
}

const handleHashtags = async (caption, imgsrc) => {
    const regex = /#\w+/g;
    const hashtags = caption.match(regex);
    if(!hashtags) return []
    await Promise.all(hashtags.map(async (hashtag) => {
        const temp = await Hashtag.findOne({hashtag})
        if(!temp) Hashtag.create({
            hashtag,
            posts: 1,
            imgsrc
        })
        else{
            temp.posts = temp.posts + 1
            temp.imgsrc = imgsrc
            temp.save()
        }
    }))

    return hashtags
}

const makePost = async (req, res) => {
    const uid = req.user
    const {caption} = req.body
    const file = req.file
    if(!uid) return res.status(400).json({mssg: 'UID Missing'})
    if(!caption) return res.status(400).json({mssg: 'Caption Missing'})

    try{
        const user = await User.findById(uid)
        if(!user) return res.status(404).json({mssg: 'User Not Found'})
        const imgsrc = await uploadImage(file)
        const hashtags = await handleHashtags(caption, imgsrc)
        const newPost = await Post.create({
            imgsrc,
            user: uid,
            caption,
            likes: 0,
            comments: [],
            NFT: false,
            hashtags,
        })
        user.posts = user.posts + 1
        await user.save()
        return res.json({mssg: 'Success', data: {id: newPost._id, imgsrc}})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({mssg: error.message})
    }
}

const likePost = async (req, res) => {
    const uid = req.user
    const { pid } = req.params
    try{
        const user = await User.findById(uid)
        const post = await Post.findById(pid)
        if(!post) return res.status(404).json({mssg: 'Could not find post'})
        if(!post.likes.includes(user.handle)) {
            post.likes.push(user.handle)
            post.save()
        }
        res.status(200).json({mssg: 'success'})
    }
    catch(e){
        return res.status(400).json({mssg: error.message})
    }
}

const unlikePost = async (req, res) => {
    const uid = req.user
    const { pid } = req.params
    try{
        const user = await User.findById(uid)
        const post = await Post.findById(pid)
        if(!post) return res.status(404).json({mssg: 'Could not find post'})
        if(post.likes.includes(user.handle)) {
            post.likes = post.likes.filter(handle => handle !== user.handle)
            post.save()
        }
        res.status(200).json({mssg: 'success'})
    }
    catch(e){
        console.log(e)
        return res.status(400).json({mssg: error.message})
    }
}

const getPostsByUser = async (req, res) => {
    try{
        const uid = req.user
        const { handle } = req.params
        const user = await User.findOne({handle})
        if(!user) return res.json({mssg: 'Success', data: {posts: [], NFTS: []}})
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
        const uid = req.user
        const user = await User.findById(uid)
        let posts = await Post.find({ $or: [{user: uid}, {user: {$in: user.following}}] })
            .populate({path: 'comments', populate: {path: 'user'}})
            .populate('user')
            .sort({updatedAt: -1})
            .lean()
        posts.map(post => {
            if(post.likes.includes(user.handle)) post.liked = true
            else post.liked = false
            post.likes = post.likes.length
        })
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
    likePost,
    unlikePost,
}