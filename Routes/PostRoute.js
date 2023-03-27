const router = require('express').Router()
const upload = require('multer')()
const {
    makePost,
    getPostsByUser,
    getPostsForUser,
    getPost,
    likePost,
} = require('../Controllers/PostController')

router.route('/')
    .get(getPostsForUser)
router.put('/', upload.single('img'), makePost)
router.route('/:handle')
    .get(getPostsByUser)
    
module.exports = router