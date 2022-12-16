import './Post.css'
import FAVORITE from '../assets/favorite.png'
import LIKE from '../assets/like.png'
import SHARE from '../assets/share.png'

const Post = ({profileimg, displayName, handle, imgsrc, likes, caption}) => {
    
    return(
        <div data-post>
            <div className='post-handle-wrapper'>
                <img src={profileimg?profileimg:'/src/assets/profile.png'} />
                <div className="post-handle">
                    <p>{displayName}</p>
                    <p>{handle}</p>
                </div>
                <img src={FAVORITE} />
            </div>
            <img src={imgsrc} />
            <div className='post-likes-wrapper'>
                <p>{likes}</p>
                <div className='post-likes-btns'>
                    <img src={LIKE} />
                    <img src={SHARE} />
                </div>
            </div>
        </div>
    )
}

export default Post