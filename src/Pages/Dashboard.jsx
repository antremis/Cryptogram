import { useAuthContext } from "../Context/AuthContext"
import { usePostContext } from "../Context/PostContext"
import { useUserContext } from "../Context/UserContext"
import './Dashboard.css'
import LOGO from '../assets/logo_nobg_nopad.png'
import PROFILE from '../assets/profile.png'
import SEARCH from '../assets/search.png'
import EXPLORE from '../assets/explore.png'
import NFT from '../assets/NFT.png'
import MARKETPLACE from '../assets/marketplace.png'
import NOTIFICATION from '../assets/notification.png'
import CHAT from '../assets/chat.png'
import POST from '../assets/post.png'
import QUICKCHAT from '../assets/quickchat.png'
import UPARROW from '../assets/uparrow.png'
import DOWNARROW from '../assets/downarrow.png'
import CLOSE from '../assets/close.png'
import NavItems from "../Components/NavItems"
import Post from './../Components/Post';
import Comments from './../Components/Comments';
import { useRef } from 'react';

const Dashboard = () => {
    const {signOut} = useAuthContext()
    const {posts} = usePostContext()
    const {profile} = useUserContext()
    const postref = useRef(null)
    
    const closeModal = () => {
        postref.current.close()
    }

    return(
        <div className="dashboard">
            <dialog id='create-post' ref={postref}>
                <img src={CLOSE} id='add-post-close' onClick={closeModal}/>
                <Post handle={profile?.handle} displayName={profile?.displayName} profileimg={profile?.profilepic} post={true} closeModal={closeModal} />
            </dialog>
            <nav className="leftnav">
                <NavItems src={LOGO} action={signOut}/>
                <NavItems src={SEARCH} />
                <NavItems src={EXPLORE} />
                <NavItems src={MARKETPLACE} />
                <NavItems src={NFT} />
                <NavItems src={PROFILE} />
            </nav>
            <main className="content">
                {posts?.map(post => (
                    <div className='post-wrapper' key={post._id}>
                        <Post displayName={post?.displayName} handle={post?.handle} imgsrc={post?.imgsrc} likes={post?.likes} caption={post?.caption}/>
                        <div className='divider'></div>
                        <Comments comments={post?.comments} postid={post?._id} />
                    </div>
                ))}
            </main>
            <nav className="rightnav">
                <nav>
                    <NavItems src={NOTIFICATION} />
                    <NavItems src={CHAT} />
                    <NavItems src={POST} action={() => {postref.current.showModal()}}/>
                </nav>
                <nav>
                    <NavItems src={QUICKCHAT} />
                    <NavItems src={QUICKCHAT} />
                    <NavItems src={QUICKCHAT} />
                </nav>
                <nav>
                    <NavItems src={UPARROW} />
                    <NavItems src={DOWNARROW} />
                </nav>
            </nav>
        </div>
    )
}

export default Dashboard