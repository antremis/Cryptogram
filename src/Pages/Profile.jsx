import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserContext'
import { usePostContext } from '../Context/PostContext'
import './Profile.css'
import CHAT from '../assets/chat.png'
import FAVORITE from '../assets/favorite.png'
import UPLOAD from '../assets/upload.png'
import REMOVE from '../assets/remove.png'
import SELL from '../assets/sell.png'

const Profile = () => {

    const { profile, getUser, followOrUnfollowUser, updateUser, connectWalletToUser } = useUserContext()
    const { handle } = useParams()
    const navigate = useNavigate()
    const [ userProfile, setUserProfile ] = useState({})
    const { getPostsByUser, listNFT } = usePostContext()
    const [ posts, setPosts ] = useState({posts: [], NFTS: []})
    const [ NFTS, setNFTS ] = useState(false)
    const [edit, setEdit] = useState(false)
    const toggleRef = useRef()

    const togglePosts = (val) => {
        setNFTS(val)
        toggleRef.current.dataset.posts = val ? 'NFTs' : 'posts'
    }

    const handleProfileChange = (e) => {
        e.preventDefault()
        const new_profile = {
            displayName : e.target.displayName.value,
            handle : e.target.handle.value,
        }
        updateUser(handle, new_profile, ()=>{
            navigate(`/profile/${new_profile.handle}`)
            setEdit(false)
        })
    }

    const handleFollowOrUnfollow = () => {
        followOrUnfollowUser(handle, userProfile.followed, () => {
            setUserProfile(prev => ({ 
                ...prev,
                followed: !prev.followed,
                followers: userProfile.followed? prev.followers-1 : prev.followers+1
            }))
        })
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
            <form className="profile-wrapper" onSubmit={handleProfileChange} >
                <div className="profile-info-wrapper">
                    <img src={userProfile?.profilepic}/>
                    <div className="profile-info">
                        <div className="row-1">
                            <div className="profile-info-name">
                                {
                                    edit
                                    ? <input type = 'text' name = 'displayName' defaultValue={userProfile?.displayName} autoFocus />
                                    : <p>{userProfile?.displayName}</p>
                                }
                                {
                                    edit
                                    ? <span>@<input type = 'text' name = 'handle' defaultValue={userProfile?.handle} readOnly={!edit} /></span>
                                    : <span>@{userProfile?.handle}</span>
                                }
                            </div>
                            <div className="profile-info-btns">
                                {
                                    handle == profile?.handle
                                    ? <>
                                        {edit && <button data-edit='true' onClick={() => setEdit(false)} >Cancel</button>}
                                        {
                                            edit
                                            ? <button data-edit='true' type='submit' >Save</button>
                                            : <div data-edit='true' onClick={() => setEdit(true)} >Edit</div>
                                        }
                                        <img src={FAVORITE} />
                                    </>
                                    :<>
                                        <div data-edit='false' onClick = {handleFollowOrUnfollow} >{userProfile.followed ? 'Unfollow' : 'Follow'}</div>
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
                                <p>{userProfile?.followers}</p>
                                <p>FOLLOWERS</p>
                            </div>
                            <div className="following">
                                <p>{userProfile?.following}</p>
                                <p>FOLLOWING</p>
                            </div>
                        </div>
                        <div className="row-3">
                            <p>{userProfile?.description ? userProfile?.description : 'No description'}</p>
                        </div>
                        {
                            handle == profile?.handle
                            ? (
                                <div className = 'row-4'>
                                    <p onClick={connectWalletToUser} >Connect a Wallet</p>
                                </div>
                            )
                            : null
                        }
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
                            NFTS 
                            ? posts?.NFTS?.length > 0
                                ? posts.NFTS.map(post => (
                                    <div className="posts-wrapper" key = {post._id}>
                                        <img src={post.imgsrc}/>
                                        <div className='options-wrapper'>
                                            <img src={UPLOAD} onClick={() => {}}/>
                                            <img src={REMOVE} onClick={() => {}}/>
                                            <img src={SELL} onClick={() => listNFT(post.tokenId)}/>
                                        </div>
                                    </div>
                                ))
                                : <p>No posts!</p>
                            : posts?.posts?.length > 0
                                ? posts.posts.map(post => (
                                    <div className="posts-wrapper" key = {post._id}>
                                        <img src={post.imgsrc}/>
                                        <div className='options-wrapper'>
                                            <img src={UPLOAD} onClick={() => {}}/>
                                            <img src={REMOVE} onClick={() => {}}/>
                                        </div>
                                    </div>
                                ))
                                : <p>No posts!</p>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile