import { useAuthContext } from "../Context/AuthContext"
import { usePostContext } from "../Context/PostContext"
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
import NavItems from "../Components/NavItems"
import Post from './../Components/Post';
import Comments from './../Components/Comments';

const Dashboard = () => {
    const {signOut} = useAuthContext()
    const {posts} = usePostContext()

    return(
        <div className="dashboard">
            <nav className="leftnav">
                <NavItems src={LOGO} action={signOut}/>
                <NavItems src={PROFILE} />
                <NavItems src={SEARCH} />
                <NavItems src={EXPLORE} />
                <NavItems src={NFT} />
                <NavItems src={MARKETPLACE} />
            </nav>
            <main className="content">
                {posts.map(post => (
                    <div className='post-wrapper' key={post.id}>
                        <Post displayName={post.displayName} handle={post.handle} imgsrc={post.imgsrc} likes={post.likes} caption={post.caption} />
                        <Comments comments={post.comments} />
                    </div>
                ))}
            </main>
            <nav className="rightnav">
                <nav>
                    <NavItems src={NOTIFICATION} />
                    <NavItems src={CHAT} />
                    <NavItems src={POST} />
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