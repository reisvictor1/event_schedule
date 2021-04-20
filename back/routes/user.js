const express = require('express')
const router = express.Router()
const eventController = require('../controllers/event')
const userController = require('../controllers/user')

router.post('/auth',userController.loginUser)
router.get('/token', eventController.verifyToken ,userController.returnUser)

router.get('/:id/events', userController.getEventsByUser)
router.get('/', userController.getUsers)
router.post('/', userController.createNewUser)
router.post('/event/:id', eventController.verifyToken ,userController.addAvailableEvent)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
