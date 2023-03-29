import './NavItems.css'
import { Link } from 'react-router-dom'
import {notify} from './Alert'

const NavItems = ({src, ref, action, link}) => {

    return (
        link
        ? <Link to={link} ><img src={src} data-nav-item /></Link>
        : <img src={src} data-nav-item onClick={action?action:()=>notify({alert:'Not implemented yet', type:'error'})} />
    )
}

export default NavItems