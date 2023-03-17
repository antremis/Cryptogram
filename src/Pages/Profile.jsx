import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../Context/UserContext'
import { usePostContext } from '../Context/PostContext'
import './Profile.css'
import CHAT from '../assets/chat.png'
import FAVORITE from '../assets/favorite.png'

const Profile = () => {

    const { profile, getUser, followUser } = useUserContext()
    const { handle } = useParams()
    const [ userProfile, setUserProfile ] = useState({})
    const { getPostsByUser } = usePostContext()
    const [ posts, setPosts ] = useState({posts: [], NFTS: []})
    const [ NFTS, setNFTS ] = useState(false)
    const toggleRef = useRef()
    const display_posts = NFTS ? posts.NFTS : posts.posts

    const togglePosts = (val) => {
        setNFTS(val)
        toggleRef.current.dataset.posts = val ? 'NFTs' : 'posts'
    }

    useEffect(() => {
        (async function(){
            if(handle == profile?.handle) setUserProfile(profile)
            else {
                const user_prof = await getUser(handle)
                setUserProfile(user_prof)
            }
            const data = await getPostsByUser(handle)
            setPosts(data)
        })()
    }, [handle])

    return(
        <div className='profile-wrapper-background'>
            <div className="profile-wrapper">
                <div className="profile-info-wrapper">
                    <img src={userProfile?.profilepic}/>
                    <div className="profile-info">
                        <div className="row-1">
                            <div className="profile-info-name">
                                <p>{userProfile?.displayName}</p>
                                <p>@{userProfile?.handle}</p>
                            </div>
                            <div className="profile-info-btns">
                                {
                                    handle == profile?.handle
                                    ? <>
                                        <button data-edit='true' >Edit</button>
                                        <img src={FAVORITE} />
                                    </>
                                    :<>
                                        <button data-edit='false' onClick = {() => followUser(handle)} >Follow</button>
                                        <img src={CHAT} />
                                    </>
                                }
                                
                            </div>
                        </div>
                        <div className="row-2">
                            <div className="posts">
                                <p>{userProfile?.posts}</p>
                                <p>POSTS</p>
                            </div>
                            <div className="NFTs">
                                <p>{userProfile?.NFTS}</p>
                                <p>NFTS</p>
                            </div>
                            <div className="followers">
                                <p>{userProfile?.followers?.length}</p>
                                <p>FOLLOWERS</p>
                            </div>
                            <div className="following">
                                <p>{userProfile?.following?.length}</p>
                                <p>FOLLOWING</p>
                            </div>
                        </div>
                        <div className="row-3">
                            <p>{userProfile?.description ? userProfile?.description : 'No description'}</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="posts">
                    <div className="posts-toggle" data-posts='posts' ref={toggleRef}>
                        <button className={NFTS ? '' : 'active'} onClick={() => togglePosts(false)}>Posts</button>
                        <button className={NFTS ? 'active' : ''} onClick={() => togglePosts(true)}>NFT's</button>
                    </div>
                    <div className="posts-display-wrapper">
                        {
                            display_posts.length != 0
                            ? display_posts.map(post => (
                                <img key = {post._id} src={post.imgsrc}/>
                            ))
                            : <p>No posts!</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile