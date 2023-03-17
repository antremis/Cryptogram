import { useState, useEffect } from 'react'
import { usePostContext } from "../Context/PostContext"
import { useParams } from 'react-router-dom'
import Comments from './../Components/Comments';
import Post from './../Components/Post';
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { getPostsForUser } = usePostContext()
    const { hashtag } = useParams()
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        (async function(){
            const data = await getPostsForUser(hashtag)
            setPosts(data)
        })()
    }, [])

    return(
        <>
            {posts?.map(post => (
                <div className='post-wrapper' key={post._id}>
                    <Post displayName={post?.user.displayName} handle={post?.user.handle} imgsrc={post?.imgsrc} likes={post?.likes} caption={post?.caption}/>
                    <div className='divider'></div>
                    <Comments comments={post?.comments} postid={post?._id} />
                </div>
            ))}
        </>
    )
}

export default Dashboard