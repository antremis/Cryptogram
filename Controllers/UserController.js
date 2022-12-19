const User = require('../Models/UserModel')

const getOrCreateUser = async (req, res) => {
    const {id} = req.params
    let user = await User.findById(id)
    if(user) return res.json({mssg: 'Success', data: user})
    try{
        user = await User.create({
            _id: id,
            handle: 'asoibua',
            displayName: 'Admin',
            profilepic: 'https://i.postimg.cc/GpnxRzT5/profile-user.png',
            followers: [],
            following: [],
            posts: [],
            NFTS: [],
        })
        return res.json({mssg: 'Success', data: user})
    }
    catch(error){
        return res.status(400).json({mssg: error.message})
    }
}

module.exports = {
    getOrCreateUser
}