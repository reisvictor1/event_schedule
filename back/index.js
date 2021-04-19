const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

port = process.env.PORT

mongoose.connect(process.env.db, {  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

const routes = require('./routes/routes')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)



app.listen(port, () => {
    console.log(`Ouvindo o server em ${port}`)
}) 