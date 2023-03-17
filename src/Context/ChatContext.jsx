import {useState, useEffect, useContext, createContext} from 'react'
import axios from 'axios'
import {useAuthContext} from './AuthContext'
import { notify } from '../Components/Alert';

const ChatContext = createContext()

const ChatContextProvider = ({children}) => {
    const [chats, setChats] = useState([])
    const [recomended, setRecomended] = useState([])
	const {user, token} = useAuthContext();
    const [loading, setLoading] = useState(true);

    const sendMessage = async (chatid, message) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.post(`${baseurl}/api/chat/${chatid}`, {message}, {headers: {authorisation: `Bearer ${token}`}})
            return res.data.id
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const getMessages = async (chatid) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.get(`${baseurl}/api/chat/${chatid}`, {headers: {authorisation: `Bearer ${token}`}})
            return res.data.data
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const createChat = async (users, name, displayPic) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.put(`${baseurl}/api/chat`, {users, name, displayPic}, {headers: {authorisation: `Bearer ${token}`}})
            const chat = {_id: res.data.data.id,
                name, displayPic,
                latest: res.data.data.latest,
                messages: []}
            setChats(prev => [
                chat,
                ...prev
            ])
            return chat
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    useEffect(() => {
        (async function (){
            setLoading(true)
            if(!user){
                setChats(null)
                setLoading(false)
                return
            }
            const baseurl = import.meta.env.VITE_BACKEND_URL
            try{
                const res = await axios.get(`${baseurl}/api/chat`, {headers: {authorisation: `Bearer ${token}`}})
                setChats(res.data.chats)
                setRecomended(res.data.recomended)
            }
            catch(error){
                notify({
                    alert: error.message,
                    type: 'error'
                })
            }
            setLoading(false)
        })()
    }, [])

    return(
        <ChatContext.Provider value={{chats, createChat, getMessages, sendMessage}}>
            {loading ? <h1>LOADING CHAT</h1> : children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider
export const useChatContext = () => {
	if (ChatContext) return useContext(ChatContext);
	else {
		console.log('Chat Context Not Available');
		return null;
	}
};