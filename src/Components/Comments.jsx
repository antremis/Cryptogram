import { useState } from 'react'

import CommentContent from './CommentContent'
import SEND from "../assets/send.png"
import './Comments.css'
import { usePostContext } from '../Context/PostContext'

const Comment = ({comment}) => {
    const [showmore, setShowmore] = useState(false)
    return(
        <div className="comment" key={comment?.id}>
            <img src={comment?.profilepic} />
            <div className="comment-content-wrapper">
                <CommentContent handle={comment?.handle} content={comment?.comment} />
                <div className='comment-info'>
                    <span>3h</span>
                    <p className='comment-likes'>{comment?.likes} likes</p>
                    <p className='comment-reply-btn'>Reply</p>
                    {comment?.replies?.length
                    ? <p className='comment-showmore-btn' onClick={()=>setShowmore(prev=>!prev)}>Show more</p>
                    : null}
                    <p className='comment-like-btn'>Like</p>
                </div>
            </div>
        </div>
    )
}

const PostComment = ({postid}) => {

    const {makeComment} = usePostContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        makeComment(postid, e.target.comment)
    }

    return(
        <form onSubmit={handleSubmit} className='make-comment'>
            <input type='text' placeholder='Add a comment...' name='comment' />
            <img src={SEND} onClick={(e) => e.target.parentElement.requestSubmit()}/>
        </form>
    )
}

const Comments = ({comments, postid}) => {
    return(
        <div className="comments">
            <div className="comments-wrapper">
                {comments?.length
                ? comments?.map(comment => (
                    <Comment comment={comment} key={comment?._id}/>
                ))
                : <p className='no-comments'>Be the first one to comment!</p>}
            </div>
            <PostComment postid={postid}/>
        </div>
    )
}

export default Comments