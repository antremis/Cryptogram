import {usePostContext} from '../Context/PostContext'
import './Post.css'
import FAVORITE from '../assets/favorite.png'
import LIKE from '../assets/like.png'
import SHARE from '../assets/share.png'
import CommentContent from './CommentContent'
import StockImg from '../assets/postStockImg.png'
import { useRef } from 'react';

const PostContent = ({setData, profileimg, displayName, handle, imgsrc, likes, caption, post}) => {
    const imgref = useRef(null)
    let data

    const handleImgUpload = (e) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            imgref.current.src = event.target.result
        }
        reader.readAsDataURL(e.target.files[0]);
        setData(e.target.files[0])
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
                    : <p>{likes} likes</p>
                }
                <div className='post-likes-btns'>
                    <img src={LIKE} />
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

const Post = ({profileimg, displayName, handle, imgsrc, likes, caption, post, closeModal}) => {

    const {makePost} = usePostContext()
    let data

    const setData = (val) => {
        data = val
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const caption = e.target.caption.value
        makePost(caption, data)
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
                        <PostContent profileimg={profileimg} displayName={displayName} handle={handle} imgsrc={imgsrc} likes={likes} caption={caption} post={post} />
                    </div>
                </div>
            }
        </>
    )
}

export default Post