const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/auth', userController.loginUser)

router.get('/', userController.getUsers)
router.get('/:id', userController.getOneUser)
router.post('/', userController.createNewUser)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
