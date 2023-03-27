const router = require('express').Router();
const {
    likePost,
    unlikePost,
} = require('../Controllers/PostController')

router
    .route('/:pid')
    .put(likePost)
    .delete(unlikePost)

module.exports = router