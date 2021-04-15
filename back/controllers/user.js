const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.loginUser = async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email: email })
    

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(400).send(`As senhas não batem`)
    }

    const token = await jwt.sign({ user } , process.env.secret, { algorithm: 'RS256' })

    return res.status(200).json(token)

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

module.exports.getOneUser = async (req, res) => {



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