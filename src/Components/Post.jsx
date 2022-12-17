import './Post.css'
import FAVORITE from '../assets/favorite.png'
import LIKE from '../assets/like.png'
import SHARE from '../assets/share.png'
import ANONYMOUS from '/src/assets/profile.png'

const Post = ({profileimg, displayName, handle, imgsrc, likes, caption}) => {
    
    return(
        <div data-post-wrapper>
            <div data-post>
                <div className='post-handle-wrapper'>
                    <img src={profileimg?profileimg:ANONYMOUS} className='profileimg'/>
                    <div className="post-handle">
                        <span>{displayName}</span>
                        <p>@{handle}</p>
                    </div>
                    <img src={FAVORITE} className='favorite' />
                </div>
                <img src={imgsrc} />
                <div className='post-likes-wrapper'>
                    <p>{likes} likes</p>
                    <div className='post-likes-btns'>
                        <img src={LIKE} />
                        <img src={SHARE} />
                    </div>
                </div>
                <p className='post-caption'><span>{handle}&nbsp;&nbsp;&nbsp;&nbsp;</span>{caption}</p>
            </div>
        </div>
    )
}

export default Post