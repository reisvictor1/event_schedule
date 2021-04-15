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
    }
})


module.exports = mongoose.model('Event', eventSchema)