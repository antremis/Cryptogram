import  './CommentContent.css'

const CommentContent = ({handle, content}) => {
    return(
        <p className='comment-content'>{handle?<span>{handle}</span>:null}{content}</p>
    )
}

export default CommentContent