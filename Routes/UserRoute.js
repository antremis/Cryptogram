const router = require('express').Router()
const {
    getOrCreateUser,
    followUser,
    unfollowUser,
    getUser,
    getUsers,
    updateUser,
    connectWalletToUser,
    getResourceForUser,
} = require('../Controllers/UserController')

router.route('/')
    .get(getOrCreateUser)
    .post(getUsers)
router.route('/:handle')
    .get(getUser)
    .patch(updateUser)
router.route('/:handle/follow')
    .put(followUser)
    .delete(unfollowUser)
router.route('/:handle/connect')
    .post(connectWalletToUser)
router.route('/:handle/:resource')
    .get(getResourceForUser)
module.exports = router