const eventModel = require('../models/event')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')



module.exports.verifyToken =  async (req, res, next) => {

    const token = req.headers['authorization']

    let len = token.length

    let parsed_token = token.slice(1, len-1)

    if(!token) return res.status(400).send(`Não foi possível ler o token`)

    req.token = parsed_token

    jwt.verify(req.token,process.env.secret, (err, data) => {

        if(err) return res.status(403).send(`Token inválido`)
        req.token = data

        next()
    })

}


module.exports.listEvents = async (req, res) => {

    const events = await eventModel.find()

    if(events === undefined || !events){
        return res.status(400).send(`Erro ao recuperar os eventos`)
    }

    if(!events.length){
        return res.status(400).send(`Não há nenhum evento`)
    }

    return res.status(200).json(events)

}
    


module.exports.addEvent = async (req, res) => {

    const { title, description, start_hour, end_hour } = req.body

    const { user } = req.token

    const userSaved = await userModel.findById(user._id)

    let newEvent = new eventModel({
        title: title,
        description: description,
        start_hour: start_hour,
        end_hour: end_hour,
    })

    await newEvent.users.push(userSaved)

    const eventSaved = await newEvent.save()

    if(eventSaved === undefined || !eventSaved){
        return res.status(400).send(`Este evento não conseguiu ser inserido`)
    }

    await userSaved.events.push(eventSaved)

    await userSaved.save()

    return res.status(200).json(eventSaved)

}


module.exports.editEvent = async (req, res) => {

    const { id } = req.params

    const eventEdited = await eventModel.findByIdAndUpdate(id, { ...req.body })

    if(eventEdited === undefined || !eventEdited){
        return res.status(400).send(`O evento não conseguiu ser editado`)
    }

    return res.status(200).send('Evento foi editado')

}


module.exports.deleteEvent = async (req, res) => {

    const { id } = req.params

    const eventDeleted = await eventModel.findByIdAndDelete(id);

    if(eventDeleted === undefined || !eventDeleted){
        return res.status(400).send(`Este evento não conseguiu ser deletado`)
    }


    return res.status(200).json(eventDeleted)

}