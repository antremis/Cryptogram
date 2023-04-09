const router = require('express').Router()
const {
    getOrCreateUser,
    followUser,
    unfollowUser,
    getUser,
    getUsers,
    updateUser,
    connectWalletToUser,
} = require('../Controllers/UserController')

router.route('/')
    .get(getOrCreateUser)
    .post(getUsers)
router.route('/connect')
    .post(connectWalletToUser)
router.route('/:handle')
    .get(getUser)
    .patch(updateUser)
    .put(followUser)
    .delete(unfollowUser)

module.exports = router