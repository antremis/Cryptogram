const User = require('../Models/UserModel')
const { v4 } = require('uuid')
const admin = require('../config/firebase-config')

const getOrCreateUser = async (req, res) => {
    const uid = req.user
    let user = await User.findById(uid).lean()
    if(user) {
        user.followers = user.followers.length
        user.following = user.following.length
        return res.json({mssg: 'Success', data: user})
    }
    try{
        const USER_TOKEN = req.headers.authorisation.split(" ")[1]
        const USER = await admin.auth().verifyIdToken(USER_TOKEN)
        user = await User.create({
            _id: uid,
            handle: v4(),
            displayName: USER.name || `Annonymous ${user.handle}`,
            profilepic: USER.picture || 'https://www.google.com/imgres?imgurl=https%3A%2F%2Ficon2.cleanpng.com%2F20180401%2Fgoe%2Fkisspng-user-profile-computer-icons-profile-5ac09244d91906.2547020615225697968892.jpg&tbnid=X86heah6oXP2vM&vet=12ahUKEwiBptyJhJX-AhWfGbcAHQ-bAqYQMygqegUIARC-Ag..i&imgrefurl=https%3A%2F%2Fwww.cleanpng.com%2Ffree%2Fuser-profile.html&docid=_VqasVaKWpBq8M&w=260&h=260&q=profile%20pic%20icon%20png&ved=2ahUKEwiBptyJhJX-AhWfGbcAHQ-bAqYQMygqegUIARC-Ag',
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

const getUsers = async (req, res) => {
    try{
        const uid = req.user
        const {query} = req.body
        console.log(query)
        const user = await User.find({handle: { $regex: query, $options: 'i' }})
        if(!user) return res.status(200).json({mssg: 'User not found', data: {NFTS: 0, displayName: 'No User Found', handle: 'NotFound', posts: 0, profilePic: 'https://i.postimg.cc/GpnxRzT5/profile-user.png', id: 'null', followers: [], following: []}})
        res.status(200).json({mssg: 'success', data: user})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({mssg: 'failed', error: e.message})
    }
}

const getUser = async (req, res) => {
    try{
        const uid = req.user
        const {handle} = req.params
        let user = await User.findOne({handle}).lean()
        if(!user) return res.status(200).json({mssg: 'User not found', data: {NFTS: 0, displayName: 'No User Found', handle: 'NotFound', posts: 0, profilePic: 'https://i.postimg.cc/GpnxRzT5/profile-user.png', id: 'null', followers: 0, following: 0}})
        user.followed = false
        if(user.followers.includes(uid)) user.followed = true
        user.followers = user.followers.length
        user.following = user.following.length
        res.status(200).json({mssg: 'success', data: user})
    }
    catch(e){
        console.log(e.message)
        res.status(400).json({mssg: 'failed', error: e.message})
    }
}

const followUser = async (req, res) => {
    try{
        const uid = req.user
        const {handle} = req.body
        const user1 = await User.findById(uid)
        const user2 = await User.findOne({handle})
        if(user1.following.includes(user2._id)) return res.status(200).json({mssg: 'user is already followed'})
        user1.following.push(user2._id)
        await user1.save()
        user2.followers.push(uid)
        await user2.save()
        return res.status(200).json({mssg: 'success'})
    }
    catch(e){
        console.log(e.message)
        return res.status(400).json({mssg: 'Internal Error', error: e.message})
    }
}

const unfollowUser = async (req, res) => {
    try{
        const uid = req.user
        const {handle} = req.params
        let user1 = await User.findById(uid)
        let user2 = await User.findOne({handle})
        if(!user1.following.includes(user2._id)) return res.status(200).json({mssg: 'user is not followed'})
        user1.following = user1.following.filter(user => user !== user2._id)
        await user1.save()
        user2.followers = user2.followers.filter(user => user !== uid)
        await user2.save()
        return res.status(200).json({mssg: 'success'})
    }
    catch(e){
        console.log(e.message)
        return res.status(400).json({mssg: 'Internal Error', error: e.message})
    }
}

const updateUser = async (req, res) => {
    const uid = req.user
    const {profile} = req.body
    const {handle} = req.params
    try{
        const user = await User.findById(uid)
        if(user.handle !== handle) return res.status(403).json({mssg: 'Unauthorised'})
        // user.update(profile)
        user.displayName=profile.displayName
        user.handle=profile.handle
        await user.save()
        return res.status(200).json({mssg: 'success'})
    }
    catch(e){
        console.log(e.message)
        return res.status(400).json({mssg: 'Internal Error', error: e.message})
    }
}

module.exports = {
    getOrCreateUser,
    followUser,
    unfollowUser,
    getUser,
    getUsers,
    updateUser
}