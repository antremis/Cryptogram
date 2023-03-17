import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { notify } from "../Components/Alert";
import {useUserContext} from './UserContext'
import { useAuthContext } from "./AuthContext";

const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const {user, token} = useAuthContext()
    const {profile} = useUserContext()
    const [loading, setLoading] = useState(true)

    const makePost = async (caption) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        let post = {
            caption,
        }
        axios
            .put(`${baseurl}/api/post`, post, {headers: {authorisation: `Bearer ${token}`}})
            .then(data => {
                post._id = data.data.data.id,
                post.user = {
                    handle: profile.handle,
                    displayName: profile.displayName,
                    profilepic: profile.profilepic,
                }
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
            const commentId = await axios.put(`${baseurl}/api/comment/${id}`, {comment}, {headers: {authorisation: `Bearer ${token}`}})
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
                            user:{
                                profilepic: profile.profilepic,
                                handle: profile.handle,
                            },
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

    const getPostsByUser = async (handle) => {
        try{
            const baseurl = import.meta.env.VITE_BACKEND_URL
            const res = await axios.get(`${baseurl}/api/post/${handle}`, { headers:{authorisation: `Bearer ${token}`}})
            return res.data.data
        }
        catch(error){
            notify({
                alert:error.message,
                type:'error'
            })
        }
    }
    
    const getPostsForUser = async (hashtag) => {
        try{
            const baseurl = import.meta.env.VITE_BACKEND_URL
            let res
            if(!hashtag) res = await axios.get(`${baseurl}/api/post`, {headers:{authorisation: `Bearer ${token}`}})
            res = await axios.get(`${baseurl}/api/post`, {params: {hashtag}, headers:{authorisation: `Bearer ${token}`}})
            return res.data.data
        }
        catch(error){
            notify({
                alert:error.message,
                type:'error'
            })
        }
    }

    return(
        <PostContext.Provider value={{ loading, getPostsForUser, getPostsByUser, makePost, makeComment}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;
export const usePostContext = () => {
    if(!PostContext) notify('Post context is not available');
    return useContext(PostContext)
}