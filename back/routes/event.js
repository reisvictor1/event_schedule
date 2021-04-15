const express = require('express')
const eventController = require('../controllers/event')

const router = express.Router();


router.get('/', eventController.listEvents)
router.post('/', eventController.addEvent)
router.put('/:id', eventController.editEvent)
router.delete('/:id', eventController.deleteEvent)

module.exports = router