const router = require('express').Router()
const upload = require('multer')()
const {
    createNFT,
    listNFT,
    getListedNFTs,
    unlistNFT
} = require('../Controllers/MarketController')

router
    .route('/')
    .get(getListedNFTs)
    .put(listNFT)
router
    .route('/:_id')
    .delete(unlistNFT)
    
router.put('/create', upload.single('img'), createNFT)
    
module.exports = router