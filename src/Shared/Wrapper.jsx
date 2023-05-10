import { useAuthContext } from "../Context/AuthContext"
import { useUserContext } from "../Context/UserContext"
import './Wrapper.css'
import LOGO from '../assets/logo_nobg_nopad.png'
import PROFILE from '../assets/profile.png'
import SEARCH from '../assets/search.png'
import EXPLORE from '../assets/explore.png'
import NFT from '../assets/NFT.png'
import LOGOUT from '../assets/logout.png'
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
import { useRef } from 'react';
import { useNavigate } from "react-router-dom"
import Search from './../Components/Search';

const Wrapper = ({Child, data}) => {
    const {signOut} = useAuthContext()
    const {profile} = useUserContext()
    const postref = useRef(null)
    const searchref = useRef(null)
    const navigate = useNavigate()
    
    const closeModal = () => {
        postref.current.close()
    }
    
    const closeSearchModal = () => {
        searchref.current.close()
    }

    return(
        <div className="dashboard">
            <dialog id='create-post' ref={postref}>
                <img src={CLOSE} id='add-post-close' onClick={closeModal}/>
                <Post handle={profile?.handle} displayName={profile?.displayName} profileimg={profile?.profilepic} post={true} closeModal={closeModal} />
            </dialog>
            <dialog id='search' ref={searchref} onClick={closeSearchModal} >
                <Search closeSearchModal={closeSearchModal} />
            </dialog>
            <nav className="leftnav">
                <NavItems src={LOGO} link = {'/'} />
                <NavItems src={SEARCH} action={() => {searchref.current.showModal()}}/>
                <NavItems src={EXPLORE} link = {'/explore'} />
                <NavItems src={MARKETPLACE} link = {'/market'} />
                {/* <NavItems src={NFT} /> */}
                <NavItems src={PROFILE} link = {`/profile/${profile?.handle}`} />
                <NavItems src={LOGOUT} action={signOut} />
            </nav>

            <main className='content'>
                <Child data={data} />
            </main>
            
            <nav className="rightnav">
                <nav>
                    <NavItems src={NOTIFICATION} />
                    <NavItems src={CHAT} link = {'/chat'} />
                    <NavItems src={POST} action={() => {postref.current.showModal()}}/>
                </nav>
                <nav>
                    <NavItems src={QUICKCHAT} />
                    <NavItems src={QUICKCHAT} />
                    <NavItems src={QUICKCHAT} />
                </nav>
                <nav>
                    <NavItems src={UPARROW} action={()=>{window.scrollBy(0, -(window.innerHeight))}}/>
                    <NavItems src={DOWNARROW} action={()=>{window.scrollBy(0, window.innerHeight)}}/>
                </nav>
            </nav>
        </div>
    )
}

export default Wrapper