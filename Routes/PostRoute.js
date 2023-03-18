const router = require('express').Router()
const upload = require('multer')()
const {
    makePost,
    getPostsByUser,
    getPostsForUser,
    getPost,
} = require('../Controllers/PostController')

router.route('/')
    .get(getPostsForUser)
    // .put(makePost)
router.put('/', upload.single('img'), makePost)
router.route('/:handle')
    .get(getPostsByUser)
module.exports = router