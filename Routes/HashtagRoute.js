const router = require('express').Router()
const {
    getHashtags,
    getPostsForHashtag
} = require('../Controllers/HashtagController')

router
    .route('/')
    .get(getHashtags)
router
    .route('/:hashtag')
    .get(getPostsForHashtag)

module.exports = router