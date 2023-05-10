import {usePostContext} from '../Context/PostContext'
import './Post.css'
import FAVORITE from '../assets/favorite.png'
import FAVORITED from '../assets/favorited.png'
import LIKE from '../assets/like.png'
import LIKED from '../assets/liked.png'
import SHARE from '../assets/share.png'
import CommentContent from './CommentContent'
import StockImg from '../assets/postStockImg.png'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

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
        setData(e.target.files[0], () => {
            e.target.result = null
        })
    }

    const handleCheckboxChange = (e) => {
        if(e.target.checked){
            if(!confirm('Checking this will turn this post into an NFT and will cost ETH.\nContinue?'))
                e.target.checked = false
            
        }
    }

    const stared_ref = useRef(null)
    const handleFav = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(stared_ref.current.src.includes(FAVORITED))
            stared_ref.current.src=FAVORITE
        else
            stared_ref.current.src=FAVORITED
        console.log(`🚀 ~ file: Post.jsx:57 ~ FAVORITED:`, FAVORITED)
        console.log(`🚀 ~ file: Post.jsx:57 ~ stared_ref.current.sr:`, stared_ref.current.src)
    }

    return(
        <>
            <Link className='post-handle-wrapper' to={`/profile/${handle}`} >
                <img src={profileimg} className='profileimg'/>
                <div className="post-handle">
                    <span>{displayName}</span>
                    <p>@{handle}</p>
                </div>
                {
                    post
                    ? null
                    : <img src={FAVORITE} ref={stared_ref} className='favorite' onClick={handleFav}/>
                }
            </Link>
            {
                post
                ? <><label htmlFor='fileupload'><img src={StockImg} id='add-post' ref={imgref}/></label>
                <input type="file" id='fileupload' name='fileupload' accept='image/*' onChange={handleImgUpload}/></>
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
                        ? <img src={LIKED} onClick={handleUnlike} />
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
            {
                post
                ? <input type='checkbox' name='nft' onChange={handleCheckboxChange}/>
                : null
            }
        </>
    )
}

const Post = ({profileimg, displayName, handle, imgsrc, likes, caption, post, closeModal, liked, pid}) => {

    const {makePost, makeNFT} = usePostContext()
    let data, clearImg

    const setData = (val, callback) => {
        data = val
        clearImg = callback
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const caption = e.target.caption.value
        e.target.caption.value = ''
        if(!e.target.nft.checked) makePost(caption, data)
        else makeNFT(caption, data)
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