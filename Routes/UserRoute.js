const router = require('express').Router()
const {
    getOrCreateUser,
    followUser,
    getUser,
    getUsers
} = require('../Controllers/UserController')

router.route('/')
    .get(getOrCreateUser)
    .put(followUser)
    .post(getUsers)
router.route('/:handle')
    .get(getUser)

module.exports = router