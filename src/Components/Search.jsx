import './Search.css'
import SEARCH from '../assets/search.png'
import { useState } from 'react'
import { useUserContext } from '../Context/UserContext'
import {Link} from 'react-router-dom'

const Search = ({ closeSearchModal }) => {

    const { getUsers } = useUserContext()
    const [ users, setUsers ] = useState()
    let deferer
    
    const handleInput = (e) => {
        clearTimeout(deferer)
        deferer = setTimeout(async () => {
            if(!e.target.value){
                setUsers([])
                return
            }
            const res = await getUsers(e.target.value)
            setUsers(res)
            e.target.value = ''
        }, 800)
    }

    return (
        <form className='search-wrapper'>
            <div className="search-input-wrapper">
                <img src={SEARCH} />
                <input type='text' placeholder='Search' onChange = {handleInput} />
            </div>
            <div className="search-result-wrapper">
                {
                    users
                    ? users.map((user) => (
                        <Link to={`/profile/${user.handle}`} key={user.handle} onClick={closeSearchModal} >
                            <img src={user.profilepic}/>
                            <p>{user.handle}</p>
                        </Link>
                    ))
                    : null
                }
            </div>
        </form>
    )
}

export default Search