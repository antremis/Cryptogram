const router = require('express').Router()
const {makeComment} = require('../Controllers/CommentController')

router.route('/:id')
    .put(makeComment)

module.exports = router