const express = require('express')
const eventController = require('../controllers/event')

const router = express.Router();

router.get('/verify', eventController.verifyToken)

router.get('/', eventController.verifyToken, eventController.listEvents)
router.post('/', eventController.verifyToken, eventController.addEvent)
router.put('/:id', eventController.verifyToken, eventController.editEvent)
router.delete('/:id', eventController.verifyToken, eventController.deleteEvent)

module.exports = router