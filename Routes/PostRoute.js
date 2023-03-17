const router = require('express').Router()
const {
    makePost,
    getPostsByUser,
    getPostsForUser,
    getPost,
} = require('../Controllers/PostController')

router.route('/')
    .get(getPostsForUser)
    .put(makePost)
router.route('/:handle')
    .get(getPostsByUser)
module.exports = router