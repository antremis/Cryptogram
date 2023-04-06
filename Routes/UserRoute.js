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
    .put(followUser)
    .post(getUsers)
router.route('/connect')
    .post(connectWalletToUser)
router.route('/:handle')
    .get(getUser)
    .patch(updateUser)
    .delete(unfollowUser)

module.exports = router