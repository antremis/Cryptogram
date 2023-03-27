import { useEffect, useState } from 'react';
import { usePostContext } from '../Context/PostContext';
import { useNavigate } from 'react-router-dom'
import './Explore.css'

const Explore = () => {
    const [ groups, setGroups ] = useState([])
    const { getHashtags } = usePostContext()
    const navigate = useNavigate()

    useEffect(() => {
        (async function () {
            const data = await getHashtags()
            setGroups(data)
        })()
    }, [])

    return(
        <div className="explore-wrapper-background">
            <div className="explore-wrapper">
                {
                    groups?.map(group => (
                        <img key = {group._id} src={group.imgsrc} onClick = {() => {navigate(`/explore/${group.hashtag.split('#')[1]}`)}}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Explore