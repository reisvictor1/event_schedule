const express = require('express')
const router = express.Router()

const eventRouter = require('./event')
const userRouter = require('./user')

router.use('/event', eventRouter)
router.use('/user', userRouter)

module.exports = router