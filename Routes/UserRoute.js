const router = require('express').Router()
const {
    getOrCreateUser
} = require('../Controllers/UserController')

router.route('/:id')
    .get(getOrCreateUser)

module.exports = router