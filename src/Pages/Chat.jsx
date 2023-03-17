import {useState, useEffect} from 'react'
import { notify } from '../Components/Alert'
import {useChatContext} from '../Context/ChatContext'
import {useUserContext} from '../Context/UserContext'
import './Chat.css'

const Chat = () => {
    const {recomended, chats, createChat, getMessages, sendMessage} = useChatContext()
    const {profile} = useUserContext()
    const [chatUser, setChatUser] = useState(null)
    const [messages, setMessages] = useState([])

    const handleChatUserClicked = (chat) => {
        setChatUser(chat);
    }
    
    const handleCreateChat = async (user) => {
        const chat = await createChat([user.handle], user.displayName, user.profilepic)
        handleChatUserClicked(chat)
    }

    useEffect(() => {
        if(!chatUser) return
        (async function (){
            const MESSAGES = await getMessages(chatUser._id)
            setMessages(MESSAGES)
        })()
    }, [chatUser])

    const handleMessageSend = async (e) => {
        e.preventDefault()
        const message = e.target.message.value
        try{
            let msg_object = {
                _id: await sendMessage(chatUser._id, message),
                message,
                user:{
                    displayName:profile.displayName,
                    profilepic: profile.profilepic,
                }
            }
            setMessages(prev => [msg_object, ...prev])
            e.target.message.value = ''
        }
        catch(e){
            notify({
                alert: 'internal error',
                type: 'error'
            })
        }
    }

    return(
        <div className='chat-wrapper'>
            <div className="chats">
                {
                    chats?.length != 0
                    ? chats?.map((chat) => (
                        <div className='user-wrapper' key = {chat._id} onClick = {() => {handleChatUserClicked(chat)}}>
                            <img src = {chat.displayPic} />
                            <div className="user-name-wrapper">
                                <p className='display-name'>{chat.name}</p>
                                <p className='handle'>{chat.latest}</p>
                            </div>
                        </div>
                    ))
                    : null
                }
                {
                    profile?.following.length != 0
                    ? <div className='recomended'>
                        <p>Recomended</p>
                        {profile?.following.map((user) => (
                            <div className='user-wrapper' key = {user.handle} onClick = {() => {handleCreateChat(user)}}>
                                <img src = {user.profilepic} />
                                <div className="user-name-wrapper">
                                    <p className='display-name'>{user.displayName}</p>
                                    <p className='handle'>@{user.handle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <p>Follow users to chat!</p>
                }
            </div>
            <div className="divider"></div>
            <div className="messages">
                {
                    chatUser != null
                    ? <>
                        <div className='user-wrapper'>
                            <img src = {chatUser.displayPic} />
                            <div className="user-name-wrapper">
                                <p className='display-name'>{chatUser.name}</p>
                            </div>
                        </div>
                        <div className="messages-wrapper">
                            {
                                messages.length != 0
                                ? messages.map(message => (
                                    <p key = {message._id} className={`message${message.user.displayName === profile.displayName?' self':''}`}>{message.message}</p>
                                ))
                                : null
                            }
                        </div>
                        <form className="messages-send" onSubmit={handleMessageSend}>
                            <input type="text" name="message" id="message" placeholder='Message...' />
                        </form>
                    </>
                    : <p className='default-chat-msg'>Click a user to <br/> start chatting!</p>
                }
            </div>
        </div>
    )
}

export default Chat