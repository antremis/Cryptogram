const router = require('express').Router()
const {
    getOrCreateUser,
    followUser,
    unfollowUser,
    getUser,
    getUsers,
    updateUser
} = require('../Controllers/UserController')

router.route('/')
    .get(getOrCreateUser)
    .put(followUser)
    .post(getUsers)
router.route('/:handle')
    .get(getUser)
    .patch(updateUser)
    .delete(unfollowUser)

module.exports = router