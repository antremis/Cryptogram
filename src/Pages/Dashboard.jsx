import { useEffect } from 'react'
import { usePostContext } from "../Context/PostContext"
import { useParams } from 'react-router-dom'
import Comments from './../Components/Comments';
import Post from './../Components/Post';
import './Dashboard.css'

const Dashboard = () => {
    const { posts, getPostsForUser } = usePostContext()
    const { hashtag } = useParams()

    useEffect(() => {
        getPostsForUser(hashtag)
    }, [])

    return(
        <>
            {posts?.map(post => (
                <div className='post-wrapper' key={post._id}>
                    <Post profileimg = {post?.user.profilepic} displayName={post?.user.displayName} handle={post?.user.handle} imgsrc={post?.imgsrc} likes={post?.likes} caption={post?.caption}/>
                    <div className='divider'></div>
                    <Comments comments={post?.comments} postid={post?._id} />
                </div>
            ))}
        </>
    )
}

export default Dashboard