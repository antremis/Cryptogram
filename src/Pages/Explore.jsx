import { useState } from 'react';
import './Explore.css'

const Explore = () => {
    const { groups, setGroups } = useState([])

    return(
        <div className="explore-wrapper-background">
            <div className="explore-wrapper">
                {
                    groups?.map(group => {
                        <img key = {group._id} src={group.imgsrc}/>
                    })
                }
            </div>
        </div>
    )
}

export default Explore