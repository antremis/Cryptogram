import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { notify } from "../Components/Alert";
import {v4 as uuid} from 'uuid'
import {useUserContext} from './UserContext'
import { useAuthContext } from "./AuthContext";

const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const {user} = useAuthContext()
    const {profile} = useUserContext()
    // const [posts, setPosts] = useState([
    //     {
    //         id: uuid(), 
    //         displayName: "Yatin Bajaj",
    //         handle: 'yatinOP69',
    //         profilepic: '/src/assets/profile.png',
    //         imgsrc: '/src/assets/stockimg.png',
    //         likes: 2814,
    //         caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio soluta adipisci quidem nostrum reiciendis quisquam fuga corporis, voluptas vero tempore?',
    //         comments: [
    //             {
    //                 id: uuid(),
    //                 handle: 'admin',
    //                 profilepic: '/src/assets/profile.png',
    //                 comment: 'Lorem ipsum dolor sit amet.',
    //                 replies: [
    //                     {
    //                         id: uuid(),
    //                         handle: 'admin',
    //                         profilepic: '/src/assets/profile.png',
    //                         reply: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, odio?',
    //                         likes: 0,
    //                     },
    //                     {
    //                         id: uuid(),
    //                         handle: 'admin',
    //                         profilepic: '/src/assets/profile.png',
    //                         reply: 'Lorem ipsum dolor sit amet.',
    //                         likes: 0,
    //                     },
    //                     {
    //                         id: uuid(),
    //                         handle: 'admin',
    //                         profilepic: '/src/assets/profile.png',
    //                         reply: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea nobis numquam omnis ex dolorum alias laborum neque enim, labore iste?',
    //                         likes: 0,
    //                     },
    //                 ],
    //                 likes: 0,
    //             },
    //             {
    //                 id: uuid(),
    //                 handle: 'admin',
    //                 profilepic: '/src/assets/profile.png',
    //                 comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, porro!',
    //                 replies: [
    //                     {
    //                         id: uuid(),
    //                         handle: 'admin',
    //                         profilepic: '/src/assets/profile.png',
    //                         reply: 'Lorem ipsum dolor sit amet.',
    //                         likes: 0,
    //                     }
    //                 ],
    //                 likes: 0,
    //             },
    //             {
    //                 id: uuid(),
    //                 handle: 'admin',
    //                 profilepic: '/src/assets/profile.png',
    //                 comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi quos velit adipisci. Repellat consectetur doloribus sunt quaerat odit qui?',
    //                 replies: [],
    //                 likes: 0,
    //             },
    //             {
    //                 id: uuid(),
    //                 handle: 'admin',
    //                 profilepic: '/src/assets/profile.png',
    //                 comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel quidem! Possimus et sapiente voluptate?',
    //                 replies: [
    //                     {
    //                         id: uuid(),
    //                         handle: 'admin',
    //                         profilepic: '/src/assets/profile.png',
    //                         reply: 'Lorem ipsum dolor sit amet.',
    //                         likes: 0,
    //                     }
    //                 ],
    //                 likes: 0,
    //             },
    //             {
    //                 id: uuid(),
    //                 handle: 'admin',
    //                 profilepic: '/src/assets/profile.png',
    //                 comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit temporibus odio quos provident expedita rem, atque odit dolores unde alias totam dignissimos cumque eius id aliquid omnis aperiam placeat quibusdam in rerum officiis! Obcaecati, sapiente.',
    //                 replies: [],
    //                 likes: 0,
    //             },
    //         ]
    //     },
    // ])
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const makePost = async (caption) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        let post = {
            uid: user.uid,
            caption,
        }
        axios
            .put(`${baseurl}/api/post`, post)
            .then(data => {
                post._id = data.data.data.id,
                post.handle = profile.handle,
                post.displayName = profile.displayName,
                post.profilepic = profile.profilepic,
                post.likes = 0
                post.comments = []
                post.imgsrc = data.data.data.imgsrc
                setPosts(prev => [post, ...prev])
                notify({
                    alert: 'Image Posted!',
                })
            })
            .catch(error => {
                notify({
                    alert: error.message,
                    type: 'error'
                })
            })
    }

    const makeComment = async (id, input) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        const comment = input.value
        if(!comment){
            notify({
                alert:'A comment cannot be empty!',
                type:'error'
            })
            return
        }
        try{
            const commentId = await axios.put(`${baseurl}/api/comment/${id}`, {id: user.uid, comment})
            input.value = ''
            setPosts(prev => {
                let newPosts = []
                prev.forEach(post => {
                    if(post._id != id){
                        newPosts.push(post)
                    }
                    else{
                        post.comments.push({
                            _id: commentId.data.data.id,
                            profilepic: profile.profilepic,
                            handle: profile.handle,
                            comment,
                            replies: [],
                            likes: 0,
                        })
                        newPosts.push(post)
                    }
                })
                return newPosts
            })
        }
        catch(error){
            notify({
                alert:error.message,
                type:'error'
            })
        }
    }

    useEffect(() => {
        setLoading(true)
        const baseurl = import.meta.env.VITE_BACKEND_URL
        if(!user){
            setPosts(null)
            setLoading(false)
            return
        }
        axios
            .get(`${baseurl}/api/post`)
            .then(data => {
                console.log(data.data.data)
                setPosts(data.data.data)
            })
            .catch(error => {
                notify({
                    alert:error.message,
                    type:'error'
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }, [user])

    return(
        <PostContext.Provider value={{posts, loading, makePost, makeComment}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;
export const usePostContext = () => {
    if(!PostContext) notify('Post context is not available');
    return useContext(PostContext)
}