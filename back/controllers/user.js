const userModel = require('../models/user')
const eventModel = require('../models/event')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.loginUser = async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email: email })
    

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(400).send(`As senhas não batem`)
    }

    const token = await jwt.sign({ user } , process.env.secret)

    return res.status(200).json(token)

}

module.exports.returnUser = async (req, res) => {

    const { user } = req.token

    return res.status(200).json(user)
}


module.exports.addAvailableEvent = async (req, res) => {

    const { id } = req.params

    const { user } = req.token

    const loggedUser = await userModel.findById(user._id)

    const event = await eventModel.findById(id)

    await event.users.push(loggedUser)
    await event.save()

    await loggedUser.events.push(event._id)
    await loggedUser.save()


    return res.status(200).json(loggedUser)
}

module.exports.getEventsByUser = async (req, res) => {

    const { id } = req.params

    const user = await userModel.findById(id)

    if(user === undefined || !user){
        return res.status(400).send(`Não foi possível encontrar o usuário`)
    }

    let events = []

    for(let i = 0; i < user.events.length;i++){
        let event = await eventModel.findById(user.events[i]._id)
        events.push(event)
    }

    return res.status(200).json(events)

}

module.exports.createNewUser = async (req, res) => {

    const  { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10)

    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPass
    })


    const userCreated = await newUser.save()


    if(userCreated === undefined || !userCreated){
        return res.status(400).send(`O usuário não conseguiu ser cadastrado`)
    }

    return res.status(200).json(userCreated)

}

module.exports.getUsers = async (req, res) => {

    const users = await userModel.find()

    if(!users.length){
        return res.status(400).send(`Não há nenhum usuário cadastrado`)
    }

    return res.status(200).json(users)

}


module.exports.editUser = async (req, res) => {

    const { id } = req.params

    const editedUser = await userModel.findByIdAndUpdate(id, { ...req.body })

    if(editedUser === undefined || !editedUser){
        return res.status(400).send(`Não foi possível atualizar o usuário`)
    }

    return res.status(200).json(editedUser)

} 

module.exports.deleteUser = async (req, res) => {

    const { id } = req.params

    const deletedUser = await userModel.findByIdAndDelete(id) 

    if(deletedUser === undefined || !deletedUser){
        return res.status(400).send(`Não foi possível deletar o usuário`)
    }

    return res.status(200).json(deletedUser)
}