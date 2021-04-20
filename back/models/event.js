const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
    "start_hour": {
        type: Date,
        required: true
    },
    "end_hour": {
        type: Date,
        required: true
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'User'
    }
})


module.exports = mongoose.model('Event', eventSchema)