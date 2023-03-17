const User = require('../Models/UserModel')

const getOrCreateUser = async (req, res) => {
    const {uid} = req.body
    let user = await User.findById(uid)
                        .populate({path: 'followers', select: {_id: 0, handle: 1, displayName: 1, profilepic: 1}})
                        .populate({path: 'following', select: {_id: 0, handle: 1, displayName: 1, profilepic: 1}})
    if(user) {
        let {_id, __v, createdAt, updatedAt, ...info} = user._doc
        // info.followers = info.followers.length
        // info.following = info.following.length
        return res.json({mssg: 'Success', data: info})
    }
    try{
        user = await User.create({
            _id: uid,
            handle: 'adminop',
            displayName: 'Admin',
            profilepic: 'https://i.postimg.cc/GpnxRzT5/profile-user.png',
            followers: [],
            following: [],
            posts: 0,
            NFTS: 0,
        })
        let {_id, __v, createdAt, updatedAt, ...info} = user._doc
        return res.json({mssg: 'Success', data: info})
    }
    catch(error){
        return res.status(400).json({mssg: error.message})
    }
}

const getUser = async (req, res) => {
    try{
        const {uid} = req.body
        const {handle} = req.params
        const user = await User.findOne({handle})
        if(!user) return res.status(200).json({mssg: 'User not found', data: {NFTS: 0, displayName: 'No User Found', handle: 'NotFound', posts: 0, profilePic: 'https://i.postimg.cc/GpnxRzT5/profile-user.png', id: 'null', followers: [], following: []}})
        res.status(200).json({mssg: 'success', data: user})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({mssg: 'failed', error: e.message})
    }
}

const followUser = async (req, res) => {
    try{
        const {uid, handle} = req.body
        const user1 = await User.findById(uid)
        const user2 = await User.findOne({handle})
        console.log(user1)
        console.log(user2)
        if(user1.following.includes(user2._id)) return res.status(200).json({mssg: 'user is already followed'})
        user1.following.push(user2._id)
        user1.save()
        user2.followers.push(uid)
        user2.save()
        return res.status(200).json({mssg: 'success'})
    }
    catch(e){
        console.log(e.message)
        return res.status(200).json({mssg: 'failed', error: 'Internal Error'})
    }
}

module.exports = {
    getOrCreateUser,
    followUser,
    getUser
}