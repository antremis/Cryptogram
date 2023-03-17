const router = require('express').Router()
const {getAllChats, createChat, getMessages, sendMessage} = require('../Controllers/ChatController')

router
    .route('/')
    .get(getAllChats)
    .put(createChat)
    
router
    .route('/:id')
    .get(getMessages)
    .post(sendMessage)

module.exports = router