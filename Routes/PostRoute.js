const router = require('express').Router()
const {
    makePost,
    getPosts,
    getPost,
} = require('../Controllers/PostController')

router.route('/')
    .get(getPosts)
    .post(makePost)
router.route('/:id')
    .get(getPost)

module.exports = router