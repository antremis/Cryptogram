import { useState, useEffect } from 'react'
import { usePostContext } from '../Context/PostContext'
import BUY from '../assets/buy.png'
import './Marketplace.css'

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
        <div className = 'marketplace'>
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
    )
}

export default Marketplace