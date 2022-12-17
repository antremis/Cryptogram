import { useState } from 'react'
import './Comments.css'

const Comment = ({comment}) => {
    const [showmore, setShowmore] = useState(false)
    return(
        <div className="comment" key={comment?.id}>
            <img src={comment?.profilepic} />
            <div className="comment-content-wrapper">
                <div className="comment-content">
                    <p className='comment-handle'>{comment?.handle}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>{comment.comment}</p>
                </div>
                <div className='comment-info'>
                    <span>3h</span>
                    <p className='comment-likes'>{comment?.likes} likes</p>
                    <p className='comment-reply-btn'>Reply</p>
                    {comment?.replies.length
                    ? <p className='comment-showmore-btn' onClick={()=>setShowmore(prev=>!prev)}>Show more</p>
                    : null}
                    <p className='comment-like-btn'>Like</p>
                </div>
            </div>
        </div>
    )
}

const PostComment = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Add a comment' />
        </form>
    )
}

const Comments = ({comments}) => {
    return(
        <div className="comments">
            <div className="comments-wrapper">
                {comments.length
                ? comments.map(comment => (
                    <Comment comment={comment}/>
                ))
                : <p>Be the first one to comment!</p>}
            </div>
            <PostComment />
        </div>
    )
}

export default Comments