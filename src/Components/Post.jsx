import {usePostContext} from '../Context/PostContext'
import './Post.css'
import FAVORITE from '../assets/favorite.png'
import LIKE from '../assets/like.png'
import SHARE from '../assets/share.png'
import CommentContent from './CommentContent'
import StockImg from '../assets/postStockImg.png'
import { useRef, useState } from 'react';

const PostContent = ({setData, profileimg, displayName, handle, imgsrc, likes, caption, post, l, pid}) => {
    const [liked, setLiked] = useState(l)
    const [cur_likes, setLikes] = useState(likes)
    const imgref = useRef(null)
    const {likePost, unlikePost} = usePostContext()

    const handleLike = async () => {
        likePost(pid, () => {
            setLiked(true)
            setLikes(prev => prev + 1)
        })
    }

    const handleUnlike = async () => {
        unlikePost(pid, () => {
            setLiked(false)
            setLikes(prev => prev - 1)
        })
    }

    const handleImgUpload = (e) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            imgref.current.src = event.target.result
        }
        reader.readAsDataURL(e.target.files[0]);
        setData(e.target.files[0], (event) => {
            event.target.result = null
        })
    }

    return(
        <>
            <div className='post-handle-wrapper'>
                <img src={profileimg} className='profileimg'/>
                <div className="post-handle">
                    <span>{displayName}</span>
                    <p>@{handle}</p>
                </div>
                {
                    post
                    ? null
                    : <img src={FAVORITE} className='favorite' />
                }
            </div>
            {
                post
                ? <><label htmlFor='fileupload'><img src={StockImg} id='add-post' ref={imgref}/></label>
                <input type="file" id='fileupload' name='fileupload' onChange={handleImgUpload}/></>
                : <img src={imgsrc} />
            }
            <div className='post-likes-wrapper'>
                {
                    post
                    ? <p>0 likes</p>
                    : <p>{cur_likes} likes</p>
                }
                <div className='post-likes-btns'>
                    {
                        liked
                        ? <img src={LIKE} onClick={handleUnlike} />
                        : <img src={LIKE} onClick={handleLike} />
                    }
                    <img src={SHARE} />
                </div>
            </div>
            {
                post
                ? <textarea placeholder='Enter your caption here...' name='caption' id='add-post-caption'></textarea>
                : <CommentContent content={caption} />
            }
            {
                post
                ? <div onClick = {(e) => {e.target.parentElement.requestSubmit()}} id='add-post-submit'>Post</div>
                : null
            }
        </>
    )
}

const Post = ({profileimg, displayName, handle, imgsrc, likes, caption, post, closeModal, liked, pid}) => {

    const {makePost} = usePostContext()
    let data, clearImg

    const setData = (val, callback) => {
        data = val
        clearImg = callback
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const caption = e.target.caption.value
        e.target.caption.value = ''
        makePost(caption, data)
        clearImg()
        data = null
        closeModal()
    }
    
    return(
        <>
            {
                post
                ? <form onSubmit={handleSubmit} data-post id='add-post-wrapper'>
                    <PostContent setData={setData} profileimg={profileimg} displayName={displayName} handle={handle} imgsrc={imgsrc} likes={likes} caption={caption} post={post}/>
                </form>
                : <div data-post-wrapper>
                    <div data-post>
                        <PostContent profileimg={profileimg} displayName={displayName} handle={handle} imgsrc={imgsrc} likes={likes} caption={caption} post={post} l={liked} pid={pid} />
                    </div>
                </div>
            }
        </>
    )
}

export default Post