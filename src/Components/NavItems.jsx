import './NavItems.css'
import {notify} from './Alert'

const NavItems = ({src, ref, action}) => {

    return(
        <img src={src} data-nav-item onClick={action?action:()=>notify({alert:src, type:'error'})} />
    )
}

export default NavItems