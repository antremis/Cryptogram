const { NFTStorage, File } = require('nft.storage')
const ListedItem = require('../Models/ListedItemModel.js')
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY
const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

// async function fileFromPath(filePath) {
//     const content = await fs.promises.readFile(filePath)
//     const type = mime.getType(filePath)
//     return new File([content], path.basename(filePath), { type })
// }

const createNFT = async (req, res) => {
    const { name, description, } = req.body
    const file = req.file
    try{
        
        const imageBuffer = Buffer.from(file.buffer, "base64");
        const imageByteArray = new Uint8Array(imageBuffer);
        const image = new File([imageByteArray], name, {type:'image/*'})
        const metadata = await nftstorage.store({
            image,
            name,
            description,
        })
        
        return res.status(200).json({mssg: 'success', data: {url: metadata.url}})
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({mssg: 'failed', error: 'internal error'})
    }
}

const listNFT = async (req, res) => {
    const { _id, price } = req.body
    try{
        await ListedItem.create({
            _id,
            price,
            owner: req.user
        })
        res.status(200).json({mssg: 'success'})
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({mssg: 'failed', error: 'Internal Error'})
    }
}

function convertLink(link) {
    const isIPFS = link.startsWith('ipfs://');
    if (!isIPFS) return {isIPFS, links: [link]}
    const cid = link.replace('ipfs://', '');
    const gatewaylink = `https://ipfs.io/ipfs/${cid}`;
    return {isIPFS, links: [link, gatewaylink]};
}

const createListItem = async (nft, user) => {
    let {isIPFS, links} = convertLink(nft.metadata.image)
    const item = await ListedItem.findById(`${nft.symbol}${nft.tokenId}`).lean()
    return {
        symbol: nft.symbol,
        name: nft.name,
        _id: `${nft.symbol}${nft.tokenId}`,
        isIPFS,
        imgsrc: isIPFS ? links[1] : links[0],
        tokenId: nft.tokenId,
        price: item.price,
        owner: item.owner === user ? true : false,
    }
}

const getListedNFTs = async (req, res) => {
    const address = process.env.SEPOLIA_CONTRACT_ADDRESS
    try{
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain: EvmChain.SEPOLIA,
        });
        const NFTS = await Promise.all(response.result.map(nft => {
            if(!nft.metadata) return {
                _id: v4(),
                isIPFS: false,
                imgsrc: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
                tokenId: -1
            }           
            
            return createListItem(nft, req.user)
        }));
        return res.status(200).json({mssg: 'success', data: NFTS})
    }
    catch(error){
        console.log(error)
        res.status(500).json({mssg: 'failed', error: 'Internal Error'})
    }
}

const unlistNFT = async (req, res) => {
    const { _id } = req.params
    try{
        const item = ListedItem.findById(_id)
        // delete doc
        res.status(200).json({mssg: 'success'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({mssg: 'failed', error: 'Internal Error'})
    }
}

module.exports = {
    createNFT,
    listNFT,
    getListedNFTs,
    unlistNFT
}