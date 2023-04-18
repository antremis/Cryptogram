import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import Web3 from 'web3'
import { notify } from "../Components/Alert";
import {useUserContext} from './UserContext'
import { useAuthContext } from "./AuthContext";
import ABI from '../MarketContract/CryptogramMarket.json'

const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const [ posts, setPosts ] = useState([])
    const {user, token} = useAuthContext()
    const {profile} = useUserContext()
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(ABI.abi, '0x384Db1566401b319051336eedeB9F2DC869c089d', {
        from: profile?.address, // default from address
        // gasPrice: '0' // default gas price in wei, 20 gwei in this case
    });

    const makePost = async (caption, data) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        let post = {
            caption,
        }
        const formData = new FormData()
        formData.append('img', data)
        formData.append('caption', caption)
        axios
            .put(`${baseurl}/api/post`, formData, {headers: {authorisation: `Bearer ${token}`}})
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

    const makeNFT = async (caption, data) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        const formData = new FormData()
        formData.append('img', data)
        formData.append('name', profile.displayName)
        formData.append('description', caption)
        try{
            const res = await axios.put(`${baseurl}/api/market/create`, formData, {headers: {authorisation: `Bearer ${token}`}})
            contract.methods.createNFT(res.data.data.url).send()
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const displayNFT = async () => {
        
    }

    const listNFT = async (tokenId, id) => {
        try{
            const price = prompt('Price in ETH')
            if(!price) throw new Error('No price entered')
            const wei = web3.utils.toWei(price)
            if(wei <= 0) throw new Error('Price needs to be greater than 0')
            contract.methods.listNFT(tokenId, wei).send()
            const baseurl = import.meta.env.VITE_BACKEND_URL
            axios.put(`${baseurl}/api/market`, {_id: id, price: Number(price)}, {headers: {authorisation: `Bearer ${token}`}})
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const getListedNFTs = async () => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const res = await axios.get(`${baseurl}/api/market`, {headers: {authorisation: `Bearer ${token}`}})
            return res.data.data
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const buyNFTorUnlist = async (listitem) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            if(listitem.owner) await contract.methods.cancelListing(listitem.tokenId).send()
            else await contract.methods.buyNFT(listitem.tokenId).send({from: profile.address, value: web3.utils.toWei(String(listitem.price))})
            await axios.delete(`${baseurl}/api/market/${listitem._id}`, {headers: {authorisation: `Bearer ${token}`}})
        }
        catch(error){
            notify({
                alert: error.message,
                type: 'error'
            })
        }
    }

    const likePost = async (pid, callback) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const commentId = await axios.put(`${baseurl}/api/like/${pid}`, {}, {headers: {authorisation: `Bearer ${token}`}})
            callback()
        }
        catch(error){
            notify({
                alert:error.message,
                type:'error'
            })
        }
    }

    const unlikePost = async (pid, callback) => {
        const baseurl = import.meta.env.VITE_BACKEND_URL
        try{
            const commentId = await axios.delete(`${baseurl}/api/like/${pid}`, {headers: {authorisation: `Bearer ${token}`}})
            callback()
        }
        catch(error){
            notify({
                alert:error.message,
                type:'error'
            })
        }
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
            else res = await axios.get(`${baseurl}/api/hashtag/${hashtag}`, { headers:{authorisation: `Bearer ${token}`}})
            setPosts(res.data.data)
        }
        catch(error){
            notify({
                alert:error.message,
                type:'error'
            })
        }
    }

    const getHashtags = async () => {
        try{
            const baseurl = import.meta.env.VITE_BACKEND_URL
            const res = await axios.get(`${baseurl}/api/hashtag`, { headers:{authorisation: `Bearer ${token}`}})
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
        <PostContext.Provider value={{ posts, getPostsForUser, getPostsByUser, makePost, makeNFT, listNFT, displayNFT, getListedNFTs, buyNFTorUnlist, likePost, unlikePost, makeComment, getHashtags }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;
export const usePostContext = () => {
    if(!PostContext) notify('Post context is not available');
    return useContext(PostContext)
}