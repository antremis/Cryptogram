import { useState, useEffect } from 'react'
import { usePostContext } from '../Context/PostContext'
import BUY from '../assets/buy.png'
import BANNER1 from "../assets/banner1.png" 
import BANNER2 from "../assets/banner2.png" 
import FILTER1 from '../assets/marketplace_filter_1.png'
import FILTER2 from '../assets/marketplace_filter_2.png'
import FILTER3 from '../assets/marketplace_filter_3.png'
import './Marketplace.css'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
// import { Carousel } from 'react-responsive-carousel';
import 'bootstrap/dist/css/bootstrap.css';  
import Carousel from 'react-bootstrap/Carousel';  


const Marketplace = () => {
    const {getListedNFTs, buyNFTorUnlist} = usePostContext()
    const [data, setData] = useState([])

    useEffect(() => {
        (async function () {
            const res = await getListedNFTs()
            setData(res)
        })()
    }, [])

   
    return (
        <div className = 'marketplace-wrapper'><div className="|">
            
            
                <Carousel className='carouselClass'>
                    <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100" src={BANNER1}
                        alt="Image One"
                        style={{height:'30rem', objectFit: 'cover'}}
                    />
                    </Carousel.Item>
                    <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100" src={BANNER2}
                        alt="Image Two"
                        style={{height:'30rem', objectFit: 'cover'}}
                    />
                    </Carousel.Item>
                </Carousel>
                <div className='search-bar'>Search Items, Collections and Accounts...</div>
                <div className="marketplace-filters">
                    <img className='marketplace-filter' src={FILTER1} />
                    <img className='marketplace-filter' src={FILTER2} />
                    <img className='marketplace-filter' src={FILTER3} />
                </div>
                <div className="marketplace">
                    {
                        data.length > 0
                        ? data.map(listitem => (
                            <div className="listeditem-wrapper" key = {listitem._id}>
                                <img src={listitem.imgsrc}/>
                                <div className='options-wrapper'>
                                    <p>{`${listitem.price} ETH`}</p>
                                    <img src={BUY} onClick={() => buyNFTorUnlist(listitem)}/>
                                </div>
                            </div>
                        ))
                        : <p>Nothing is being sold right now</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Marketplace