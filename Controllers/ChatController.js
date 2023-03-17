const User = require('../Models/UserModel')
const Chat = require('../Models/ChatModel')
const Message = require('../Models/MessageModel')

const getAllChats = async (req, res) => {
    try{
        const {uid} = req.body
        const user = await User.findById(uid)
        const chats = await Chat.find({users: {$in: [uid]}}).populate({path: 'users', select: {_id: 0, displayName: 1, profilepic: 1}})
        // const recomended = await User.find({ _id:  {$in: user.following} })
        return res.status(200).json({mssg: "success", chats, recomended: []})
    }
    catch(e){
        return res.status(400).json({mssg: e})
    }
}

const createChat = async (req, res) => {
    try{mongo
        let {users, name, displayPic} = req.body
        users = await Promise.all(users.map(async (u) => {
            const temp = await User.findOne({handle: u})
            return temp._id
        }))
        users.push(req.body.uid)
        const user = await User.findById(req.body.uid)
        const chat = await Chat.create({
            users,
            name,
            displayPic,
            messages: [],
            latest: `${user.displayName} Added you`
        })
        return res.status(200).json({mssg: 'success', data: {id: chat._id, latest: chat.latest}})
    }
    catch(e){
        console.log(e)
        return res.status(400).json({mssg: e})
    }
}

const sendMessage = async (req, res) => {
    try{
        const {uid, message} = req.body
        const chatId = req.params.id
        const chat = await Chat.findById(chatId);
        if(!chat.users.includes(uid)) return res.status(403).json({mssg: 'Unauthorised'})
        const msg = await Message.create({
            chatId,
            user: uid,
            message
        })
        return res.status(200).json({mssg: 'success', id: msg._id})
    }
    catch(e){
        return res.status(400).json({mssg: e})
    }
}

const getMessages = async (req, res) => {
    try{
        const {uid} = req.body
        const chatId = req.params.id
        const chat = await Chat.findById(chatId)
        if(!chat.users.includes(uid)) return res.status(403).json({mssg: 'Unauthorised'})
        const messages = await Message.find({chatId}).select({chatId: 0, __v: 0}).populate({path: 'user', select:{_id: 0, displayName: 1, profilepic: 1}}).sort({createdAt: -1})
        return res.status(200).json({mssg: 'success', data: messages})
    }
    catch(e){
        return res.status(400).json({mssg: e})
    }
}

module.exports = {
    getAllChats,
    createChat,
    sendMessage,
    getMessages,
}