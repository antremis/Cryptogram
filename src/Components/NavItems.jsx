import './NavItems.css'
import {notify} from './Alert'

const NavItems = ({src, ref, action}) => {

    return(
        <img src={src} data-nav-item onClick={action?action:()=>notify({alert:'Not implemented yet', type:'error'})} />
    )
}

export default NavItems