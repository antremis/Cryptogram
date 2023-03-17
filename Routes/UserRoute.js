const router = require('express').Router()
const {
    getOrCreateUser,
    followUser,
    getUser
} = require('../Controllers/UserController')

router.route('/')
    .get(getOrCreateUser)
    .put(followUser)
router.route('/:handle')
    .get(getUser)

module.exports = router