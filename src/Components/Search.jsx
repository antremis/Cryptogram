import './Search.css'
import SEARCH from '../assets/search.png'
import { useRef, useState } from 'react'
import { useUserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const Search = ({ closeSearchModal }) => {

    const { getUsers } = useUserContext()
    const [ users, setUsers ] = useState()
    const sref = useRef()
    const navigate = useNavigate()
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
        }, 800)
    }

    const handleClick = (url) => {
        closeSearchModal()
        navigate(url)
    }

    return (
        <form className='search-wrapper' onClick={e=>e.stopPropagation()} onSubmit={e=>e.preventDefault()}>
            <div className="search-input-wrapper" ref={sref}>
                <img src={SEARCH} />
                <input type='text' placeholder='Search' onChange = {handleInput} />
            </div>
            <div className="search-result-wrapper">
                {
                    users
                    ? users.map((user) => (
                        <div onClick={() => handleClick(`/profile/${user.handle}`)} key={user.handle} >
                            <img src={user.profilepic}/>
                            <p>{user.handle}</p>
                        </div>
                    ))
                    : null
                }
            </div>
        </form>
    )
}

export default Search