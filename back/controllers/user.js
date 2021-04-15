const userModel = require('../models/user')


module.exports.loginUser = async (req, res) => {

    

}

module.exports.createNewUser = async (req, res) => {

    const newUser = new userModel({ ...req.body })

    const userCreated = await newUser.save()

    if(userCreated === undefined || !userCreated){
        return res.status(400).send(`O usuário não conseguiu ser cadastrado`)
    }

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